<template>
  <div class="ui-fieldset card">
    <div class="ui-fieldset_title">
      {{ props.title }}
    </div>

    <div class="ui-fieldset_content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<style scoped>
.ui-fieldset {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  font-weight: 500;
  font-size: 24px;
  margin: 10px 0;
}

.ui-fieldset_content {
  margin: -30px 20px 20px 20px;
}

.ui-fieldset_title {
  border: 1px solid #dddddd;
  background-color: #f8f8f8;
  margin: 15px;
  padding: 10px;
  border-radius: 6px;
  position: relative;
  top: -30px;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
}
</style>
