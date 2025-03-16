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

  const onWinner = () => {
    return 'http://localhost:9527/overlay/winner'
  }

  const onPostgame = () => {
    return 'http://localhost:9527/overlay/postgame'
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
            <div class="flex flex-col gap-4">
              {/* items-center */}
            {/* <div class="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 justify-center"> */}
            <p class="flex flex-col gap-4">
              Marcador ingame: 'descripcion'
              <Button class="w-40 " onclick={() => copyToClipboard(onIngame())}>
                Ingame Overlay
              </Button>
            </p>
            <p class="flex flex-col gap-4">
              Ganador: 'descripcion'
              <Button class="w-40" onclick={() => copyToClipboard(onWinner())}>
                Winner Overlay
              </Button>
            </p>
            <p class="flex flex-col gap-4">
              Scoreboard postjuego: 'descripcion'
              <Button class="w-40" onclick={() => copyToClipboard(onPostgame())}>
                Postgame Overlay
              </Button>
            </p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
