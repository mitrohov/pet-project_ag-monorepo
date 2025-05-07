<template>
  <div class="lessons-block-container m-heading">
    <div
      class="image-lesson"
      :style="{
        'background-image': 'url(/images/lesson-1.jpg)',
      }"
    ></div>
    <div style="display: flex; align-items: center">
      <div>
        <div class="size-36 text-bold lesson-heading lesson-text">
          Английский может быть интересным!
        </div>
        <div class="mt-3 lesson-text">
          Смотри, удивляйся, обсуждай видео и погружайся в настоящий язык.
        </div>
        <div>
          <div class="size-36 mt-5 text-bold lesson-text">
            Стоимость занятий
          </div>
          <div
            style="font-size: 80px"
            class="text-bold price-heading lesson-text"
          >
            60 мин
          </div>
          <div class="text-bold size-32 price-heading lesson-text">
            2000 руб
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.lessons-block-container {
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-column-gap: 20px;
  .image-lesson {
    height: 500px;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
  }
  .price-heading {
    background-image: linear-gradient(
      269.98deg,
      #f8b65f 23.73%,
      #ff7e2e 98.99%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@media only screen and (max-width: 760px) {
  .lessons-block-container {
    grid-template-columns: 1fr;
  }
  .lesson-heading {
    margin-top: 20px;
  }
  .lesson-text {
    text-align: center;
  }
}
</style>
