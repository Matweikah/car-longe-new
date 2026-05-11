import re, html, json
from pathlib import Path

ROOT = Path('/mnt/data/work_ver13')
xml_text = Path('/mnt/data/Вставленный текст.txt').read_text(encoding='utf-8')

def tag(block, name):
    m = re.search(rf'<{name}>(.*?)</{name}>', block, flags=re.S)
    if not m:
        return ''
    s = m.group(1)
    s = re.sub(r'<!\[CDATA\[(.*?)\]\]>', lambda x: x.group(1), s, flags=re.S)
    s = re.sub(r'<[^>]+>', '', s)
    return html.unescape(s).replace('\xa0',' ').strip()

def slug_from_url(url, oid):
    base = url.rstrip('/').split('/')[-1] if url else f'auto-{oid}'
    return re.sub(r'[^a-zA-Z0-9_-]+','-', base).strip('-').lower() or f'auto-{oid}'

def price_fmt(p):
    try:
        n = int(re.sub(r'\D','', p))
        return f"{n:,}".replace(',', ' ') + ' ₽'
    except Exception:
        return p or 'по запросу'

def year_from_name(name):
    m = re.search(r'\((20\d{2})\)', name)
    if m: return int(m.group(1))
    # A conservative fallback for XML feed items without explicit year.
    return 2025

def fuel_from(name, desc):
    text = (name + ' ' + desc).lower()
    if 'kwh' in text or 'kw' in text:
        return 'Гибрид'
    if re.search(r'\b(\d{2,3}d|d\d{3}|e-220 d|300d|450d|500d|30d)\b', text):
        return 'Дизель'
    return 'Бензин'

def mileage(desc):
    m = re.search(r'пробег\s*([\d\s]+)\s*км', desc, flags=re.I)
    if m:
        return int(re.sub(r'\D','', m.group(1)) or 0)
    return 0

def clean_name(name):
    return re.sub(r'\s+', ' ', name).strip()

def model_from(name, vendor):
    n = re.sub(r'\((20\d{2})\)', '', name).strip()
    if n.lower().startswith(vendor.lower()):
        n = n[len(vendor):].strip(' -')
    return re.sub(r'\s+', ' ', n).strip() or clean_name(name)

def features(desc):
    desc = re.sub(r'\s+', ' ', desc).strip()
    if not desc or 'ИТОГОВАЯ СТОИМОСТЬ' in desc.upper():
        return []
    patterns = [
        r'Диски R\d+', r'Night пакет', r'Зимний пакет', r'Панорамная крыша', r'Камеры 360°?',
        r'Круговой обзор', r'Проекция', r'Webasto', r'Пороги', r'Фаркоп', r'Доводчики дверей',
        r'Массаж', r'Вентиляция (?:передних|задних)?\s*сидений', r'Подогрев(?:ы)?(?: всех)? сидений',
        r'Подогрев руля', r'Аудиосистема [A-Za-zА-Яа-я& ]{3,22}', r'Burmester', r'Bowers and Wilkins',
        r'Meridian', r'Mark Levinson', r'Кожа Nappa', r'Карбон', r'Shadow-Line', r'Sky lounge',
        r'Бронепленк[ае]', r'Пробег [\d\s]+ км', r'VIP пакет', r'First Class', r'Столики', r'Бокалы',
        r'Задние мониторы', r'Адаптивный круиз-контроль', r'Система кругового обзора', r'Система контроля слепых зон',
        r'Память сидений', r'Хрустальный селектор КПП', r'Оттоманки 2-го ряда', r'Пакет SportDesign',
        r'Разворотный второй ряд', r'Плавающий потолочный монитор', r'Зарядка', r'2 монитора'
    ]
    out=[]
    for pat in patterns:
        m = re.search(pat, desc, flags=re.I)
        if m:
            item = re.sub(r'\s+', ' ', m.group(0)).strip()
            # Normalize casing for common all-lower matches.
            if len(item) > 34:
                item = item[:31].rstrip() + '…'
            if item not in out:
                out.append(item)
        if len(out) >= 3:
            break
    if not out:
        short = desc.strip(' .:-')
        if len(short) <= 34:
            out.append(short)
    return out[:3]

