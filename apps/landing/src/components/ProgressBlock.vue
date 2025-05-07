<template>
  <div class="text-bold size-54 progress-heading m-heading">
    <div>Всего 1 приложение</div>
    <div>и целый океан возможностей</div>
  </div>

  <div class="sub-heading mt-3">
    Погрузись в современный формат и занимайся в свое удовольствие благодаря
    яркой и удобной платформе
  </div>

  <div class="progress-block-container mt-10">
    <div class="online-lesson">
      <div>
        <img class="online-image" src="/images/online.png" alt="" />
      </div>

      <div class="online-content">
        <div>
          <div class="size-48 text-bold">
            <div>Все занятия</div>
            <div>проходят online</div>
          </div>

          <div class="mt-5">
            Больше никаких PDF, долгих скачиваний и google-документов.
          </div>

          <div>Все материалы размещены в цифровом учебнике.</div>

          <div class="mt-6 text-bold">
            Урок проходит по видеосвязи со всеми возможными интерактивными
            инструментами .
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
}
.sub-heading {
  text-align: left;
}
.progress-block-container {
  .online-lesson {
    background-image: linear-gradient(
      269.98deg,
      #f8b65f 23.73%,
      #ff7e2e 98.99%
    );
    border-radius: 10px;
    display: grid;
    grid-template-columns: 4fr 3fr;
    grid-column-gap: 60px;
    color: white;
    padding: 60px 20px 60px 0;
  }
  .online-image {
    width: 100%;
    border-radius: 0 10px 10px 0;
  }
  .online-content {
    display: flex;
    align-items: center;
  }
}

@media only screen and (max-width: 1000px) {
  .progress-block-container {
    .online-lesson {
      grid-template-columns: none;
      padding: 15px;
      .online-image {
        border-radius: 10px;
      }
      .online-content {
        margin-top: 20px;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .progress-heading {
    text-align: left;
  }
  .sub-heading {
    text-align: left;
  }
}
</style>
