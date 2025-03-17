import { Spinner } from '@assets'
import { Button } from '@components/ui/button'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { showToast } from '@components/ui/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { ErrorKind } from '@lib/error'
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

  const onInput = (e: Event) => {
    setValue((e.target as HTMLInputElement).value)
    setState(DIRTY)
  }

  const onValidate = () => {
    setState(VALIDATING)
    switch (label) {
      case 'Start.gg':
        invoke('set_start_key', { key: value() })
          .then(res => {
            if (res) {
              showToast({
                title: 'Llave válida',
                description: 'Llave aplicada con éxito.',
                variant: 'success'
              })
              setState(VALID)
            } else {
              showToast({
                title: 'Llave inválida',
                description: 'La llave de la API de Start.gg no es válida.',
                variant: 'error'
              })
              setState(INVALID)
            }
          })
          .catch((error: ErrorKind) => {
            if (error.kind === 'invalidKey') {
              showToast({
                title: 'Llave inválida',
                description: 'La llave de la API de Start.gg no es válida.',
                variant: 'error'
              })
            } else {
              console.error(error)
              showToast({
                title: 'Error de conexión',
                description: 'Comprueba tu conexión e intenta de nuevo.',
                variant: 'error'
              })
            }
            setState(INVALID)
          })
        break
      case 'Rocket League':
        invoke('connect_to_rl', { url: value() })
          .then(() => setState(VALID))
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
        <TextFieldLabel class="min-w-24 text-right">
          <TooltipTrigger>{label}</TooltipTrigger>
        </TextFieldLabel>
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
