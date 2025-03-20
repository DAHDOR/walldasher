import TournamentState, { RoundMatch, TournamentTeam } from '@models/TournamentState'
import { execute } from './graphql/execute'
import { EventPlayers, PhaseGroupSets, TournamentRounds, UserID } from './query'

const getUserID = async (key: string) => (await execute(key, UserID)).currentUser.id

const getTournamentToRounds = async (key: string, slug: string) => {
  const tournament = (await execute(key, TournamentRounds, { slug })).tournament

  if (!tournament) throw new Error('No tournament found')

  if (tournament.events.length === 0) throw new Error('No events found')

  const userID = await getUserID(key)

  if (!tournament.admins.some(admin => admin.id === userID))
    throw new Error('User is not an admin')

  return {
    id: tournament.id as unknown as number,
    name: tournament.name,
    logo_url: tournament.images[0]?.url || '',
    events: tournament.events.map(event => ({
      id: event.id as unknown as number,
      name: event.name,
      tournament: tournament.id as unknown as number,
      phases: event.phases.map(phase => ({
        id: phase.id as unknown as number,
        name: phase.name,
        event: event.id as unknown as number,
        number: phase.phaseOrder,
        brackets: phase.phaseGroups.nodes.map(bracket => ({
          id: bracket.id as unknown as number,
          phase: phase.id as unknown as number,
          identifier: bracket.displayIdentifier,
          type: bracket.bracketType,
          rounds: bracket.rounds.map(round => ({
            id: round.id as unknown as number,
            bracket: bracket.id as unknown as number,
            number: round.number,
            best_of: round.bestOf,
            start_at: round.startAt as number,
            matches: []
          }))
        }))
      }))
    })),
    teams: []
  } as TournamentState
}

const getBracketMatches = async (key: string, id: string) => {
  const phaseGroup = (await execute(key, PhaseGroupSets, { phaseGroupId: id })).phaseGroup

  if (!phaseGroup) throw new Error('No bracket found')

  return phaseGroup.sets.nodes.map(set => ({
    id: set.id as unknown as number,
    title: '',
    best_of: 1,
    number: 1,
    round: set.round,
    identifier: set.identifier,
    winner: set.winnerId,
    team1: set.slots[0].entrant.id as unknown as number,
    team2: set.slots[1].entrant.id as unknown as number
  })) as RoundMatch[]
}

const getEventFromTeamToPlayers = async (key: string, id: string) => {
  const e = (await execute(key, EventPlayers, { eventId: id })).event

  if (!e) throw new Error('No event found')

  return e.entrants.nodes.map(entrant => ({
    id: entrant.id as unknown as number,
    name: entrant.name,
    logo_url: entrant.team.images[0]?.url || '',
    tournament: e.tournament.id as unknown as number,
    players: entrant.participants.map(participant => ({
      id: participant.id as unknown as number,
      name: participant.gamerTag,
      team: entrant.id as unknown as number
    }))
  })) as TournamentTeam[]
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
