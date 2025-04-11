import { Spinner } from '@assets'
import { Button } from '@components/ui/button'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { IFormControl } from 'solid-forms'
import { Icon } from 'solid-heroicons'
import { arrowUpTray, checkCircle, xCircle } from 'solid-heroicons/outline'
import { Component, Match, Switch } from 'solid-js'

interface APIFormData {
  label: string
  placeholder: string
  info: string
  validate: (value: string) => Promise<void>
}

interface APIFormProps {
  form: IFormControl<string, APIFormData>
}

const APIForm: Component<APIFormProps> = ({ form }) => {
  const onInput = (e: InputEvent) => {
    form.setValue((e.target as HTMLInputElement).value)
    form.markSubmitted(false)
    form.setErrors([])
  }

  const onValidate = () => {
    form.markSubmitted(true)
    form.markPending(true)
    form.data
      .validate(form.value)
      .then(() => form.markPending(false))
      .catch(console.error)
  }

  return (
    <TextField class="flex flex-row items-center gap-4 w-full">
      <Tooltip closeDelay={0}>
        <TooltipTrigger as={TextFieldLabel<'label'>} class="min-w-24 text-right">
          {form.data.label}
        </TooltipTrigger>
        <TooltipContent>{form.data.info}</TooltipContent>
      </Tooltip>
      <TextFieldInput
        value={form.value}
        type="text"
        onInput={onInput}
        placeholder={form.data.placeholder}
      />
      <Button
        disabled={form.value.length === 0 || form.isSubmitted}
        onclick={onValidate}
        type="submit"
        class="w-20 px-2 py-0"
      >
        <Switch>
          <Match when={!form.isSubmitted}>
            <Icon path={arrowUpTray} />
          </Match>
          <Match when={form.isPending}>
            <Spinner />
          </Match>
          <Match when={!form.isPending && form.isSubmitted && form.isValid}>
            <Icon path={checkCircle} class="!w-5 !h-5" />
          </Match>
          <Match when={!form.isPending && form.isSubmitted && !form.isValid}>
            <Icon path={xCircle} class="!w-5 !h-5" />
          </Match>
        </Switch>
      </Button>
    </TextField>
  )
}

export { APIForm, type APIFormData }
