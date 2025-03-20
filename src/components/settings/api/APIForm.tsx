import { Spinner } from '@assets'
import { Button } from '@components/ui/button'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { showToast } from '@components/ui/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useStartKey } from '@contexts/startKey'
import { useStore } from '@contexts/store'
import { getUserID } from '@start/get'
import { invoke } from '@tauri-apps/api/core'
import { Icon } from 'solid-heroicons'
import { arrowUpTray, checkCircle, xCircle } from 'solid-heroicons/outline'
import { Accessor, Component, createSignal, Match, Setter, Switch } from 'solid-js'

enum APIFormControlState {
  DIRTY,
  VALIDATING,
  VALID,
  INVALID
}

const DIRTY = APIFormControlState.DIRTY
const VALIDATING = APIFormControlState.VALIDATING
const VALID = APIFormControlState.VALID
const INVALID = APIFormControlState.INVALID

interface APIFormControl {
  value: Accessor<string>
  setValue: Setter<string>
  state: Accessor<APIFormControlState>
  setState: Setter<APIFormControlState>
}

function createAPIFormControl(initial: string) {
  const [value, setValue] = createSignal(initial)
  const [state, setState] = createSignal(APIFormControlState.DIRTY)

  const control: APIFormControl = {
    value,
    setValue,
    state,
    setState
  }

  return control
}

interface APIFormProps {
  label: string
  placeholder: string
  info: string
}

const APIForm: Component<APIFormProps> = ({ label, placeholder, info }) => {
  const { value, setValue, state, setState } = createAPIFormControl('')

  const [, setStartKey] = useStartKey()

  const store = useStore()

  const saveKey = (key: string) => {
    setStartKey(key)
    store.set('key', key).catch(console.error)
  }

  const onInput = (e: Event) => {
    setValue((e.target as HTMLInputElement).value)
    setState(DIRTY)
  }

  const onValidate = () => {
    setState(VALIDATING)
    switch (label) {
      case 'Start.gg':
        getUserID(value())
          .then(res => {
            if (res) {
              saveKey(value())
              showToast({
                title: 'Llave válida',
                description: 'Llave aplicada con éxito.',
                variant: 'success'
              })
              setState(VALID)
            } else {
              showToast({
                title: 'Error desconocido',
                description:
                  'Ocurrió un error desconocido al validar la llave de autenticación.',
                variant: 'error'
              })
              setState(INVALID)
            }
          })
          .catch((err: Error) => {
            if (err.message.includes('Invalid'))
              showToast({
                title: 'Llave inválida',
                description: 'La llave de autenticación de Start.gg no es válida.',
                variant: 'error'
              })
            else {
              showToast({
                title: 'Error',
                description: 'Comprueba tu conexión a internet y vuelve a intentarlo.',
                variant: 'error'
              })
              console.error(err)
            }
            setState(INVALID)
          })
        break
      case 'Rocket League':
        invoke('connect_to_rl', { url: value() })
          .then(() => {
            showToast({
              title: 'Conexión exitosa',
              description: 'Conexión exitosa con Rocket League.',
              variant: 'success'
            })
            setState(VALID)
          })
          .catch(error => {
            console.error(error)
            showToast({
              title: 'Error de conexión',
              description:
                'Comprueba que el plugin SOS está cargado en Rocket League y la URL es correcta.',
              variant: 'error'
            })
            setState(INVALID)
          })
    }
  }

  return (
    <TextField class="flex flex-row items-center gap-4 w-full">
      <Tooltip>
        <TooltipTrigger as={TextFieldLabel<'label'>} class="min-w-24 text-right">
          {label}
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>

      <TextFieldInput
        value={value()}
        onInput={onInput}
        type="text"
        placeholder={placeholder}
      />
      <Button
        disabled={state() != DIRTY || value() == ''}
        onclick={onValidate}
        type="submit"
        class="w-20 px-2 py-0"
      >
        <Switch>
          <Match when={state() === DIRTY}>
            <Icon path={arrowUpTray} />
          </Match>
          <Match when={state() === VALIDATING}>
            <Spinner />
          </Match>
          <Match when={state() === VALID}>
            <Icon path={checkCircle} class="!w-5 !h-5" />
          </Match>
          <Match when={state() === INVALID}>
            <Icon path={xCircle} class="!w-5 !h-5" />
          </Match>
        </Switch>
      </Button>
    </TextField>
  )
}

export default APIForm
