<template>
  <div class="interactive-learning-container m-heading">
    <div class="image-container">
      <img class="interactive-image" src="/images/interactive.jpg" alt="" />
    </div>
    <div class="interactive-content">
      <div>
        <div class="size-48 text-bold">Интерактивное обучение</div>
        <div class="mt-6">
          Со специальной платформой уроки становятся интересным
          времяпровождением
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.interactive-learning-container {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 4fr 3fr;
  .interactive-content {
    display: flex;
    align-items: center;
  }
  .image-container {
    background-image: linear-gradient(
      269.98deg,
      #de8c59 23.73%,
      #f5db4c 98.99%
    );
    padding: 30px;
    border-radius: 10px;
    .interactive-image {
      width: 100%;
      border-radius: 10px;
    }
  }
}

@media only screen and (max-width: 760px) {
  .interactive-learning-container {
    grid-template-columns: none;
    .image-container {
      padding: 15px;
    }
  }
  .interactive-content {
    margin-top: 50px;
  }
}
</style>
