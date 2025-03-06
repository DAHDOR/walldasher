import { Button } from '@components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel
} from '@components/ui/number-field'
import { TextField, TextFieldInput } from '@components/ui/text-field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { openLogo, saveLogo } from '@lib/images'
import { Team } from '@models/db'
import { Icon } from 'solid-heroicons'
import { archiveBoxArrowDown, folderPlus } from 'solid-heroicons/solid'
import { Accessor, createSignal, Signal } from 'solid-js'

interface TeamFormProps {
  bestOf: Accessor<number>
  wins: Signal<number>
  team: Signal<Team>
}

const TeamForm = (props: TeamFormProps) => {
  const bestOf = props.bestOf
  const [wins, setWins] = props.wins
  const [team, setTeam] = props.team
  const [url, setUrl] = createSignal('')

  const onSelectLogo = () => {
    openLogo()
      .then(path => {
        setUrl(path)
      })
      .catch(console.error)
  }

  const onSaveLogo = () => {
    saveLogo(url())
      .then(logo => {
        setTeam({ ...team(), logo_url: logo })
      })
      .catch(console.error)
  }

  return (
    <>
      <CardHeader class="flex flex-row gap-3 items-center">
        <Tooltip>
          <TooltipTrigger>
            <Dialog>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger as={Button<'button'>} variant="outline" class="px-2">
                    <img src={team().logo_url} class="w-6 h-6" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Cambiar logo</TooltipContent>
              </Tooltip>
              <DialogContent class="max-w-lg">
                <DialogHeader class="flex flex-row items-center gap-4">
                  <DialogTitle class="!m-0">Cambiar logo del equipo</DialogTitle>
                  <Button
                    variant="outline"
                    class="hover:bg-transparent p-2 hover:cursor-default"
                  >
                    <img src={team().logo_url} class="h-6" />
                  </Button>
                </DialogHeader>
                <div class="flex flex-col items-center">
                  <div class="flex items-center flex-row gap-4 w-full p-4">
                    <Button onClick={onSelectLogo}>
                      <Icon path={folderPlus} />
                      Cargar PNG
                    </Button>
                    <TextField class="grow">
                      <TextFieldInput
                        class="grow"
                        value={url()}
                        onInput={(e: Event) => {
                          setUrl((e.currentTarget as HTMLInputElement).value)
                        }}
                        placeholder="Inserta una URL"
                      />
                    </TextField>
                  </div>
                  <Button class="w-fit" onClick={onSaveLogo}>
                    <Icon path={archiveBoxArrowDown} />
                    Guardar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>Cambiar logo</TooltipContent>
        </Tooltip>
        <CardTitle class="!m-0">{team().name}</CardTitle>
      </CardHeader>
      <CardContent>
        <NumberField
          class="flex w-16 flex-col gap-2"
          rawValue={wins()}
          onRawValueChange={setWins}
        >
          <NumberFieldLabel>Victorias</NumberFieldLabel>
          <NumberFieldGroup>
            <NumberFieldInput class="!opacity-100 !cursor-default" disabled />
            <NumberFieldIncrementTrigger disabled={wins() >= Math.ceil(bestOf() / 2)} />
            <NumberFieldDecrementTrigger disabled={wins() <= 0} />
          </NumberFieldGroup>
        </NumberField>
      </CardContent>
    </>
  )
}

export default TeamForm
