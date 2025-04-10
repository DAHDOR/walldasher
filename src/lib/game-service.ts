import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'

const getOrangeTeam = (players: USPlayer[]): USPlayer[] => {
  return players.filter(player => player.team === 1)
}

const getBlueTeam = (players: USPlayer[]): USPlayer[] => {
  return players.filter(player => player.team === 0)
}

const getPlayerFromTarget = (
  players: USPlayer[],
  target: string
): USPlayer | undefined => {
  return players.find(player => target.includes(player.name))
}

const getClockFromSeconds = (seconds: number, isOT: boolean): string => {
  const numMinutes = Math.floor(seconds / 60)
  const numSeconds = seconds - numMinutes * 60
  const secondsString = numSeconds > 9 ? numSeconds.toString() : `0${numSeconds}`
  return isOT ? `+${numMinutes}:${secondsString}` : `${numMinutes}:${secondsString}`
}

const getScoreFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.score)
}

const getGoalsFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.goals)
}

const getAssistsFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.assists)
}

const getShotsFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.shots)
}

const getSavesFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.saves)
}

const getDemosFromPlayers = (players: USPlayer[]): number[] => {
  return players.map(player => player.demos)
}

export const GameService = {
  getOrangeTeam,
  getBlueTeam,
  getPlayerFromTarget,
  getClockFromSeconds,
  getScoreFromPlayers,
  getGoalsFromPlayers,
  getAssistsFromPlayers,
  getShotsFromPlayers,
  getSavesFromPlayers,
  getDemosFromPlayers
}
