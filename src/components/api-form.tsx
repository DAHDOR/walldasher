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
}

interface APIFormProps {
  form: IFormControl<string, APIFormData>
}

const APIForm: Component<APIFormProps> = ({ form }) => {
  const onInput = (e: Event) => {
    form.setValue((e.target as HTMLInputElement).value)
    form.markDirty(true)
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
        onblur={() => form.markTouched(true)}
        oninput={onInput}
        placeholder={form.data.placeholder}
      />
      <Button
        disabled={form.value == ''}
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

export { APIForm }
