<template>
  <div class="text-bold size-54 lesson-heading m-heading text-center">
    Как проходят мои уроки?
  </div>
  <div class="how-lesson-block mt-10">
    <div class="content">
      <div>
        <div class="size-48 text-bold">Учитесь где хотите</div>
        <div class="size-48 text-bold">и когда хотите</div>
        <div class="mt-5">
          Вам не нужно никуда ехать. Не нужно тратить время и деньги на дорогу и
          переживать из-за опозданий.
        </div>
        <div class="text-bold mt-5">Вы сами управляете своим графиком!</div>
      </div>
    </div>
    <div
      :style="{
        'background-image': 'url(/images/how-lesson2.jpg)',
      }"
      class="lesson-image"
    ></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.how-lesson-block {
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-column-gap: 20px;
  grid-template-areas: "lessonContent lessonImage";
  .content {
    display: flex;
    align-items: center;
    grid-area: lessonContent;
  }
  .lesson-image {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 500px;
    border-radius: 10px;
    grid-area: lessonImage;
  }
}
@media only screen and (max-width: 760px) {
  .how-lesson-block {
    grid-template-columns: none;
    grid-template-areas: "lessonImage" "lessonContent";
  }
  .content {
    margin-top: 50px;
  }
}
.lesson-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .lesson-heading {
    text-align: left;
  }
}
</style>
