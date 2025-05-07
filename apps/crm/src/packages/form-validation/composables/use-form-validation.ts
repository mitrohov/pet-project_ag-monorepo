import { ref, watch } from 'vue'
import { z } from 'zod'
import type { VForm, VFormErrors, VFieldName, VInitialValues, VSchema } from '../types.ts'

export function useValidationForm<T extends z.ZodRawShape>(
  initialValues: VInitialValues<T>,
  schema: VSchema<T>
) {
  const form = ref(initialValues) as VForm<T>
  const errors = ref<VFormErrors<T>>({})
  const previousValues = ref(JSON.parse(JSON.stringify(form.value)))
  const isValidForm = ref(false)

  function validateField(fieldName: VFieldName<T>) {
    const result = schema.safeParse(form.value)

    if (!result.success) {
      const fieldError = result.error.issues.find((issue) => issue.path[0] === fieldName)

      if (fieldError) {
        errors.value[fieldName] = fieldError.message
        isValidForm.value = false
      } else {
        delete errors.value[fieldName]
      }
    } else {
      delete errors.value[fieldName]
    }

    if (Object.keys(errors.value).length === 0) {
      isValidForm.value = true
    }
  }

  function validateForm() {
    const result = schema.safeParse(form.value)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof z.infer<z.ZodObject<T>>
        errors.value[fieldName] = issue.message
      })
      return false
    }

    errors.value = {}

    return true
  }

  watch(
    form,
    (newValue) => {
      const newValueCopy = JSON.parse(JSON.stringify(newValue))

      const changedField = Object.keys(newValueCopy).find(
        (key) => newValueCopy[key] !== previousValues.value[key]
      ) as keyof z.infer<z.ZodObject<T>>

      if (changedField) {
        validateField(changedField)
      }

      previousValues.value = newValueCopy
    },
    { deep: true }
  )

  return {
    form,
    errors,
    isValidForm,
    validateForm
  }
}
