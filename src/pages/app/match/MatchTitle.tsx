import { useWS } from '@/contexts/ws'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { showToast } from '@components/ui/toast'
import { createEffect, Signal } from 'solid-js'

interface MatchTitleProps {
  titleSignal: Signal<string>
}

const MatchTitle = (props: MatchTitleProps) => {
  const ws = useWS()

  const [title, setTitle] = props.titleSignal

  const onTitleInput = (e: InputEvent) => setTitle((e.target as HTMLInputElement).value)

  createEffect(() => {
    ws.send('match', 'update_title', title())
    if (title().length == 32)
      showToast({
        title: 'Aviso',
        description: 'La longitud máxima del título es de 32 caracteres.',
        variant: 'warning',
        duration: 7000
      })
  })

  return (
    <TextField class="gap-0">
      <TextFieldLabel class="flex grow items-center">Título</TextFieldLabel>
      <TextFieldInput
        placeholder={'El título está vacío'}
        value={title()}
        onInput={onTitleInput}
        maxLength={32}
      />
    </TextField>
  )
}

export default MatchTitle
