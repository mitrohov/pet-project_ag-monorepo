<template>
  <div class="m-heading answers-heading size-54 text-bold">
    Отвечу на самые популярные вопросы
  </div>

  <div class="answers-on-questions-container mt-5">
    <div class="card">
      <div class="text-bold">Что такое пробный урок?</div>

      <div class="mt-3">
        Урок-знакомство. Мы созваниваемся с Вами в Skype/Zoom. Знакомимся друг с
        другом и с платформой для занятий. Определим цель изучения языка,
        подберем подходящий курс. Вы озвучите свои пожелания, я постараюсь их
        учесть.
      </div>

      <div class="mt-3 text-bold">
        Пробный урок бесплатный и займет 30-40 минут.
      </div>
    </div>

    <div class="card">
      <div class="text-bold">С какими уровнями вы работаете?</div>

      <div class="mt-3">На данный момент работаю со взрослыми.</div>

      <div>Уровни:</div>

      <div>- A2 Pre-Intermediate (базовый уровень, ниже среднего)</div>

      <div>- В1 Intermediate (средний уровень)</div>
    </div>

    <div class="card">
      <div class="text-bold">Как я разберусь с платформой для занятий?</div>

      <div class="mt-3">
        Я подготовила для вас подробную инструкцию по
        <a
          href="https://www.youtube.com/watch?v=hxCRucgV_6M&ab_channel=FeelFreeENG"
        >
          ссылке </a
        >.
      </div>

      <div class="mt-3">
        Если у вас останутся вопросы, вы всегда можете обратиться ко мне.
      </div>
    </div>
  </div>

  <div class="text-bold mt-5">Остались вопросы? Напишите мне в соцсетях!</div>

  <div class="mt-3 text-bold">
    <a href="https://wa.me/79147090092" class="mt-2">Мой WhatsApp</a>
  </div>

  <div class="mt-3 text-bold">
    <a href="https://t.me/anastasiageiko" class="mt-2">Мой Telegram</a>
  </div>
</template>

<style scoped>
.answers-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.answers-on-questions-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;

  .card {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 20px;
  }
}

@media only screen and (max-width: 760px) {
  .answers-on-questions-container {
    grid-template-columns: 1fr;
  }
}
</style>
