import { createRouter, createWebHistory } from 'vue-router'
import { useCookie } from '@/packages/cookie'

const { getToken } = useCookie()

export const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/event-calendar/EventCalendarPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import('@/pages/auth/AuthPage.vue'),
    meta: { layout: 'AppLayoutEmpty' }
  },
  {
    path: '/english-levels',
    name: 'EnglishLevelsPage',
    component: () => import('@/pages/english-levels/EnglishLevelsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/english-level/form',
    name: 'EnglishLevelFormPage',
    component: () => import('@/pages/english-levels/EnglishLevelFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/order-platforms',
    name: 'OrderPlatformsPage',
    component: () => import('@/pages/order-platforms/OrderPlatformsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/order-platforms/form',
    name: 'OrderPlatformForm',
    component: () => import('@/pages/order-platforms/OrderPlatformFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/contacts',
    name: 'ContactsPage',
    component: () => import('@/pages/contacts/ContactsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/contacts/form',
    name: 'ContactFormPage',
    component: () => import('@/pages/contacts/ContactFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: () => import('@/pages/settings/SettingsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/students',
    name: 'StudentsPage',
    component: () => import('@/pages/students/StudentsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/students/form',
    name: 'StudentFormPage',
    component: () => import('@/pages/students/StudentFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/colors',
    name: 'ColorsPage',
    component: () => import('@/pages/colors/ColorsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/board-list',
    name: 'BoardList',
    component: () => import('@/pages/boards/BoardListPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/board',
    name: 'BoardPage',
    component: () => import('@/pages/boards/BoardPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/board-statuses',
    name: 'BoardStatuses',
    component: () => import('@/pages/boards/BoardStatusesPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/event-categories',
    name: 'EventCategoriesPage',
    component: () => import('@/pages/event-categories/EventCategoriesPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/event-calendar',
    name: 'EventCalendar',
    component: () => import('@/pages/event-calendar/EventCalendarPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/event-category/form',
    name: 'EventCategoriesForm',
    component: () => import('@/pages/event-categories/EventCategoriesFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/lessons',
    name: 'LessonsPage',
    component: () => import('@/pages/lessons/LessonsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/lesson/form',
    name: 'LessonFormPage',
    component: () => import('@/pages/lessons/LessonFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/events',
    name: 'EventsPage',
    component: () => import('@/pages/events/EventsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/events/form',
    name: 'EventsFormPage',
    component: () => import('@/pages/events/EventsFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/payments',
    name: 'PaymentsPage',
    component: () => import('@/pages/payments/PaymentsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/payment/form',
    name: 'PaymentFormPage',
    component: () => import('@/pages/payments/PaymentFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/purposes-lesson',
    name: 'PurposesLessonPage',
    component: () => import('@/pages/purpose-lessons/PurposeLessonsPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/purpose-lesson/form',
    name: 'PurposeLessonFormPage',
    component: () => import('@/pages/purpose-lessons/PurposeLessonFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/bot-users',
    name: 'BotUsersPage',
    component: () => import('@/pages/bot-users/BotUsersPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  },
  {
    path: '/bot-user/form',
    name: 'BotUsersFormPage',
    component: () => import('@/pages/bot-users/BotUsersFormPage.vue'),
    meta: { layout: 'AppLayoutDefault' }
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()

  if (to.path !== '/auth' && from.path !== 'auth' && !token) {
    next('auth')
    return
  } else next()
})

export default router
