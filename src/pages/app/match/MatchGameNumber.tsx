import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel
} from '@components/ui/number-field'
import { Accessor, Signal } from 'solid-js'

interface MatchGameNumberProps {
  gameNumber: Signal<number>
  bestOf: Accessor<number>
}

const MatchGameNumber = (props: MatchGameNumberProps) => {
  const [gameNumber, setGameNumber] = props.gameNumber
  const bestOf = props.bestOf

  return (
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
  )
}

export default MatchGameNumber
