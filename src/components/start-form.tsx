import { setStartKey } from '@lib/store'
import { getUserID } from '@start/get'
import { createFormControl } from 'solid-forms'
import { APIForm, APIFormData } from './api-form'
import { showToast } from './ui/toast'

const StartForm = () => {
  const form = createFormControl<string, APIFormData>('', {
    data: {
      label: 'Start.gg',
      placeholder: 'Llave de autenticación de Start.gg',
      info: 'Obtén tu llave de la API en los "Developer Settings" de Start.gg',
      validate: async value =>
        getUserID(value)
          .then(res => {
            if (res) {
              setStartKey(value).catch(console.error)
              showToast({
                title: 'Llave válida',
                description: 'Llave aplicada con éxito.',
                variant: 'success'
              })
              form.setErrors([])
            } else {
              showToast({
                title: 'Error desconocido',
                description: 'Comprueba tu conexión a internet y vuelve a intentarlo.',
                variant: 'error'
              })
              form.setErrors(['unknown'])
            }
          })
          .catch((err: Error) => {
            if (err.message.includes('Invalid'))
              showToast({
                title: 'Llave inválida',
                description: 'La llave de autenticación de Start.gg no es válida.',
                variant: 'error'
              })
            else
              showToast({
                title: 'Error desconocido',
                description: 'Comprueba tu conexión a internet y vuelve a intentarlo.',
                variant: 'error'
              })
            console.error(err)
            form.setErrors([err.message])
          })
    }
  })

  return <APIForm form={form} />
}

export { StartForm }
