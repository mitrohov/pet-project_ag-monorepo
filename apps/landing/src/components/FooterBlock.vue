<template>
  <div
    class="footer-container m-heading"
    :style="{
      'background-image': `url(/images/footer.png)`,
    }"
  >
    <div class="footer-content">
      <div class="text-bold size-32 text-white">
        <div>Почувствуй свободу</div>
        <div>и общение без границ</div>
      </div>
      <div class="contacts mt-5 text-bold text-white">
        <a href="https://t.me/anastasiageiko" class="mt-2">Мой Telegram</a>
        <a href="https://wa.me/79147090092" class="mt-2">Мой WhatsApp</a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer-container {
  height: 500px;
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: auto 100%;
  display: flex;
  justify-content: center;
  .footer-content {
    position: relative;
    top: 300px;
    width: 500px;
    height: 200px;
    .contacts > a {
      color: white !important;
    }
    .contacts {
      display: flex;
      justify-content: space-between;
    }
    .text-white {
      color: white;
    }
  }
}
@media only screen and (max-width: 760px) {
  .footer-container {
    background-position: 10%;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    .footer-content {
      width: 100%;
    }
    .contacts {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
