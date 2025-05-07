<template>
  <DesktopLayoutDefault :navItems="navItems" v-if="isDesktop" />
  <MobileLayoutDefault :navItems="navItems" v-else />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useCookie } from '@/packages/cookie'
import DesktopLayoutDefault from './DesktopLayoutDefault/DesktopLayoutDefault.vue'
import MobileLayoutDefault from './MobileLayoutDefault/MobileLayoutDefault.vue'
import type { NavItem } from '@/packages/ui'

const router = useRouter()
const { isDesktop } = useAgent()
const { deleteAllCookies } = useCookie()

const navItems = ref<NavItem[]>([
  {
    label: 'Доски',
    icon: 'pi pi-list-check',
    command: () => router.push({ name: 'BoardList' })
  },
  {
    label: 'Расписание',
    icon: 'pi pi-calendar',
    command: () => router.push({ name: 'EventCalendar' })
  },
  {
    label: 'Ученики',
    icon: 'pi pi-user',
    command: () => router.push({ name: 'StudentsPage' })
  },
  {
    label: 'Оплаты',
    icon: 'pi pi-dollar',
    command: () => router.push({ name: 'PaymentsPage' })
  },
  {
    label: 'Уроки',
    icon: 'pi pi-book',
    command: () => router.push({ name: 'LessonsPage' })
  },
  {
    label: 'События',
    icon: 'pi pi-briefcase',
    command: () => router.push({ name: 'EventsPage' })
  },
  {
    label: 'Категории событий',
    icon: 'pi pi-copy',
    command: () => router.push({ name: 'EventCategoriesPage' })
  },
  {
    label: 'Уровни языка',
    icon: 'pi pi-chart-bar',
    command: () => router.push({ name: 'EnglishLevelsPage' })
  },
  {
    label: 'Цели занятий',
    icon: 'pi pi-check-square',
    command: () => router.push({ name: 'PurposesLessonPage' })
  },
  {
    label: 'Платформы',
    icon: 'pi pi-globe',
    command: () => router.push({ name: 'OrderPlatformsPage' })
  },
  {
    label: 'Цвета',
    icon: 'pi pi-microsoft',
    command: () => router.push({ name: 'ColorsPage' })
  },
  {
    label: 'Пользователи бота',
    icon: 'pi pi-users',
    command: () => router.push({ name: 'BotUsersPage' })
  },
  {
    label: 'Контакты',
    icon: 'pi pi-phone',
    command: () => router.push({ name: 'ContactsPage' })
  },
  {
    label: 'Настройки',
    icon: 'pi pi-cog',
    command: () => router.push({ name: 'SettingsPage' })
  },
  {
    label: 'Документация',
    icon: 'pi pi-file',
    command: () => window.open('https://docs.anastasia-geiko.ru')
  },
  {
    label: 'Выход',
    icon: 'pi pi-sign-out',
    command: () => {
      deleteAllCookies()
      router.push({ name: 'AuthPage' })
    }
  }
])
</script>
