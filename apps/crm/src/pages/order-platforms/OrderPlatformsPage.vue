<template>
  <div class="order-platforms-page">
    <div class="d-flex justify-between align-center mb-20">
      <div class="page-header">Платформы</div>

      <UIAddBtnAndSqlBtn
        tableName="orderPlatform"
        doc-url="https://docs.anastasia-geiko.ru/docs/order-platform.html"
      >
        <template v-slot:addButton>
          <Button label="Добавить" @click="orderPlatformsStore.openOrderPlatformsForm" />
        </template>
      </UIAddBtnAndSqlBtn>
    </div>

    <OrderPlatformsTableDesktop
      :order-platforms="orderPlatformsStore.orderPlatforms"
      :contextItems="contextItems"
      @selectedId="orderPlatformsStore.selectedOrderPlatformId = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { useOrderPlatformsStore } from '@/entities/order-platforms/stores/use-order-platforms-store.ts'
import { useRouter } from 'vue-router'
import { Button } from '@/packages/prime'
import { UIAddBtnAndSqlBtn, type TableContextItem } from '@/packages/ui'
import OrderPlatformsTableDesktop from '@/entities/order-platforms/components/OrderPlatformsTableDesktop.vue'

const router = useRouter()
const orderPlatformsStore = useOrderPlatformsStore()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (orderPlatformsStore.selectedOrderPlatformId) {
            router.push({
              name: 'OrderPlatformForm',
              query: { id: orderPlatformsStore.selectedOrderPlatformId }
            })
          }
        }
      }
    ]
  }
]
</script>
