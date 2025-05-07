import { ref, computed, onMounted, onUnmounted } from 'vue'

const screenWidth = ref<number>(window.innerWidth)

export const useAgent = () => {
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
  })

  const isDesktop = computed<boolean>(() => screenWidth.value > 1200)

  return {
    screenWidth,
    isDesktop
  }
}
