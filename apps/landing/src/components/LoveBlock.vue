<template>
  <div class="heading size-54 text-bold text-center">Всем привет)</div>
  <div>
    <div class="size-32 text-bold mt-5 text-center">
      <div>Меня зовут Настя,</div>

      <div>я преподаватель английского языка.</div>
    </div>
  </div>

  <div class="love-block-container">
    <div class="left-block">
      <div class="left-cards">
        <div class="card card-education">
          <div class="text-bold">Образование</div>

          <div class="">
            <div>ДВФУ, магистратура</div>
          </div>

          <div class="text-bold mt-3">Программа обучения</div>

          <div>
            <div>Западноевропейские языки</div>
            <div>(английский, испанский),</div>
            <div>лингвокультуры и литературы</div>
          </div>

          <div class="text-bold mt-3">Иностранные языки</div>

          <div>
            <div>английский, испанский</div>
          </div>
        </div>
      </div>
    </div>

    <div class="photo-block">
      <img class="photo" src="/images/photo.jpg" alt="" />
    </div>

    <div class="right-block">
      <div class="card card-love">
        <div class="text-bold">Мои увлечения:</div>

        <div>
          <div>- бег</div>
          <div>- природа, море и парки</div>
          <div>- книги Айн Ренд</div>
          <div>- языки</div>
          <div>- блог</div>
          <div>- саморазвитие и самодисциплина</div>
          <div>- музыка</div>
          <div>- лексика из фильмов и сериалов</div>
        </div>
      </div>
    </div>
  </div>

  <div class="size-18 mt-5 text-bold after-text">
    <div>Если вам нужен преподаватель,</div>
    <div>который сможет пообщаться с вами</div>
    <div>не только на тему учебы, то вам точно ко мне.</div>
  </div>
</template>

<style scoped>
.heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 25px;
}

.love-block-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'leftBlock photoBlock rightBlock';

  .photo {
    width: 100%;
    border-radius: 20px;
  }
  .left-block {
    grid-area: leftBlock;
  }
  .right-block {
    grid-area: rightBlock;
  }
  .photo-block {
    grid-area: photoBlock;
  }
  .left-block,
  .right-block {
    display: flex;
    align-items: center;
  }
  .card {
    box-shadow: 0 4px 25px 5px rgba(0, 0, 0, 0.11);
    border-radius: 10px;
    padding: 20px;
    background: white;
  }
  .card-love {
    position: relative;
    left: -60px;
    transform: rotate(8deg);
  }
  .card-education {
    transform: rotate(-8deg);
    position: relative;
    left: 60px;
  }

  @media only screen and (max-width: 830px) {
    .card-education,
    .card-love {
      transform: none;
      position: static;
    }
    .left-block,
    .card-love {
      margin-top: 20px;
    }
    .after-text {
      text-align: left;
    }
  }
}

.after-text {
  margin-top: 30px;
  text-align: center;
}

@media only screen and (max-width: 830px) {
  .love-block-container {
    grid-template-columns: 1fr;
    grid-template-areas: 'photoBlock' 'leftBlock' 'rightBlock';
  }
  .left-cards,
  .card-love {
    width: 100%;
  }
  .after-text {
    text-align: left;
  }
}

@media only screen and (max-width: 600px) {
  .heading {
    margin-top: 10px;
  }
}
</style>
