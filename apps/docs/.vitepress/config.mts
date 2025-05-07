import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Документация по CRM",
  description: "A VitePress Site",
  outDir: './dist',
  themeConfig: {
    nav: [
      { text: 'Домашняя страница', link: '/' },
      { text: 'Лендинг', link: 'https://anastasia-geiko.ru' },
      { text: 'CRM система', link: 'https://crm.anastasia-geiko.ru' },
      { text: 'Swagger', link: 'https://api.anastasia-geiko.ru/docs' }
    ],
    sidebar: [
      { text: 'Авторизация', link: '/docs/auth' },
      { text: 'Общая информация о разделах', link: '/docs/common-info' },
      {
        text: 'Разделы',
        items: [
          { text: 'Ученики', link: '/docs/student' },
          { text: 'Оплаты', link: '/docs/payment' },
          { text: 'Уроки', link: '/docs/lesson' },
          { text: 'События', link: '/docs/event' },
          { text: 'Расписание', link: '/docs/event-calendar' },
          { text: 'Контакты', link: '/docs/contact' },
          { text: 'Категории событий', link: '/docs/event-category' },
          { text: 'Уровни языка', link: '/docs/english-level' },
          { text: 'Цели занятий', link: '/docs/purposes-lesson' },
          { text: 'Платформы', link: '/docs/order-platform' },
          { text: 'Телеграм бот', link: '/docs/telegram' },
          { text: 'Пользователи бота', link: '/docs/bot-user' },
          { text: 'Настройки', link: '/docs/settings' },
          { text: 'Цвета', link: '/docs/color' },
          { text: 'Обновления системы', link: '/docs/version' },
          { text: 'Выход', link: '/docs/exit' },
        ]
      },
      {
        text: 'Доски',
        items: [
          { text: 'Страница досок', link: '/docs/boards' },
          { text: 'Страница доски', link: '/docs/board' },
          { text: 'Колонки доски', link: '/docs/board-columns' },
          { text: 'Задачи доски', link: '/docs/column-tasks' },
          { text: 'Доска "Задачи по статусам"', link: '/docs/task-statuses' },
        ]
      },
      {
        text: 'Тест-кейсы',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Что такое тест-кейсы', link: '/docs/test-cases/start' },
          { text: 'Авторизация', link: '/docs/test-cases/auth' },
          { text: 'Шаблон страницы', link: '/docs/test-cases/menu' },
          { text: 'Доски', link: '/docs/test-cases/boards' },
          { text: 'Доска с задачами', link: '/docs/board' },
          { text: 'Доска с статусами', link: '/docs/status-board' },
          { text: 'Ученики', link: '/docs/test-cases/student' },
          { text: 'Оплаты', link: '/docs/test-cases/payment' },
          { text: 'Уроки', link: '/docs/test-cases/lesson' },
          { text: 'События', link: '/docs/test-cases/event' },
          { text: 'Расписание', link: '/docs/test-cases/event-calendar' },
          { text: 'Контакты', link: '/docs/test-cases/contact' },
          { text: 'Категории событий', link: '/docs/test-cases/event-category' },
          { text: 'Уровни языка', link: '/docs/test-cases/english-level' },
          { text: 'Цели занятий', link: '/docs/test-cases/purposes-lesson' },
          { text: 'Платформы', link: '/docs/test-cases/order-platform' },
          { text: 'Цвета', link: '/docs/test-cases/colors' },
          { text: 'Настройки', link: '/docs/test-cases/settings' },
          { text: 'Пользователи бота', link: '/docs/test-cases/bot-user' },
          { text: 'Выход', link: '/docs/test-cases/exit' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mitrohov/new-crm' }
    ]
  }
})
