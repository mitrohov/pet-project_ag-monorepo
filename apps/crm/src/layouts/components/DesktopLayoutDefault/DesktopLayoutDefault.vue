<template>
  <div class="default-layout">
    <div class="container">
      <div class="sidebar">
        <div class="sidebar-header">
          <div class="default-layout_logo" @click="openEventCalendarPage">Anastasia Geiko crm</div>
        </div>

        <TieredMenu class="vertical-nav" :model="props.navItems" />
      </div>

      <div class="page-container">
        <div class="page-header">
          <a
            class="page-version"
            href="https://docs.anastasia-geiko.ru/docs/version.html"
            target="_blank"
          >
            version 2.1
          </a>
        </div>

        <div class="page-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { TieredMenu } from '@/packages/prime'
import type { NavItem } from '@/packages/ui'

const props = defineProps<{
  navItems: NavItem[]
}>()

const router = useRouter()

const openEventCalendarPage = () => router.push({ name: 'EventCalendar' })
</script>

<style scoped>
@import 'DesktopLayoutDefault.css';
</style>

<style>
.p-menu {
  border: none !important;
}
</style>
