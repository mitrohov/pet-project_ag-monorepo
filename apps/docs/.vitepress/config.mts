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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mitrohov/pet-project_ag-monorepo' }
    ]
  }
})
