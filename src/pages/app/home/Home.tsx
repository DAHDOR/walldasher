import { Callout, CalloutContent } from '@components/ui/callout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { Button } from '@kobalte/core/button'
import { openUrl } from '@tauri-apps/plugin-opener'
import { Component } from 'solid-js'

const Home: Component = () => {
  const onIngame = () => {
    openUrl('http://localhost:9527/overlay/ingame').then().catch(console.error)
  }

  const onWinner = () => {
    openUrl('http://localhost:9527/overlay/winner').then().catch(console.error)
  }

  const onPostgame = () => {
    openUrl('http://localhost:9527/overlay/postgame').then().catch(console.error)
  }

  return (
    <div class="px-6 py-4">
      <h1 class="font-semibold text-xl mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overlays</CardTitle>
          <CardDescription>Estos son los links de los overlays.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-4">
            <p>
              En juego:{' '}
              <Button class="underline" onClick={onIngame}>
                http://localhost:9527/overlay/ingame
              </Button>
            </p>
            <p>
              Ganador:{' '}
              <Button class="underline" onClick={onWinner}>
                http://localhost:9527/overlay/winner
              </Button>
            </p>
            <p>
              Post juego:{' '}
              <Button class="underline" onClick={onPostgame}>
                http://localhost:9527/overlay/postgame
              </Button>
            </p>
            <Callout variant="warning" class="mt-2">
              <CalloutContent class="mb-[10px]">
                En modo de desarrollo el puerto es 1420.
              </CalloutContent>
            </Callout>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
