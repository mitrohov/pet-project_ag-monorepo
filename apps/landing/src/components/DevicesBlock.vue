<template>
  <div class="text-bold size-48 device-heading m-heading mb-6">
    <div>Учим английский</div>
    <div>на любом устройстве</div>
  </div>

  <div class="image-container">
    <img class="interactive-image" src="/images/devices.jpg" alt="" />
  </div>
</template>

<style scoped>
.device-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  .interactive-image {
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .device-heading {
    text-align: left;
  }
  .m-heading {
    margin-bottom: 30px;
  }
}
</style>
