import TournamentState, {
  BracketRound,
  EventPhase,
  PhaseBracket,
  RoundMatch,
  TeamPlayer,
  TournamentEvent,
  TournamentTeam
} from '@models/TournamentState'
import { execute } from './graphql/execute'
import { EventPlayers, PhaseGroupSets, TournamentRounds, UserID } from './query'

const getUserID = async (key: string) => (await execute(key, UserID)).currentUser.id

const getTournamentToRounds = async (
  key: string,
  slug: string
): Promise<TournamentState> => {
  const startTournament = (await execute(key, TournamentRounds, { slug })).tournament

  if (!startTournament) throw new Error('No tournament found')

  if (startTournament.events.length === 0) throw new Error('No events found')

  const userID = await getUserID(key)

  const isUserAdmin = startTournament.admins.some(admin => admin.id === userID)

  if (!isUserAdmin) throw new Error('User is not an admin')

  const tournament: TournamentState = {
    id: startTournament.id as unknown as number,
    name: startTournament.name,
    logo: startTournament.images[0]?.url || '',
    teams: [],
    events: []
  }

  startTournament.events.forEach(startEvent => {
    const event: TournamentEvent = {
      id: startEvent.id as unknown as number,
      name: startEvent.name,
      tournament: startTournament.id as unknown as number,
      phases: []
    }

    startEvent.phases.forEach(startPhase => {
      const phase: EventPhase = {
        id: startPhase.id as unknown as number,
        name: startPhase.name,
        event: startEvent.id as unknown as number,
        number: startPhase.phaseOrder,
        brackets: []
      }

      startPhase.phaseGroups.nodes.forEach(startBracket => {
        const bracket: PhaseBracket = {
          id: startBracket.id as unknown as number,
          phase: startPhase.id as unknown as number,
          identifier: startBracket.displayIdentifier,
          type: startBracket.bracketType,
          standings: [],
          rounds: []
        }

        startBracket.rounds.forEach(startRound => {
          const round: BracketRound = {
            id: startRound.id as unknown as number,
            bracket: startBracket.id as unknown as number,
            number: startRound.number,
            best_of: startRound.bestOf,
            start_at: startRound.startAt as number,
            matches: []
          }

          bracket.rounds.push(round)
        })

        phase.brackets.push(bracket)
      })

      event.phases.push(phase)
    })

    tournament.events.push(event)
  })

  return tournament
}

const getBracketMatches = async (key: string, id: string): Promise<RoundMatch[]> => {
  const startPhaseGroup = (await execute(key, PhaseGroupSets, { phaseGroupId: id }))
    .phaseGroup

  if (!startPhaseGroup) throw new Error('No bracket found')

  return startPhaseGroup.sets.nodes.map(startSet => ({
    id: startSet.id as unknown as number,
    title: '',
    best_of: 1,
    number: 1,
    round: startSet.round,
    identifier: startSet.identifier,
    winner: startSet.winnerId,
    team1: startSet.slots[0].entrant.id as unknown as number,
    team2: startSet.slots[1].entrant.id as unknown as number
  }))
}

const getEventFromTeamToPlayers = async (
  key: string,
  id: string
): Promise<TournamentTeam[]> => {
  const startEvent = (await execute(key, EventPlayers, { eventId: id })).event

  if (!startEvent) throw new Error('No event found')

  const teams: TournamentTeam[] = []

  startEvent.entrants.nodes.forEach(startEntrant => {
    const team: TournamentTeam = {
      id: startEntrant.id as unknown as number,
      tournament: startEvent.tournament.id as unknown as number,
      name: startEntrant.name,
      logo: startEntrant.team.images[0]?.url || '',
      players: []
    }

    startEntrant.participants.forEach(startParticipant => {
      const player: TeamPlayer = {
        id: startParticipant.id as unknown as number,
        name: startParticipant.gamerTag,
        team: startEntrant.id as unknown as number
      }

      team.players.push(player)
    })

    teams.push(team)
  })

  return teams
}

const getFullTournament = async (key: string, slug: string) => {
  const tournament = await getTournamentToRounds(key, slug)

  for (const event of tournament.events) {
    tournament.teams.push(...(await getEventFromTeamToPlayers(key, event.id.toString())))
    for (const phase of event.phases)
      for (const bracket of phase.brackets) {
        const matches = await getBracketMatches(key, bracket.id.toString())
        for (const round of bracket.rounds) {
          round.matches = matches.filter(match => match.round === round.number)
          for (const match of round.matches) match.best_of = round.best_of
        }
      }
  }

  return tournament
}

export {
  getUserID,
  getTournamentToRounds,
  getBracketMatches,
  getEventFromTeamToPlayers,
  getFullTournament
}
