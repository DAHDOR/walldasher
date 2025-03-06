/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui/select'
import { Signal } from 'solid-js'

interface MatchBestOfProps {
  bestOf: Signal<number>
}

const MatchBestOf = (props: MatchBestOfProps) => {
  const [bestOf, setBestOf] = props.bestOf

  return (
    <Select
      value={bestOf()}
      onChange={(bo: number) => setBestOf(bo || bestOf())}
      options={[1, 3, 5, 7]}
      itemComponent={props => (
        <SelectItem item={props.item}>{props.item.rawValue.toString()}</SelectItem>
      )}
    >
      <SelectLabel>Al mejor de</SelectLabel>
      <SelectTrigger aria-label="Mejor de">
        <SelectValue<number>>{state => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent class="w-6" />
    </Select>
  )
}

export default MatchBestOf
