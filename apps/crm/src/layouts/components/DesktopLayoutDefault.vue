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
            version 2.2
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
.default-layout {
  background-color: #fafafa;

  .default-layout_logo {
    cursor: pointer;
  }

  .container {
    display: grid;
    grid-template-columns: 200px calc(100vw - 200px);
    height: 100vh;
  }

  .sidebar {
    box-shadow: 5px 0 23px 1px #eaeaea;
    background-color: white;

    .sidebar-header {
      padding: 15px 20px;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 600;
      background-color: white;
    }
  }

  .page-container {
    display: flex;
    flex-direction: column;

    .page-header {
      padding: 10px 20px;
      display: flex;
      justify-content: end;
      background-color: white;
      box-shadow: 15px 5px 23px 0 #eaeaea;
    }

    .page-content {
      padding: 20px;
      height: 100%;
    }

    .page-version {
      font-size: 14px;
    }
  }
}
</style>

<style>
.p-menu {
  border: none !important;
}
</style>
