<template>
  <div class="contact-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Контакты</div>

      <UIAddBtnAndSqlBtn
        tableName="contact"
        doc-url="https://docs.anastasia-geiko.ru/docs/contact.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="contactsStore.openContactForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <ContactsTableDesktop
      v-if="isDesktop"
      :contacts="contactsAggregation"
      :contextItems="contextItems"
      :orderPlatforms="orderPlatformsStore.orderPlatforms"
      :rows="contactsStore.rows"
      @selectedId="contactsStore.selectedId = $event"
    />

    <ContactsTableMobile
      v-else
      :contacts="contactsAggregation"
      :contextItems="contextItems"
      @selectedId="contactsStore.selectedId = $event"
    />
  </div>

  <UIDeleteWarningModal
    :show="contactsStore.isShowDeleteWarning"
    message="Вы уверены, что хотите удалить контакт?"
    @close="contactsStore.isShowDeleteWarning = false"
    @delete="contactsStore.deleteContact"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAgent } from '@/packages/agent'
import { useContactsStore } from '@/entities/contacts/stores/use-contacts-store.ts'
import { useOrderPlatformsStore } from '@/entities/order-platforms'
import ContactsTableDesktop from '@/entities/contacts/components/ContactsTableDesktop.vue'
import ContactsTableMobile from '@/entities/contacts/components/ContactsTableMobile.vue'
import { Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, UIDeleteWarningModal, type TableContextItem } from '@/packages/ui'
import type { GetContact } from '@/packages/api/types'

const { isDesktop } = useAgent()
const router = useRouter()
const contactsStore = useContactsStore()
const orderPlatformsStore = useOrderPlatformsStore()

const contactsAggregation = computed<GetContact[]>(() => {
  return contactsStore.contacts.map((contact) => {
    if (orderPlatformsStore.orderPlatformsById[contact.orderPlatformId]) {
      contact.orderPlatform = orderPlatformsStore.orderPlatformsById[contact.orderPlatformId]
    }
    return contact
  })
})

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (contactsStore.selectedId) {
            router.push({ name: 'ContactFormPage', query: { id: contactsStore.selectedId } })
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: async () => {
          if (contactsStore.selectedId) {
            contactsStore.isShowDeleteWarning = true
          }
        }
      }
    ]
  }
]
</script>
