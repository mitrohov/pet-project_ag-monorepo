<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Anastasia Geiko';
});
</script>
