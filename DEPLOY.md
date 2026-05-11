# Деплой Car Lounge через GitHub -> Vercel

## 1. Залить проект в GitHub

```bash
git init
git add .
git commit -m "Initial Car Lounge frontend"
git branch -M main
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

## 2. Подключить к Vercel

1. Открыть Vercel Dashboard.
2. Add New Project.
3. Import Git Repository.
4. Выбрать этот репозиторий.
5. Framework Preset: Next.js.
6. Build Command: `npm run build`.
7. Output Directory: оставить пустым.
8. Install Command: `npm install`.
9. Deploy.

## 3. После деплоя

Проверить страницы:

- `/`
- `/avtomobili-v-nalichii`
- `/avtomobili-v-nalichii/<slug>`

## 4. Для следующих правок

```bash
git add .
git commit -m "Update frontend"
git push
```

Vercel автоматически пересоберет тестовый сайт после push.
