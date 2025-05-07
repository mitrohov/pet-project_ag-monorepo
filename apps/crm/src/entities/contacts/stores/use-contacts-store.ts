import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useApi } from '@/packages/api'
import type { GetContact } from '@/packages/api/types'

export const useContactsStore = defineStore('contactsStore', () => {
  const router = useRouter()
  const apiService = useApi()

  const contacts = ref<GetContact[]>([])
  const isLoading = ref(false)
  const selectedId = ref<number | null>(null)
  const isShowDeleteWarning = ref(false)
  const rows = ref(10)

  const openContactForm = () => router.push({ name: 'ContactFormPage' })

  async function deleteContact() {
    if (selectedId.value) {
      await apiService.contacts.deleteOneById({ id: selectedId.value })
      isShowDeleteWarning.value = false
      await getContacts()
    }
  }

  async function getContacts() {
    isLoading.value = true
    const response = await apiService.contacts.getAll({})
    if (response) contacts.value = response
    isLoading.value = false
  }

  function findContactById(id: number): GetContact | undefined {
    return contacts.value.find((contact) => contact.id === id)
  }

  return {
    contacts,
    selectedId,
    isShowDeleteWarning,
    isLoading,
    rows,
    findContactById,
    openContactForm,
    deleteContact,
    getContacts
  }
})
