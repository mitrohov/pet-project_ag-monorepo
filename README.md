# Работа с проектом

В проекте используется пакетный менеджер [pnpm](https://pnpm.io/)

## Правила работы с проектом
- Все workspaces должны быть указаны в файле pnpm-workspace.yaml (в корне проекта)
- Все версии зависимостей должны быть указаны в файле pnpm-workspace.yaml (в корне проекта)
- Лицензия прописана в файле LICENSE.md (в корне проекта)
- Архитектура crm-системы указана на диаграмме в файле crm-dependencies.drawio, которая открывается через ресурс [draw.io](https://www.drawio.com/)

## Быстрые команды для работы с проектом (от корня проекта):

### Рекурсивная установка зависимостей и удаление папок dist

```bash
pnpm up
```

### Удаление всех зависимостей, очистка кеша, удаление папок dist и полная установка всех зависимостей

```bash
pnpm up-deep
```

### Запуск crm-системы в dev режиме

```bash
pnpm dev-crm
```

### Создание build сборки crm-системы

```bash
pnpm build-crm
```

### Запуск api сервера в dev режиме

```bash
pnpm dev-api
```

### Создание build сборки api сервера

```bash
pnpm build-api
```

### Запуск Prisma Studio

```bash
pnpm studio
```

### Запуск миграции (prisma) для базы данных

```bash
pnpm migrate
```

### Генерация Prisma клиента

```bash
pnpm generate-client
```

### Запуск api сервера на сервере (build-сборка)

```bash
pnpm start-api
```

### Запуск документации в dev-режиме

```bash
pnpm dev-docs
```

### Создание build сборки документации

```bash
pnpm build-docs
```

### Запуск лендинга в dev-режиме

```bash
pnpm dev-landing
```

### Создание build сборки лендинга

```bash
pnpm build-landing
```

### Рекурсивный запуск eslint проверки во всех workspaces

```bash
pnpm lint
```

### Рекурсивный запуск typecheck проверки во всех workspaces

```bash
pnpm typecheck
```

### Рекурсивное удаление всех pnpm-lock.yaml, удаление node_modules и очистка кеша во всех workspaces

```bash
pnpm delete-all-deps
```

### Рекурсивное удаление всех build сборок (папки dist) во всех workspaces

```bash
pnpm delete-builds
```

### Быстрый коммит в main ветку с стандартным commit-message

```bash
pnpm commit
```