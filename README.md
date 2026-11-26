# Frontend — трекер обучения

Пример учебного приложения на React и Vite для ведения тем, практических задач и подготовки к frontend-собеседованиям. Интерфейс на русском языке; данные браузера остаются в `localStorage` и не отправляются на сервер.

## Требования

- Node.js 20.19+ или 22.12+
- npm

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Структура

```text
src/
  components/   React-компоненты
  data/         стартовые темы и вопросы
  lib/          хранение и вспомогательная логика
  App.jsx       состояние и композиция приложения
  main.jsx      точка входа
  styles.css    стили
```

Пользовательский прогресс хранится только локально в браузере. Сервер, аналитика и сторонние API не используются.

## Вход по почте и облачное хранение

Для регистрации и синхронизации используется Supabase: аутентификация по электронной почте и паролю, PostgreSQL для прогресса. У каждого аккаунта своя запись; доступ к ней ограничен политиками Row Level Security.

### Настройка Supabase

1. Создай проект в Supabase.
2. В разделе **SQL Editor** выполни файл `supabase/schema.sql`.
3. В разделе **Authentication → URL Configuration** укажи адрес сайта в **Site URL** и в **Redirect URLs**:
   - `https://etumianai.github.io/frontend-learning-tracker-public/`
   - `http://localhost:5173/` для локального запуска
4. В **Authentication → Providers → Email** оставь включённым подтверждение почты.

При первой регистрации локальный прогресс на этом устройстве переносится в облако. Если у аккаунта уже есть запись, загружается облачная версия. Дальнейшие изменения сохраняются автоматически.

### Локальная настройка

Скопируй `.env.example` в `.env` и заполни значения из **Project Settings → API Keys**:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Вместо нового publishable key можно использовать legacy anon key под именем `VITE_SUPABASE_ANON_KEY`. Никогда не добавляй в frontend `service_role` или secret key.

### Настройка публикации GitHub Pages

В репозитории открой **Settings → Secrets and variables → Actions → Variables** и добавь:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

После этого запусти workflow **Deploy to GitHub Pages** повторно или отправь новый commit в `main`.

Если Supabase пока не настроен, сайт продолжает работать в локальном режиме и хранит данные в браузере.