blocks = re.findall(r'<offer\s+id="([^"]+)">(.*?)</offer>', xml_text, flags=re.S)
cars=[]
for oid, block in blocks:
    name = clean_name(tag(block,'name'))
    vendor = tag(block,'vendor') or name.split()[0]
    price = tag(block,'price')
    picture = tag(block,'picture')
    desc = tag(block,'description')
    url = tag(block,'url')
    year = year_from_name(name)
    mid = slug_from_url(url, oid)
    cars.append({
        'id': mid,
        'title': name,
        'brand': vendor,
        'model': model_from(name, vendor),
        'year': year,
        'mileageKm': mileage(desc),
        'fuel': fuel_from(name, desc),
        'badge': 'в наличии',
        'price': price_fmt(price),
        'image': picture,
        'alt': f'{name} в наличии в Car Lounge',
        'href': url,
        'features': features(desc),
    })

# Generate TS
lines=[]
lines.append('export type StockCar = {')
for line in [
"  id: string;", "  title: string;", "  brand: string;", "  model: string;", "  year: number;", "  mileageKm: number;",
"  powerHp?: number;", "  fuel?: string;", "  engine?: string;", "  gearbox?: string;", "  drive?: string;", "  body?: string;",
"  badge: string;", "  price: string;", "  image: string;", "  alt: string;", "  href: string;", "  features?: string[];"
]: lines.append(line)
lines.append('};\n')
lines.append('export const stockCars: StockCar[] = [')
for car in cars:
    lines.append('  {')
    for k in ['id','title','brand','model']:
        lines.append(f"    {k}: {json.dumps(car[k], ensure_ascii=False)},")
    lines.append(f"    year: {car['year']},")
    lines.append(f"    mileageKm: {car['mileageKm']},")
    lines.append(f"    fuel: {json.dumps(car['fuel'], ensure_ascii=False)},")
    lines.append(f"    badge: {json.dumps(car['badge'], ensure_ascii=False)},")
    for k in ['price','image','alt','href']:
        lines.append(f"    {k}: {json.dumps(car[k], ensure_ascii=False)},")
    lines.append(f"    features: {json.dumps(car['features'], ensure_ascii=False)},")
    lines.append('  },')
lines.append('];\n')
lines.append('export const stockBrands = Array.from(new Set(stockCars.map((car) => car.brand))).sort();')
lines.append('export const stockYears = Array.from(new Set(stockCars.map((car) => car.year))).sort((a, b) => b - a);')
(ROOT/'data/stock-cars.ts').write_text('\n'.join(lines)+'\n', encoding='utf-8')

# Update StockCarCard to render features
card = ROOT/'components/stock/StockCarCard.tsx'
s = card.read_text(encoding='utf-8')
old = """        <div className=\"mt-4 flex flex-wrap gap-2 text-[12px] text-muted\">\n          {car.powerHp ? <span className=\"rounded-full border border-line px-3 py-1\">{car.powerHp} л.с.</span> : null}\n          {car.engine ? <span className=\"rounded-full border border-line px-3 py-1\">{car.engine}</span> : null}\n          {car.drive ? <span className=\"rounded-full border border-line px-3 py-1\">{car.drive}</span> : null}\n        </div>"""
new = """        <div className=\"mt-4 flex flex-wrap gap-2 text-[12px] text-muted\">\n          {car.powerHp ? <span className=\"rounded-full border border-line px-3 py-1\">{car.powerHp} л.с.</span> : null}\n          {car.engine ? <span className=\"rounded-full border border-line px-3 py-1\">{car.engine}</span> : null}\n          {car.drive ? <span className=\"rounded-full border border-line px-3 py-1\">{car.drive}</span> : null}\n          {car.features?.slice(0, 3).map((feature) => (\n            <span key={feature} className=\"rounded-full border border-line px-3 py-1\">{feature}</span>\n          ))}\n        </div>"""
if old in s:
    s = s.replace(old,new)
card.write_text(s, encoding='utf-8')

# Update next.config.js remote path
cfg = ROOT/'next.config.js'
s = cfg.read_text(encoding='utf-8')
if "pathname: '/uploads/**'" not in s:
    s = s.replace("""      {
        protocol: 'https',
        hostname: 'car-lounge.ru',
        pathname: '/classes/**'
      },""", """      {
        protocol: 'https',
        hostname: 'car-lounge.ru',
        pathname: '/classes/**'
      },
      {
        protocol: 'https',
        hostname: 'car-lounge.ru',
        pathname: '/uploads/**'
      },""")
