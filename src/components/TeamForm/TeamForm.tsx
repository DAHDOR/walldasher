import { Spinner } from '@assets/index'
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
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput
} from '@components/ui/text-field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { logoToBlob, openLogo } from '@lib/images'
import { MatchTeam } from '@models/MatchState'
import { Icon } from 'solid-heroicons'
import { archiveBoxArrowDown, folderPlus } from 'solid-heroicons/solid'
import { Accessor, createEffect, createSignal, Match, Signal, Switch } from 'solid-js'

interface MatchTeamFormProps {
  bestOf: Accessor<number>
  team: Signal<MatchTeam>
}

const TeamForm = (props: MatchTeamFormProps) => {
  const bestOf = props.bestOf
  const [team, setTeam] = props.team
  const [logoPath, setLogoPath] = createSignal(team().logo_url)
  const [logoPathError, setLogoPathError] = createSignal(false)
  const [logoLoading, setLogoLoading] = createSignal(false)

  const onSelectLogo = () => {
    openLogo()
      .then(path => (path ? setLogoPath(path) : {}))
      .catch(console.error)
  }

  const onSaveLogo = () => {
    setLogoLoading(true)
    logoToBlob(logoPath())
      .then(blob => setTeam(team => ({ ...team, logo_url: URL.createObjectURL(blob) })))
      .catch(console.error)
    setLogoLoading(false)
  }

  createEffect(() => {
    if (!/.*\.png$/.exec(logoPath())) setLogoPathError(true)
    else setLogoPathError(false)
  })

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
                    <img src={logoPath()} class="h-6" />
                  </Button>
                </DialogHeader>
                <div class="flex flex-col items-center">
                  <div class="flex flex-row gap-4 w-full p-4">
                    <Button onClick={onSelectLogo} class="mb-5">
                      <Switch>
                        <Match when={logoLoading()}>
                          <Spinner />
                        </Match>
                        <Match when={!logoPathError()}>
                          <Icon path={folderPlus} />
                        </Match>
                      </Switch>
                      Cargar PNG
                    </Button>
                    <TextField
                      validationState={logoPathError() ? 'invalid' : 'valid'}
                      class="grow"
                    >
                      <TextFieldInput
                        value={logoPath()}
                        onInput={(e: Event) =>
                          setLogoPath((e.currentTarget as HTMLInputElement).value)
                        }
                        placeholder="Inserta una URL o ruta de archivo"
                      />
                      <TextFieldErrorMessage>
                        El archivo debe ser un .png
                      </TextFieldErrorMessage>
                    </TextField>
                  </div>
                  <Button
                    class="w-fit"
                    onClick={onSaveLogo}
                    disabled={logoPathError() || logoLoading()}
                  >
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
          rawValue={team().wins}
          onRawValueChange={value => setTeam(team => ({ ...team, wins: value }))}
        >
          <NumberFieldLabel>Victorias</NumberFieldLabel>
          <NumberFieldGroup>
            <NumberFieldInput class="!opacity-100 !cursor-default" disabled />
            <NumberFieldIncrementTrigger
              disabled={team().wins >= Math.ceil(bestOf() / 2)}
            />
            <NumberFieldDecrementTrigger disabled={team().wins <= 0} />
          </NumberFieldGroup>
        </NumberField>
      </CardContent>
    </>
  )
}

export default TeamForm
