import { Component, createSignal } from 'solid-js'
import { Button } from '@components/ui/button'
import { TextField, TextFieldInput, TextFieldLabel } from "@components/ui/text-field"
import { MatchStateProvider} from '@/contexts/matchState'
import MatchState, { DEFAULT_MATCH_STATE } from '@models/MatchState'
import { showToast, Toaster } from "@components/ui/toast"

  const Match: Component = () => {
    <Toaster />
    const [titulo, setTitulo] = createSignal('')
    const [ronda, setRonda] = createSignal(0)
    const [ganado1, setGanado1] = createSignal(0)
    const [ganado2, setGanado2] = createSignal(0)
    const [actualizado, setActualizado] = createSignal<MatchState>(DEFAULT_MATCH_STATE)

    const onInput1 = (e: Event) => {
      setTitulo((e.target as HTMLInputElement).value)
    }

    const onInput2 = (e: Event) => {
      setRonda(parseInt((e.target as HTMLInputElement).value))
    }
  
    const onInput3 = (e: Event) => {
      setGanado1(parseInt((e.target as HTMLInputElement).value))
    }
  
    const onInput4 = (e: Event) => {
      setGanado2(parseInt((e.target as HTMLInputElement).value))
    }

    const ActualizarMatch = {
      title: titulo(),
      bestOf: ronda(),
      isGameInProgress: false,
      gameNumber: 1,
      blueWins: ganado1(),
      blueName: 'Equipo Azul',
      orangeWins: ganado2(),
      orangeName: 'Equipo Naranja'
    }

    const onButtonClick = () => {
      if (titulo().length > 32) {
        showToast({ 
          title: "Error!", 
          description: "El título no puede tener más de 32 caracteres.", 
          variant: "error"
        })
      } else if (ronda() != 1 && ronda() != 3 && ronda() != 5 && ronda() != 7) {
        showToast({ 
          title: "Error!", 
          description: "Las rondas deben ser de 1, 3, 5 o 7.", 
          variant: "error"
        })
      } else if (ganado1() < 0 || ganado2() < 0) {
        showToast({ 
          title: "Error!", 
          description: "La cantidad de juegos no puede ser negativo", 
          variant: "error"
        })        
      } else {
        showToast({ 
          title: "Éxito!", 
          description: "Los datos del partido han sido cambiados.", 
          variant: "success"
        })
        setActualizado(ActualizarMatch)
      }
    }

    return (
      <div class="px-6 py-4">
        <h1 class="font-semibold text-xl">Partido</h1>
        <div class="flex flex-row gap-2">
          <TextField class="flex flex-row items-center gap-2 w-full">
            <TextFieldLabel for="titulo" class="text-center">Titulo del Partido Actual</TextFieldLabel>
            <TextFieldInput type="text" id="titulo" placeholder="Inserte el título del partido" onInput={onInput1}/>
          </TextField>
        </div>
        <br />
        <div class="flex flex-row gap-2">
          <TextField class="flex flex-row items-center gap-0.5 w-full">
            <TextFieldLabel for="titulo" class="text-center">Cantidad de Rondas</TextFieldLabel>
            <TextFieldInput type="text" id="ronda" placeholder="Inserta el número de rondas" onInput={onInput2}/>
          </TextField>
        </div>
        <br />
        <div class="flex flex-row gap-2">
          <TextField class="flex flex-row items-center gap-0.5 w-full">
            <TextFieldLabel for="titulo" class="text-center">Cantidad de Juegos Ganados (Equipo 1)</TextFieldLabel>
            <TextFieldInput type="text" id="ganado1" placeholder="Inserte el número de juegos ganados" onInput={onInput3}/>
          </TextField>
        </div>
        <br />
        <div class="flex flex-row gap-2">
          <TextField class="flex flex-row items-center gap-0.5 w-full">
            <TextFieldLabel for="titulo" class="text-center">Cantidad de Juegos Ganados (Equipo 2)</TextFieldLabel>
            <TextFieldInput type="text" id="ganado2" placeholder="Inserte el número de juegos ganados" onInput={onInput4}/>
          </TextField>
        </div>
        <br />
        <div class="flex flex-col items-center">
        <Button onClick={onButtonClick} class="flex flex-col items-center">Aceptar</Button>
        </div>
        <br />
        <MatchStateProvider>{actualizado()}</MatchStateProvider>
      </div>
    )
  }
  
  export default Match