# remove temporary non-Car Lounge sources from prior fallback if present
s = re.sub(r",\n      \{\n        protocol: 'https',\n        hostname: 'apiweb\.rolf\.ru',\n        pathname: '/storage/\*\*'\n      \}", '', s)
s = re.sub(r",\n      \{\n        protocol: 'https',\n        hostname: 'upload\.wikimedia\.org',\n        pathname: '/wikipedia/commons/\*\*'\n      \}", '', s)
cfg.write_text(s, encoding='utf-8')

# Generate static inventory card HTML
brands=sorted({c['brand'] for c in cars})
years=sorted({c['year'] for c in cars}, reverse=True)
fuels=sorted({c['fuel'] for c in cars})

def esc(x): return html.escape(str(x), quote=True)
def mileage_str(n): return '0 км' if n==0 else f"{n:,}".replace(',', ' ')+' км'

def card_html(c):
    tags=''.join(f'<span>{esc(f)}</span>' for f in c['features'][:3])
    return f'''          <article class="stock-card">
            <a href="{esc(c['href'])}" target="_blank" rel="noreferrer" aria-label="Подробнее о {esc(c['title'])}">
              <div class="stock-image"><img src="{esc(c['image'])}" alt="{esc(c['alt'])}" width="620" height="440" loading="lazy" decoding="async" /><span class="stock-badge">{esc(c['badge'])}</span></div>
              <div class="stock-card-content">
                <div class="stock-card-top"><h3>{esc(c['title'])}</h3><span>→</span></div>
                <div class="stock-facts"><div><span>Год</span><strong>{c['year']}</strong></div><div><span>Пробег</span><strong>{mileage_str(c['mileageKm'])}</strong></div><div><span>Марка</span><strong>{esc(c['brand'])}</strong></div></div>
                <div class="stock-tags">{tags}</div>
                <p class="stock-price">{esc(c['price'])}</p>
              </div>
            </a>
          </article>'''

inv = ROOT/'inventory.html'
s = inv.read_text(encoding='utf-8')
s = re.sub(r'<strong>\d+</strong><span>авто</span>', f'<strong>{len(cars)}</strong><span>авто</span>', s, count=1)
s = re.sub(r'<strong>\d+</strong><span>марок</span>', f'<strong>{len(brands)}</strong><span>марок</span>', s, count=1)
brand_opts = '<option>Любая</option>' + ''.join(f'<option>{esc(b)}</option>' for b in brands)
year_opts = '<option>Любой</option>' + ''.join(f'<option>{y}</option>' for y in years)
fuel_opts = '<option>Любое</option>' + ''.join(f'<option>{esc(f)}</option>' for f in fuels)
s = re.sub(r'<label class="filter-field"><span>Марка</span><select>.*?</select></label>', f'<label class="filter-field"><span>Марка</span><select>{brand_opts}</select></label>', s, flags=re.S)
s = re.sub(r'<label class="filter-field"><span>Год от</span><select>.*?</select></label>', f'<label class="filter-field"><span>Год от</span><select>{year_opts}</select></label>', s, flags=re.S)
s = re.sub(r'<label class="filter-field"><span>Топливо</span><select>.*?</select></label>', f'<label class="filter-field"><span>Топливо</span><select>{fuel_opts}</select></label>', s, flags=re.S)
s = re.sub(r'Автомобили в наличии <span>\d+ авто</span>', f'Автомобили в наличии <span>{len(cars)} авто</span>', s)
new_cards='\n'.join(card_html(c) for c in cars)
s = re.sub(r'<div class="stock-grid">.*?</div></div></section>\n    <section class="stock-trust"', f'<div class="stock-grid">\n{new_cards}\n        </div></div></section>\n    <section class="stock-trust"', s, flags=re.S)
inv.write_text(s, encoding='utf-8')

# Update notes
notes = ROOT/'STOCK-PAGE.md'
notes.write_text(f"""# Страница автомобилей в наличии

Источник данных для текущей версии: загруженный XML `yandex.xml`.

В каталог перенесены все офферы из XML: {len(cars)} авто. В карточках используются названия, бренды, цены, описания, ссылки и изображения из XML-фида.

Изображения подключены по оригинальным URL из `car-lounge.ru/uploads/...`; для Next.js добавлен remote pattern `car-lounge.ru/uploads/**`, чтобы `next/image` оптимизировал их на стороне приложения.

Дальше можно добавить обогащение характеристик с детальных страниц `/ru/cars/...` или `/avtomobili_v_nalichii_msk_spb/...`, когда будет доступен стабильный парсер/endpoint.
""", encoding='utf-8')

print(f'Updated {len(cars)} cars, brands={len(brands)}, years={years}, fuels={fuels}')
