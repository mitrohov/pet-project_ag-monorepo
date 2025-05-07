<template>
  <div class="progress-container">
    <div class="progress-container_spinner">
      <div>Загрузка ...</div>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 150px);
}

.progress-container_spinner {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
