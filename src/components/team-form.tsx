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
import { showToast } from '@components/ui/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { openPngFile } from '@lib/images'
import { MatchTeam } from '@models/MatchState'
import { readFile } from '@tauri-apps/plugin-fs'
import { Icon } from 'solid-heroicons'
import { archiveBoxArrowDown, folderPlus, handThumbUp } from 'solid-heroicons/solid'
import { Accessor, createEffect, createSignal, Match, Signal, Switch } from 'solid-js'

interface MatchTeamFormProps {
  bestOf: Accessor<number>
  team: Signal<MatchTeam>
}

const TeamForm = (props: MatchTeamFormProps) => {
  const bestOf = props.bestOf
  const [team, setTeam] = props.team
  const [teamName, setTeamName] = createSignal(team().name)
  const [logoPath, setLogoPath] = createSignal('')
  const [logoPathError, setLogoPathError] = createSignal(false)
  const [logoLoading, setLogoLoading] = createSignal(false)

  const onTeamNameInput = (e: InputEvent) => {
    setTeamName((e.target as HTMLInputElement).value)
    if (teamName().length == 12)
      showToast({
        title: 'Aviso',
        description: 'La longitud máxima del nombre del equipo es de 12 caracteres.',
        variant: 'warning',
        duration: 7000
      })
  }

  const onTeamNameUpdate = () => {
    setTeam(team => ({ ...team, name: teamName() }))
    showToast({ description: 'Nombre del equipo actualizado.', variant: 'success' })
  }

  const onSelectLogo = () => {
    openPngFile()
      .then(path => (path ? setLogoPath(path) : {}))
      .catch(console.error)
  }

  const onSaveLogo = () => {
    setLogoLoading(true)
    readFile(logoPath())
      .then(logoBytes => {
        setTeam(team => ({
          ...team,
          logoBytes,
          logoUrl: URL.createObjectURL(new Blob([logoBytes], { type: 'image/png' }))
        }))
        showToast({ title: 'Logo actualizado.', variant: 'success' })
      })
      .catch(() => showToast({ title: 'Error al actualizar el logo.', variant: 'error' }))
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
                    <img src={team().logoUrl} class="w-6 h-6" />
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
                    <img src={team().logoUrl} class="h-6" />
                  </Button>
                </DialogHeader>
                <div class="flex flex-col items-center">
                  <div class="flex flex-row gap-4 w-full p-4">
                    <Button onClick={onSelectLogo} class="mb-5">
                      <Switch>
                        <Match when={logoLoading()}>
                          <Spinner />
                        </Match>
                        <Match when={!logoLoading()}>
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
        <CardTitle class="!m-0 flex-grow">
          <TextField class="flex flex-row gap-3">
            <TextFieldInput value={teamName()} onInput={onTeamNameInput} maxLength={12} />
            <Button variant="outline" class="px-3" onClick={onTeamNameUpdate}>
              <Icon path={handThumbUp} />
            </Button>
          </TextField>
        </CardTitle>
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

export { TeamForm }
