# AIKEY ICC

![Node.js](https://img.shields.io/badge/node-20.18.0-green?logo=node.js)
![Volta](https://img.shields.io/badge/volta-enabled-blue)
![Build](https://img.shields.io/badge/build-vite-orange?logo=vite)

## 📑 Оглавление
- [🚀 Запуск проекта](#-запуск-проекта)
- [🏗️ Команды сборки](#-команды-сборки)
- [⚙️ Node.js / Volta](#️-nodejs--volta)
- [🛠️ Patch-package](#️-patch-package)

---

## 🚀 Запуск проекта

### Установка зависимостей
npm install

### Запуск в режиме разработки
npm start

Проект поднимется на [http://localhost:3030](http://localhost:3030).

---

## 🏗️ Команды сборки

### Сборка production
npm run build:prod
### Сборка development
npm run build:dev

---

## ⚙️ Node.js / Volta

Проект использует [Volta](https://volta.sh/) для фиксации версии Node.js.  
Node.js v20.18.0


## 🛠️ Patch-package

В проекте используется [`patch-package`](https://www.npmjs.com/package/patch-package) для исправления сторонних зависимостей.  

Патчи применяются автоматически при установке зависимостей через `postinstall`:
"postinstall": "npx patch-package && git config blame.ignoreRevsFile .git-blame-ignore-revs"
### Для создания новых патчей
npx patch-package <package-name>
