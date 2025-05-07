<template>
  <div class="text-bold size-54 reviews-heading m-heading">
    <div>Как проходят пробные уроки</div>
    <div>расскажут мои ученики</div>
  </div>
  <div class="reviews-container">
    <div>
      <div v-for="(review, index) in reviews" :key="index" class="student">
        <div
          :style="{
            'background-image': `url(/images/mitrohov.jpg)`,
          }"
          class="student-photo"
        ></div>
        <div class="student-title">
          <div class="text-bold">{{ review.name }}</div>
          <div class="size-18">{{ review.position }}</div>
        </div>
      </div>
    </div>
    <div class="student-video">
      <!-- Тут видео плеер -->
    </div>
    <div class="student-bio">
      <div class="text-bold">Запрос ученика</div>
      <div
        v-for="(goal, index) in selectedReview.goals"
        :key="index"
        class="mt-2"
      >
        {{ goal }}
      </div>
      <div class="text-bold mb-2 mt-8">Что делали</div>
      <div
        v-for="(action, index) in selectedReview.actions"
        :key="index"
        class="mt-2"
      >
        {{ action }}
      </div>
      <div class="text-bold mb-2 mt-8">Результат</div>
      <div
        v-for="(result, index) in selectedReview.result"
        :key="index"
        class="mt-2"
      >
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Review {
  name: string;
  position: string | null;
  goals: string[];
  actions: string[];
  result: string[];
  photo: string;
}

const selectedReview = ref<Review>({
  name: "Дмитрий",
  position: "Веб-разработчик",
  goals: [
    "Подготовиться к интервью в Facebook. Время 2 недели.",
    "Подготовка к созданию CV",
  ],
  actions: [
    "Вместе с учеником проанализовали сильные и слабые стороны",
    "Делали еще много всего интересного",
  ],
  result: ["Получил крутую оценку", "Получил оффер"],
  photo: "mitrohov",
});

const reviews: Review[] = [
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [
      "Подготовиться к интервью в Facebook. Время 2 недели.",
      "Подготовка к созданию CV",
    ],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
  {
    name: "Дмитрий",
    position: "Веб-разработчик",
    goals: [],
    actions: [],
    result: [],
    photo: "",
  },
];
</script>

<style lang="scss" scoped>
.reviews-container {
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  .student-video {
    .video-cover {
      height: 100%;
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 10px;
    }
  }
}
.reviews-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.student {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-photo {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    margin-right: 20px;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &-title {
    display: flex;
    flex-direction: column;
  }
}
.student-bio {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
}
</style>
