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

<script setup>
const navItems = [
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

<style lang="scss" scoped>
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
