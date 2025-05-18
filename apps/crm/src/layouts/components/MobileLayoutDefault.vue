<template>
  <div class="mobile-layout">
    <header class="d-flex">
      <div class="mobile-layout_menu">
        <Button
          type="button"
          icon="pi pi-bars"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />

        <Menu
          ref="menu"
          id="overlay_menu"
          :model="props.navItems"
          :popup="true"
        />
      </div>

      <div class="mobile-layout_logo" @click="openEventCalendarPage">
        anastasia geiko crm
      </div>
    </header>

    <div class="mobile-layout_content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, Button } from '@/packages/prime'
import type { NavItem } from '@ag/ui'

const props = defineProps<{
  navItems: NavItem[]
}>()

const menu = ref()
const router = useRouter()

function toggle(event: Event) {
  menu.value.toggle(event)
}

const openEventCalendarPage = () => router.push({ name: 'EventCalendar' })
</script>

<style scoped>
.mobile-layout {
  display: grid;
  grid-template-rows: 60px 1fr; /* хедер 60px, контент занимает остальное */
  height: 100vh;

  header {
    display: flex;
    padding: 20px;
    background-color: white;
    -webkit-box-shadow: 4px 4px 39px -22px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 39px -22px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 39px -22px rgba(34, 60, 80, 0.2);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .mobile-layout_logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
    cursor: pointer;
  }

  .mobile-layout_content {
    padding: 20px;
    height: 100%;
  }

  .mobile-layout_menu {
    position: absolute;
    top: 8px;
  }
}
</style>
