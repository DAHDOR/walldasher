import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { showToast } from '@components/ui/toast'
import { Button } from '@components/ui/button'
import { Component } from 'solid-js'


const Home: Component = () => {
  function copyToClipboard(text: string) {
      navigator.clipboard.writeText(text).then(
        () =>  {showToast({
                title: '',
                description: 'La URL ha sido copiada al portapapeles',
                variant: 'success',
                duration: 2500
              })},
        err => alert('Failed to copy to clipboard')
      )
    }

  const onIngame = () => {
    return 'http://localhost:9527/overlay/ingame'
  }

  const onRoundrobin = () => {
    return 'http://localhost:9527/overlay/roundrobin'
  }

  const onNextup = () => {
    return 'http://localhost:9527/overlay/nextup'
  }

  const onPhase = () => {
    return 'http://localhost:9527/overlay/phase'
  }

  return (
    <div class="px-6 py-4">
      <h1 class="font-semibold text-xl mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overlays</CardTitle>
          <CardDescription>Links de los overlays.</CardDescription>
        </CardHeader>
        <CardContent>
        <div class="grid grid-cols-2 gap-4">
              {/* items-center */}
            {/* <div class="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 justify-center"> */}
            <p class="flex flex-col text-center items-center gap-2">
              Marcador ingame: 'descripcion'
              <Button class="w-40 bg-white hover:bg-stone-300 text-black" onclick={() => copyToClipboard(onIngame())}>
                Ingame Overlay
              </Button>
            </p>
            <p class="flex flex-col text-center items-center gap-2">
              Pantalla de Round Robin: 'descripcion'
              <Button class="w-40 bg-white hover:bg-stone-300 text-black" onclick={() => copyToClipboard(onRoundrobin())}>
                Round Robin Overlay
              </Button>
            </p>
            <p class="flex flex-col text-center items-center gap-2">
              Pantalla de Next Up: 'descripcion'
              <Button class="w-40 bg-white hover:bg-stone-300 text-black" onclick={() => copyToClipboard(onNextup())}>
                Next Up Overlay
              </Button>
            </p>
            <p class="flex flex-col text-center items-center gap-2">
              Pantalla de Fases: 'descripcion'
              <Button class="w-40 bg-white hover:bg-stone-300 text-black" onclick={() => copyToClipboard(onPhase())}>
                Phase Overlay
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
