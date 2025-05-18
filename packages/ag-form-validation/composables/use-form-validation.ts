import { ref, watch, type Ref } from "vue";
import { validate, type ValidationError } from "class-validator";
import type { Constructor, InstanceObject } from "@ag/schemas/types/shared.ts";

export function useValidationForm<T>(
  initialClass: Constructor<InstanceObject>,
  initialInstance: InstanceObject,
) {
  const form = ref<InstanceObject>(initialInstance);
  const errors = ref<Record<string, string>>({});
  const isValidForm = ref(false);

  function getPropertyErrors(
    validationErrors: ValidationError[],
    property: string,
  ) {
    let propertyErrors = "";

    const propertyError = validationErrors.find(
      (validationError) => validationError.property === property,
    );

    if (propertyError) {
      const constraints = propertyError.constraints;

      if (constraints) {
        propertyErrors = Object.values(constraints).join(". ");
      }
    }

    return propertyErrors;
  }

  function setPropertyError(propertyErrors: string, property: string) {
    errors.value[property] = propertyErrors;
    isValidForm.value = false;
  }

  function deletePropertyErrors(property: string) {
    delete errors.value[property];
  }

  function setIsValidForm() {
    if (Object.keys(errors.value).length === 0) {
      isValidForm.value = true;
      return;
    }

    isValidForm.value = false;
  }

  function checkPropertiesErrors(
    validationErrors: ValidationError[],
    property: string,
  ) {
    if (validationErrors.length > 0) {
      const propertyErrors = getPropertyErrors(validationErrors, property);

      if (propertyErrors) {
        setPropertyError(propertyErrors, property);
      } else {
        deletePropertyErrors(property);
      }
    } else {
      deletePropertyErrors(property);
    }
  }

  function createCurrentInstance() {
    const currentInstance = new initialClass();

    Object.keys(form.value).forEach((key) => {
      currentInstance[key] = form.value[key];
    });

    return currentInstance as object;
  }

  async function validateField(property: string) {
    const currentInstance = createCurrentInstance();
    const validationErrors = await validate(currentInstance);
    checkPropertiesErrors(validationErrors, property);
    setIsValidForm();
  }

  async function validateForm() {
    const currentInstance = createCurrentInstance();
    const validationErrors = await validate(currentInstance);

    if (validationErrors.length === 0) {
      setIsValidForm();
      return true;
    }

    validationErrors.forEach((validationError) => {
      checkPropertiesErrors(validationErrors, validationError.property);
    });

    setIsValidForm();
  }

  watch(
    () => ({ ...form.value }),
    async (newVal, oldVal) => {
      const changedFields: string[] = [];

      for (const key in newVal) {
        if (newVal[key] !== oldVal[key]) {
          changedFields.push(key);
        }
      }

      for (const field of changedFields) {
        await validateField(field);
      }
    },
    { deep: true },
  );

  return {
    form: form as Ref<T>,
    errors,
    isValidForm,
    validateForm,
  };
}
