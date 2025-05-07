<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.empty-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100svh;
  background-color: #fafafa;
}
</style>
