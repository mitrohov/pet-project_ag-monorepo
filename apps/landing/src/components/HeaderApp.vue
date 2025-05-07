<template>
  <div class="header-app-container">
    <header>
      <div class="text-bold size-32 logo">Anastasia Geiko</div>
    </header>
  </div>
</template>

<style scoped>
.header-app-container {
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media only screen and (max-width: 430px) {
  header {
    display: none !important;
  }
  .header-app-container {
    border-bottom: none;
  }
}
</style>
