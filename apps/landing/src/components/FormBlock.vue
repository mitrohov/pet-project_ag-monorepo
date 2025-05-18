<template>
  <div class="m-heading form-heading size-54 text-bold">
    Хотите на бесплатный пробный урок?
  </div>

  <div class="text-bold mt-5">Запись на пробный урок</div>

  <div class="form-block-container">
    <div class="form">
      <input
        v-model="userName"
        placeholder="Ваше имя"
        type="text"
        class="mt-3"
      />

      <input
        :value="userPhone"
        placeholder="Телефон"
        type="text"
        class="mt-3"
        @input="updatePhone"
      />

      <div v-if="showError" class="error">Пожалуйста укажите ваш телефон</div>

      <input
        v-model="contactTime"
        placeholder="Когда с вами связаться?"
        type="text"
        class="connect mt-3"
      />

      <div v-if="formSent" class="mt-3 form-sent">Запись отправлена</div>

      <div class="mt-3">
        <ButtonApp @click="onSubmit" class="mt-5">Запись на занятия</ButtonApp>
      </div>
    </div>

    <div style="display: flex">
      <div>
        <div class="text-bold">После онлайн-записи:</div>
        <div class="mt-3">- Проведем онлайн-встречу</div>
        <div>- Узнаем друг друга</div>
        <div>- Познакомимся с платформой для занятий</div>
        <div>- Подберем подходящий курс</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonApp from '@/components/ButtonApp.vue'
import { ref } from 'vue'

const userName = ref<string | null>(null)
const userPhone = ref<string | null>(null)
const contactTime = ref<string | null>(null)
const showError = ref<boolean>(false)
const formSent = ref<boolean>(false)

const updatePhone = (event: Event) => {
  const target = event.target as HTMLInputElement
  const phone = target.value

  if (phone) {
    userPhone.value = phone
    showError.value = false
  } else {
    userPhone.value = null
    showError.value = true
  }
}

const onSubmit = async () => {
  if (userPhone.value) {
    const message = `
    Имя: ${userName.value ? userName.value : 'Имя не указано'}
    %0AТелефон: ${userPhone.value ? userPhone.value : 'Телефон не указан'}
    %0AКогда связаться: ${
      contactTime.value ? contactTime.value : 'Время не указано'
    }
  `

    const url = `https://api.telegram.org/bot6275451972:AAFa8LnyN1AHbV_8BUzpO-mC4K_KxsEE8lY/sendMessage?chat_id=-1001852466765&text=${message}`

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })

    contactTime.value = null
    userName.value = null
    userPhone.value = null
    formSent.value = true
  } else {
    showError.value = true
  }
}
</script>

<style scoped>
.form-heading {
  background-image: linear-gradient(269.98deg, #f8b65f 23.73%, #ff7e2e 98.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .form {
    display: flex;
    flex-direction: column;
  }
  input {
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 20px;
  }
}

.error {
  margin-top: 7px;
  color: #da4141;
  font-size: 13px;
}
.phone-error {
  border: 1px solid #da4141 !important;
}
.form-sent {
  color: #f8b65f;
  font-family: 'SamsungOne-900', Helvetica;
}

@media only screen and (max-width: 600px) {
  .form-block-container {
    grid-template-columns: 1fr;
  }
}
</style>
