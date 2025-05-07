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

        <Menu ref="menu" id="overlay_menu" :model="props.navItems" :popup="true" />
      </div>

      <div class="mobile-layout_logo" @click="openEventCalendarPage">anastasia geiko crm</div>
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
import type { NavItem } from '@/packages/ui'

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
@import 'MobileLayoutDefault.css';
</style>
