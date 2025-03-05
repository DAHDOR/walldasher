import { useMatchState } from '@/contexts/matchState'
import { useWS } from '@/contexts/ws'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel
} from '@components/ui/number-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui/select'
import { TextField, TextFieldInput, TextFieldLabel } from '@components/ui/text-field'
import { showToast, Toaster } from '@components/ui/toast'
import { Component, createEffect, createSignal } from 'solid-js'

const Match: Component = () => {
  const ws = useWS()
  const matchState = useMatchState()

  const [title, setTitle] = createSignal(matchState().title)
  const [bestOf, setBestOf] = createSignal(matchState().bestOf)
  const [gameNumber, setGameNumber] = createSignal(matchState().gameNumber)
  const [blueWins, setBlueWins] = createSignal(matchState().blueWins)
  const [orangeWins, setOrangeWins] = createSignal(matchState().orangeWins)

  const onTitleInput = (e: InputEvent) => setTitle((e.target as HTMLInputElement).value)

  createEffect(() => {
    ws.send('match', 'update_title', title())
    if (title().length == 32)
      showToast({
        title: 'Aviso',
        description: 'La longitud máxima del título es de 32 caracteres',
        variant: 'warning',
        duration: 5000
      })
  })

  createEffect(() => {
    ws.send('match', 'update_best_of', bestOf())
    if (blueWins() > Math.ceil(bestOf() / 2)) setBlueWins(Math.ceil(bestOf() / 2))
    if (orangeWins() > Math.ceil(bestOf() / 2)) setOrangeWins(Math.ceil(bestOf() / 2))
    if (gameNumber() > bestOf()) setGameNumber(bestOf())
  })

  createEffect(() => {
    ws.send('match', 'update_game_number', gameNumber())
  })

  createEffect(() => {
    ws.send('match', 'update_blue_wins', blueWins())
  })

  createEffect(() => {
    ws.send('match', 'update_orange_wins', orangeWins())
  })

  return (
    <div class="flex flex-col px-6 py-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Partido</CardTitle>
        </CardHeader>
        <CardContent class="flex row flex-wrap gap-4">
          <TextField class="gap-0">
            <TextFieldLabel class="flex grow items-center">Título</TextFieldLabel>
            <TextFieldInput
              placeholder={'El título está vacío'}
              value={title()}
              onInput={onTitleInput}
              maxLength={32}
            />
          </TextField>
          <Select
            value={bestOf()}
            onChange={(bo: number) => setBestOf(bo || bestOf())}
            options={[1, 3, 5, 7]}
            itemComponent={props => (
              <SelectItem item={props.item}>{props.item.rawValue.toString()}</SelectItem>
            )}
          >
            <SelectLabel>Mejor de</SelectLabel>
            <SelectTrigger aria-label="Mejor de">
              <SelectValue<number>>{state => state.selectedOption()}</SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
          <NumberField
            class="flex w-16 flex-col gap-0"
            rawValue={gameNumber()}
            onRawValueChange={setGameNumber}
          >
            <NumberFieldLabel class="flex grow items-center">Juego</NumberFieldLabel>
            <NumberFieldGroup>
              <NumberFieldInput class="!opacity-100 !cursor-default" disabled />
              <NumberFieldIncrementTrigger disabled={gameNumber() >= bestOf()} />
              <NumberFieldDecrementTrigger disabled={gameNumber() <= 1} />
            </NumberFieldGroup>
          </NumberField>
        </CardContent>
      </Card>
      <div class="flex row gap-6 flex-wrap">
        <Card class="border-blue-500 flex-grow">
          <CardHeader>
            <CardTitle>Equipo Azul</CardTitle>
          </CardHeader>
          <CardContent>
            <NumberField
              class="flex w-16 flex-col gap-2"
              rawValue={blueWins()}
              onRawValueChange={setBlueWins}
            >
              <NumberFieldLabel>Victorias</NumberFieldLabel>
              <NumberFieldGroup>
                <NumberFieldInput class="!opacity-100 !cursor-default" disabled />
                <NumberFieldIncrementTrigger
                  disabled={blueWins() >= Math.ceil(bestOf() / 2)}
                />
                <NumberFieldDecrementTrigger disabled={blueWins() <= 0} />
              </NumberFieldGroup>
            </NumberField>
          </CardContent>
        </Card>
        <Card class="border-orange-500 flex-grow">
          <CardHeader>
            <CardTitle>Equipo Naranja</CardTitle>
          </CardHeader>
          <CardContent>
            <NumberField
              class="flex w-16 flex-col gap-2"
              rawValue={orangeWins()}
              onRawValueChange={setOrangeWins}
            >
              <NumberFieldLabel>Victorias</NumberFieldLabel>
              <NumberFieldGroup>
                <NumberFieldInput class="!opacity-100 !cursor-default" disabled />
                <NumberFieldIncrementTrigger
                  disabled={orangeWins() >= Math.ceil(bestOf() / 2)}
                />
                <NumberFieldDecrementTrigger disabled={orangeWins() <= 0} />
              </NumberFieldGroup>
            </NumberField>
          </CardContent>
        </Card>
      </div>
      <Toaster class="dark" />
    </div>
  )
}

export default Match
