<template>
  <div class="bio-block-container">
    <div class="circles">
      <div class="circle red mr-2"></div>
      <div class="circle yellow mr-2"></div>
      <div class="circle green"></div>
    </div>

    <div class="mt-6 text-bold">Присоединяйтесь!</div>
  </div>
</template>

<style scoped>
.bio-block-container {
  box-shadow: 0 4px 25px 5px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
}
.circles {
  display: flex;
  margin-bottom: 50px;

  .circle {
    background: #42b983;
    height: 20px;
    width: 20px;
    border-radius: 10px;
  }
  .green {
    background: #3ea100;
  }
  .yellow {
    background: #e7cb03;
  }
  .red {
    background: #da4141;
  }
}
</style>
