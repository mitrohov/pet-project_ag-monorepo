import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '@/packages/api'
import { useContactsStore } from '../stores/use-contacts-store'
import { type PostContact, PostContactSchema } from '@/packages/api/types'

export function useContactsForm() {
  const router = useRouter()
  const route = useRoute()
  const apiService = useApi()
  const { getContacts, findContactById } = useContactsStore()

  const isLoading = ref(false)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: PostContactSchema
  })

  const [fio] = defineField('fio')
  const [mobileNumber] = defineField('mobileNumber')
  const [socials] = defineField('socials')
  const [description] = defineField('description')
  const [orderPlatformId] = defineField('orderPlatformId')

  const contactId = computed<number | null>(() => {
    return route.query.id ? Number(route.query.id) : null
  })

  function routeToContactsTable() {
    router.push({ name: 'ContactsPage' })
  }

  function setValues(data: PostContact) {
    fio.value = data.fio
    mobileNumber.value = data.mobileNumber
    socials.value = data.socials
    description.value = data.description
    orderPlatformId.value = data.orderPlatformId
  }

  const onSubmit = handleSubmit(async () => {
    isLoading.value = true

    const body: PostContact = {
      fio: fio.value,
      mobileNumber: mobileNumber.value,
      socials: socials.value,
      description: description.value,
      orderPlatformId: orderPlatformId.value
    }

    if (contactId.value) {
      await apiService.contacts.updateOneById({ id: Number(contactId.value), body })
    } else {
      await apiService.contacts.createOne({ body })
    }

    isLoading.value = false

    getContacts()
    routeToContactsTable()
  })

  async function getContact() {
    if (contactId.value) {
      isLoading.value = true
      const contact = findContactById(contactId.value)

      if (contact) setValues(contact)
      else {
        const response = await apiService.contacts.getOneById({ id: contactId.value })
        if (response) setValues(response)
      }

      isLoading.value = false
    }
  }

  function initForm() {
    if (contactId.value) getContact()
  }

  return {
    contactId,
    description,
    socials,
    fio,
    mobileNumber,
    orderPlatformId,
    errors,
    onSubmit,
    routeToContactsTable,
    initForm
  }
}
