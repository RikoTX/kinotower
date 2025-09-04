### AIKEY ICC

### 🚀 Запуск проекта

# Установка зависимостей:
npm install

# Запуск в режиме разработки:
npm start

### 🏗️ Команды сборки
# Сборка production:
npm run build:prod

# Сборка development:
npm run build:dev

### ⚙️ Node.js / Volta
# Проект использует Volta для фиксации версии Node.js.
Node.js v20.18.0


### 🌍 Переменные окружения
# Проект использует .env.* файлы:
.env.local
.env.development.local
.env.test.local
.env.production.local

### Минимальный набор переменных:


# базовый URL приложения (для service worker и статики)
PUBLIC_URL=/aikey

# пример API-адреса
VITE_API_URL=https://api.example.com

# пример URL для авторизации
VITE_AUTH_URL=https://auth.example.com

# пример WebSocket
VITE_WS_URL=wss://ws.example.com
Значения могут зависеть от window.location. Для разных окружений используйте свои .env файлы.

### 🛠️ Patch-package
# В проекте используется patch-package для исправления сторонних зависимостей.
Патчи применяются автоматически при установке зависимостей через postinstall:

"postinstall": "npx patch-package && git config blame.ignoreRevsFile .git-blame-ignore-revs"

# Для создания новых патчей:
npx patch-package <package-name>
