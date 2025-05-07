<template>
  <div class="simple-approach-container m-heading">
    <div class="simple-content">
      <div>
        <div class="size-48 text-bold">Просто. Удобно. Эффективно.</div>

        <div class="mt-6">
          В одном приложении собраны все необходимые обучающие материалы,
          домашние задания, расписание.
        </div>

        <div class="mt-6 text-bold">Занимайся тогда, когда удобно тебе!</div>
      </div>
    </div>

    <div class="simple-img-container">
      <img class="interactive-image" src="/images/materials.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.simple-approach-container {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 3fr 4fr;
  grid-template-areas: "simpleContent simpleImage";

  .simple-content {
    display: flex;
    align-items: center;
    grid-area: simpleContent;
  }
  .simple-img-container {
    grid-area: simpleImage;
    background-image: linear-gradient(
      269.98deg,
      #de5959 23.73%,
      #ffaf7d 98.99%
    );
    padding: 30px;
    border-radius: 10px;
  }
  .interactive-image {
    width: 100%;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 760px) {
  .simple-approach-container {
    grid-template-columns: none;
    grid-template-areas:
      "simpleImage simpleImage"
      "simpleContent simpleContent";
    .simple-img-container {
      padding: 15px;
    }
  }
  .simple-content {
    margin-top: 50px;
  }
}
</style>
