<template>
  <div class="order-platforms-page">
    <div class="page-header mb-20">Платформы</div>

    <Button
      label="Добавить"
      @click="orderPlatformsStore.openOrderPlatformsForm"
      class="mb-20"
    />

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
import { type TableContextItem } from '@ag/ui'
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
              query: { id: orderPlatformsStore.selectedOrderPlatformId },
            })
          }
        },
      },
    ],
  },
]
</script>
