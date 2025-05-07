<template>
  <div class="offer-block-container">
    <div class="offer-text">
      <div>
        <div class="size-36">Всем привет)</div>

        <div class="size-48 text-bold mt-5">
          <div>Меня зовут Настя</div>
          <div>я учитель</div>
          <div>английского языка</div>
        </div>
      </div>
    </div>

    <div
      :style="{ 'background-image': `url(${imageUrl})` }"
      class="offer-image"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import imageUrl from "@/assets/images/offer-image.png";
</script>

<style scoped>
.offer-block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "text image";
  grid-column-gap: 20px;
  margin-top: 50px;

  .offer-text {
    padding: 50px 0;
    grid-area: text;
  }
  .offer-image {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    grid-area: image;
    height: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .offer-block-container {
    background: #42b983;
    grid-template-areas: "image" "text";
    grid-template-columns: none;
  }
  .offer-image {
    height: 400px !important;
  }
  .offer-text {
    text-align: center;
  }
}

@media only screen and (max-width: 530px) {
  .offer-image {
    height: 300px;
  }
}

@media only screen and (max-width: 4100px) {
  .offer-image {
    height: 200px;
  }
}
</style>
