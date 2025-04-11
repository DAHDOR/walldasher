import { invoke } from '@tauri-apps/api/core'
import { createFormControl } from 'solid-forms'
import { APIForm, APIFormData } from './api-form'
import { showToast } from './ui/toast'

const RLForm = () => {
  const form = createFormControl<string, APIFormData>('', {
    data: {
      label: 'Rocket League',
      placeholder: 'ej.: localhost:49122',
      info: 'Ruta de conexión al servidor WS de Rocket League',
      validate: async value =>
        invoke('connect_to_rl', { url: value })
          .then(() => {
            showToast({
              title: 'Conexión exitosa',
              description: 'Conexión exitosa con Rocket League.',
              variant: 'success'
            })
            form.setErrors([])
          })
          .catch(error => {
            console.error(error)
            showToast({
              title: 'Error de conexión',
              description:
                'Comprueba que el plugin SOS está cargado en Rocket League y la URL es correcta.',
              variant: 'error'
            })
            form.setErrors(['unknown'])
          })
    }
  })

  return <APIForm form={form} />
}

export { RLForm }
