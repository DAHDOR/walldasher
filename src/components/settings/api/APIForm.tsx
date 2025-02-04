import { Spinner } from '@assets'
import { Button } from '@components/ui/button'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
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
  errors: Accessor<string[]>
  setErrors: Setter<string[]>
}

function createAPIFormControl(initial: string) {
  const [value, setValue] = createSignal(initial)
  const [state, setState] = createSignal(APIFormControlState.DIRTY)
  const [errors, setErrors] = createSignal<string[]>([])

  const control: APIFormControl = {
    value,
    setValue,
    state,
    setState,
    errors,
    setErrors
  }

  return control
}

interface APIFormProps {
  label: string
  placeholder: string
  info: string
  validate: (key: string) => Promise<boolean>
}

const APIForm: Component<APIFormProps> = ({ label, placeholder, info, validate }) => {
  const { value, setValue, state, setState, errors, setErrors } = createAPIFormControl('')

  const onInput = (e: Event) => {
    setValue((e.target as HTMLInputElement).value)
    setState(DIRTY)
  }

  const onValidate = () => {
    setState(VALIDATING)
    setErrors([])
    validate(value())
      .then(res => (res ? setState(VALID) : setState(INVALID)))
      .catch(error => {
        setErrors(errors => [...errors, error as string])
        setState(INVALID)
      })
    console.error(errors())
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
      >
        <Switch>
          <Match when={state() === DIRTY}>
            <Icon path={arrowUpTray} />
          </Match>
          <Match when={state() === VALIDATING}>
            <Spinner />
          </Match>
          <Match when={state() === VALID}>
            <Icon path={checkCircle} />
          </Match>
          <Match when={state() === INVALID}>
            <Icon path={xCircle} class="!max-h-10" />
          </Match>
        </Switch>
      </Button>
    </TextField>
  )
}

export default APIForm
