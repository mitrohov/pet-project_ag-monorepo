<template>
  <Dialog
    :visible="props.show"
    :header="props.student?.fio"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    @update:visible="emit('close')"
  >
    <div v-if="props.student?.phone">
      <span class="font-bold"> Моб. номер - </span>

      <span v-html="props.student?.phone"> </span>
    </div>

    <div class="font-bold" v-else>У этого ученика нет мобильного номера</div>

    <div class="mt-10">
      <div v-if="props.student?.social">
        <span class="font-bold"> Соц. сети:</span>

        <span v-html="props.student?.social"></span>
      </div>

      <div class="font-bold" v-else>У этого ученика нет социальный сетей</div>
    </div>

    <div class="mt-10">
      <div v-if="props.student?.description">
        <span class="font-bold">Описание:</span>
        <span v-html="props.student?.description"></span>
      </div>

      <div class="font-bold" v-else>У этого ученика нет описания</div>
    </div>

    <div class="mt-10">
      <div v-if="props.student?.progressMeLogin">
        <span class="font-bold"> Логин ProgressMe - </span>

        <span>
          {{ props.student.progressMeLogin }}
        </span>
      </div>

      <div class="font-bold" v-else>У этого ученика нет логина ProgressMe</div>
    </div>

    <div class="mt-10">
      <div v-if="props.student?.progressMePassword">
        <span class="font-bold"> Пароль ProgressMe - </span>

        <span>
          {{ props.student.progressMePassword }}
        </span>
      </div>

      <div v-else>У этого ученика нет пароля ProgressMe</div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog } from '@/packages/prime'
import type { GetStudent } from '@/packages/api/types'

const props = defineProps<{
  student: GetStudent | null
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
