# Nest.js Backend Project for Site Time Tracker

Бэкенд на Nest.js с REST API, аутентификацией и базой данных.

## 📌 Оглавление

- [Особенности](#-особенности)
- [Технологии](#-технологии)
- [Установка](#-установка)
- [Конфигурация](#-конфигурация)
- [Запуск](#-запуск)
- [API Endpoints](#-api-endpoints)
- [Тестирование](#-тестирование)
- [Разработка](#-разработка)

## ✨ Особенности

- RESTful API на Nest.js
- JWT аутентификация
- Валидация данных (class-validator)
- Логирование запросов
- Конфигурация через .env
- Миграции баз данных
- Документация Swagger
- Docker-контейнеризация

## 🛠 Технологии

- [Nest.js](https://nestjs.com/) - Бэкенд-фреймворк
- [TypeScript](https://www.typescriptlang.org/) - Язык программирования
- [PostgreSQL](https://www.postgresql.org/) - База данных
- [TypeORM](https://typeorm.io/) - ORM
- [JWT](https://jwt.io/) - Аутентификация
- [Swagger](https://swagger.io/) - Документация API
- [Docker](https://www.docker.com/) - Контейнеризация

## ⚙️ Установка

1. Клонировать репозиторий:
    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
      ```
2. Установить зависимости:

    ```bash
    npm install
    ```
3. 🔧 Конфигурация

    Создайте файл .env в корне проекта на основе данной схемы:
    ```env
    NODE_ENV=development                          # для production - убрать либо заменить

    # Global settings
    PORT=3000 
    NODE_ENV=development
    PLATFORM_PREFIX=api
    PLATFORM_VERSION=v1

    # Site-time-tracker DB
    FRONT_ORIGIN=https://fronthostname.com:5000
    TIME_TRACKER_DB_HOST=api-hostname.com
    TIME_TRACKER_DB_PORT=5432
    TIME_TRACKER_DB_USER=db_naem
    TIME_TRACKER_DB_PASSWORD=db_password
    TIME_TRACKER_DB_NAME=time_tracker
    TIME_TRACKER_API_PREFIX=api
    TIME_TRACKER_API_VERSION=v1

    JWT_EXPIRES_IN=172800
    JWT_SECRET=some_very_secret
    ```
  1. 🚀 Запуск
      Разработка
      ```bash
      npm run start:dev
      ```
      Продакшен
      ```bash
      npm run build
      npm run start:prod
      ```
      Docker
      ```bash
      docker-compose up --build
      ```
4. 📚 API Endpoints
    Доступна документация Swagger после запуска сервера:

    [http://localhost:3000/docs](http://localhost:3000/docs) (для разработки)

    Основные эндпоинты:

    `POST /auth/login` - Аутентификация

    `POST /auth/register` - Аутентификация

    `/activities` - активности, учитывающие время проведённое на сайте

    `/resources` - ресурсы, идентифицируемые по имени хоста для сайтов

    `/categories` - категории ресурсов с типом полезности

5. 🧪 Тестирование
    Запуск unit-тестов:

    ```bash
    npm run test
    ```
    Запуск e2e-тестов:

    ```bash
    npm run test:e2e
    ```
6. 🛠 Разработка
    Миграции
    Создать новую миграцию:

    ```bash
    npm run typeorm:create-migration --name=MigrationName
    ```
    Применить миграции:

    ```bash
    npm run typeorm:run-migrations
    ```
    Линтинг
    ```bash
    npm run lint
    ```
    Форматирование кода
    ```bash
    npm run lint:fix
    ```
