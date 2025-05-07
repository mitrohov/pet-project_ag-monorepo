<template>
  <transition name="fade">
    <div
      v-if="isShowUserMessage"
      class="user-message"
      :class="{ error: messageType === 'error', success: messageType === 'success' }"
    >
      <div class="user-message_title">
        <div class="d-flex align-center">
          <i class="pi pi-check mr-10 user-message_icon"></i>

          <div>{{ title }}</div>
        </div>

        <i class="pi pi-times user-message_icon" @click="closeMessage"></i>
      </div>

      <div class="user-message_text">{{ message }}</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAdminMessage } from '@/packages/admin-message'

const { title, message, messageType, isShowUserMessage, closeMessage } = useAdminMessage()
</script>

<style scoped>
.user-message {
  width: 320px;
  position: absolute;
  top: 100px;
  z-index: 1000;
  right: 20px;
  padding: 15px;
  border-radius: 10px;
  overflow-wrap: break-word;
}

.user-message_title {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-message_text {
  margin-top: 10px;
  font-size: 13px;
}

.user-message_icon {
  font-size: 0.9rem;
}

.pi-times {
  cursor: pointer;
}

.user-message_title {
  color: #37bf47ff;
}

.user-message.success {
  background-color: #dafbe3ea;
  border: 2px solid #b5f8bcff;
}

.user-message.error {
  background-color: #fbdadaff;
  border: 2px solid #f8b5bfff;
}

.user-message_title {
  color: #bd2347ff;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(25px);
}
</style>
