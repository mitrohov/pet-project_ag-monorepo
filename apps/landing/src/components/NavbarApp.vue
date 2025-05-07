<template>
  <div class="nav-container">
    <div
      v-for="(navItem, navIndex) in navItems"
      :key="navIndex"
      class="nav-item"
    >
      {{ navItem.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface NavItem {
  title: string;
  route: string;
}

const navItems: NavItem[] = [
  {
    title: "Начало",
    route: "",
  },
  {
    title: "Услуги",
    route: "",
  },
  {
    title: "Обо мне",
    route: "",
  },
  {
    title: "Отзывы",
    route: "",
  },
  {
    title: "Контакты",
    route: "",
  },
];
</script>

<style scoped>
.nav-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 15px;

  .nav-item {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
