import { Component } from 'solid-js'

const Match: Component = () => {
  return (
    <div class="px-6 py-4">
      <h1 class="font-semibold text-xl">Partido</h1>
      <p class="mt-2">
        Esta página es para seleccionar y manejar el partido activo actualmente. Se
        selecciona a partir del torneo activo actual. Este módulo también se encarga de
        reaccionar a eventos de inicio y fin para mostrar al usuario el estado del juego y
        del partido (un partido es un conjunto de juegos, es decir, una serie de X
        juegos).
      </p>
    </div>
  )
}

export default Match
