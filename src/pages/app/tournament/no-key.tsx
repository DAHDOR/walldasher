import arrow from '@assets/icons/arrow.svg'
import { Button } from '@kobalte/core/button'
import { openUrl } from '@tauri-apps/plugin-opener'

const StartGG = () => {
  const onStart = () => {
    openUrl('https://start.gg').then().catch(console.error)
  }

  return (
    <>
      <Button class="font-bold underline" onClick={onStart}>
        Start.gg
      </Button>
    </>
  )
}

const NoKey = () => {
  return (
    <>
      <div class="py-4 px-6 ">
        <h1 class="font-semibold text-xl">No has vinculado tu cuenta de Start.gg</h1>
        <p class="mt-2">
          Para vincular tu cuenta, ve a los Developer Settings de <StartGG />
        </p>
        <p class="mt-2">
          Para eso, entra a <StartGG />, ve a tu perfil y luego a Developer Settings. Ahí
          podrás generar una llave de autenticación para tu cuenta.
        </p>
      </div>
      <div class="absolute bottom-4 left-14 gap-0">
        <p class="ml-4 font-medium">
          Si ya tienes una llave, entra a la configuración y pégala.
        </p>
        <img src={arrow} class="h-20 rotate-180" />
      </div>
    </>
  )
}

export { NoKey }
