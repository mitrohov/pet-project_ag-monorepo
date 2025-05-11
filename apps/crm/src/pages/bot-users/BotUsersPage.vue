<template>
  <div class="bot-users-page">
    <div class="page-header mb-20">Пользователи бота</div>

    <Button label="Добавить" @click="botUsersStore.openBotUserForm" class="mb-20" />

    <BotUsersTableDesktop
      v-if="isDesktop"
      :botUsers="botUsersStore.botUsers"
      :contextItems="contextItems"
      @selectedId="botUsersStore.selectedId = $event"
    />

    <BotUsersTableMobile
      v-if="!isDesktop && botUsersStore.botUsers"
      :botUsers="botUsersStore.botUsers"
      :contextItems="contextItems"
      @selectedId="botUsersStore.selectedId = $event"
    />

    <UIDeleteWarningModal
      v-if="botUsersStore.botUsers"
      :show="botUsersStore.isShowDeleteWarning"
      message="Удаление пользователя приведет к его отключению от бота!<br />Вы уверены, что хотите продолжить?"
      @close="botUsersStore.isShowDeleteWarning = false"
      @delete="botUsersStore.deleteBotUser"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useBotUsersStore } from '@/entities/bot-users/stores/use-bot-users-store.ts'
import BotUsersTableDesktop from '@/entities/bot-users/components/BotUsersTableDesktop.vue'
import BotUsersTableMobile from '@/entities/bot-users/components/BotUsersTableMobile.vue'
import { Button } from '@/packages/prime'
import { UIDeleteWarningModal, type TableContextItem } from '@/packages/ui'

const { isDesktop } = useAgent()
const router = useRouter()
const botUsersStore = useBotUsersStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (botUsersStore.selectedId) {
            router.push({ name: 'BotUsersFormPage', query: { id: botUsersStore.selectedId } })
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          botUsersStore.isShowDeleteWarning = true
        }
      }
    ]
  }
]
</script>
