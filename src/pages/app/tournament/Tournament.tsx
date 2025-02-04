import { Component } from 'solid-js'

const Tournament: Component = () => {
  return (
    <div class="px-6 py-4">
      <h1 class="font-semibold text-xl">Torneo</h1>
      <p class="mt-2">
        Esta página es para seleccionar y manejar el torneo activo actualmente. Esto es
        con la api de start.gg, hay que implementar el fetch de los torneos que el usuario
        actual administra. Hay algunos que no aparecen en la lista por estar ocultos, hay
        que darle la oportunidad dal usuario de añadir uno por URL y validar que es admin.
      </p>
    </div>
  )
}

export default Tournament
