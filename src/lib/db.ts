import TournamentState from '@models/TournamentState'
import Database from '@tauri-apps/plugin-sql'
// Import all the tables from models/db.ts
import {
  Bracket,
  Event,
  Game,
  Match,
  Phase,
  Player,
  Round,
  Standing,
  Stat,
  Team,
  Tournament
} from '../models/db'

// Cargar una sola vez la BD y usar la misma instancia en cada query
const db = await Database.load('sqlite:test4.db')

// INSERTS

// INSERT everything from TournamentState
export async function insertTournamentState(tournamentState: TournamentState) {
  for (const team of tournamentState.teams) {
    await insertTeam(team)
    for (const player of team.players) {
      await insertPlayer(player)
    }
  }
  for (const event of tournamentState.events) {
    await insertEvent(event)
    for (const phase of event.phases) {
      await insertPhase(phase)
      for (const bracket of phase.brackets) {
        await insertBracket(bracket)
        for (const round of bracket.rounds) {
          await insertRound(round)
          for (const standing of bracket.standings) {
            await insertStanding(standing)
          }
        }
      }
    }
  }
}

// INSERT into Table Bracket
export async function insertBracket(bracket: Bracket) {
  try {
    const result = await db.execute(
      'INSERT INTO stats (id, phase, identifier, type) VALUES ($1, $2, $3, $4)',
      [bracket.id, bracket.phase, bracket.identifier, bracket.type]
    )
    console.log('Bracket inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting bracket:', error)
    throw error
  }
}

// INSERT into Table Event
export async function insertEvent(event: Event) {
  try {
    const result = await db.execute(
      'INSERT INTO event (id, tournament, name) VALUES ($1, $2, $3)',
      [event.id, event.tournament, event.name]
    )
    console.log('Event inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting event:', error)
    throw error
  }
}

// INSERT into Table Game
export async function insertGame(game: Game) {
  try {
    const result = await db.execute(
      'INSERT INTO game (id, match, number, score1, score2) VALUES ($1, $2, $3, $4, $5)',
      [game.id, game.match, game.number, game.score1, game.score2]
    )
    console.log('Game inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting game:', error)
    throw error
  }
}

//INSERT a Table Match
export async function insertMatch(match: Match) {
  try {
    const result = await db.execute(
      'INSERT INTO match (id, title, round, identifier, number, best_of, team1, team2, winner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      Object.values(match)
    )
    console.log('Match inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting match:', error)
    throw error
  }
}

// INSERT into Table Phase
export async function insertPhase(phase: Phase) {
  try {
    const result = await db.execute(
      'INSERT INTO phase (id, event, number, name) VALUES ($1, $2, $3, $4)',
      Object.values(phase)
    )
    console.log('Phase inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting event:', error)
    throw error
  }
}

// INSERT a Table Player
export async function insertPlayer(player: Player) {
  try {
    const result = await db.execute(
      'INSERT INTO player (id, team, name) VALUES ($1, $2, $3)',
      Object.values(player)
    )
    console.log('Player inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting player:', error)
    throw error
  }
}

// INSERT into Table Round
export async function insertRound(round: Round) {
  try {
    const result = await db.execute(
      'INSERT INTO round (id, bracket, number, best_of, start_at) VALUES ($1, $2, $3, $4, $5)',
      Object.values(round)
    )
    console.log('Round inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting round:', error)
    throw error
  }
}

// INSERT into Table Standing
export async function insertStanding(standing: Standing) {
  try {
    const result = await db.execute(
      'INSERT INTO standing (id, bracket, number, team) VALUES ($1, $2, $3, $4)',
      Object.values(standing)
    )
    console.log('Standing inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting standing:', error)
    throw error
  }
}

// INSERT into Table Stat
export async function insertStat(stat: Stat) {
  try {
    const result = await db.execute(
      'INSERT INTO stat (id, score, game, goals, assists, saves, shots, player) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      Object.values(stat)
    )
    console.log('Stat inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting stat:', error)
    throw error
  }
}

// INSERT a Table Team
export async function insertTeam(team: Team) {
  try {
    const result = await db.execute(
      'INSERT INTO team (id, team, logo) VALUES ($1, $2, $3)',
      Object.values(team)
    )
    console.log('Team inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting team:', error)
    throw error
  }
}

// INSERT into Table Tournament
export async function insertTournament(tournament: Tournament) {
  try {
    const result = await db.execute(
      'INSERT INTO tournament (id, name, logo) VALUES ($1, $2, $3)',
      Object.values(tournament)
    )
    console.log('Tournament inserted successfully!', result)
    return result
  } catch (error) {
    console.error('Error inserting tournament:', error)
    throw error
  }
}

// CONSULTAS
// CONSULTA PARA OBTENER TODOS LOS TORNEOS
export async function getTournaments() {
  try {
    const tournaments = await db.select<Tournament[]>('SELECT * FROM tournament')
    console.log('Tournaments:', tournaments)
    return tournaments
  } catch (error) {
    console.error('Error getting tournaments:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER TORNEOS POR ID
export async function getTournamentById(id: number) {
  try {
    const tournament = await db.select<Tournament[]>(
      'SELECT * FROM tournament WHERE id = $1',
      [id]
    )
    console.log('Tournament:', tournament)
    return tournament
  } catch (error) {
    console.error('Error getting tournament:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER LOS EVENTOS POR TORNEO
export async function getEventsByTournament(tournamentId: number) {
  try {
    const events = await db.select<Event[]>(
      'SELECT * FROM event WHERE tournament_id = $1',
      [tournamentId]
    )
    console.log('Events:', events)
    return events
  } catch (error) {
    console.error('Error getting events:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER LOS EQUIPOS A TRAVÉS DEL ID

export async function getTeamById(teamId: number): Promise<Team | undefined> {
  try {
    const result = await db.select<Team[]>('SELECT * FROM team WHERE id = $1', [teamId])
    return result[0] // Retorna el primer equipo encontrado (debería ser único)
  } catch (error) {
    console.error('Error al obtener el equipo por ID:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER un EQUIPO a través de su campo Name

export async function getTeamsByName(teamName: string): Promise<Team[]> {
  try {
    return await db.select<Team[]>('SELECT * FROM team WHERE name = $1', [teamName])
  } catch (error) {
    console.error('Error al obtener equipos por nombre:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER PHASES POR EVENTO
export async function getPhasesByEvent(eventId: number) {
  try {
    const phases = await db.select<Phase[]>('SELECT * FROM phase WHERE event_id = $1', [
      eventId
    ])
    console.log('Phases:', phases)
    return phases
  } catch (error) {
    console.error('Error getting phases:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER BRACKETS POR PHASE
export async function getBracketsByPhase(phaseId: number) {
  try {
    const brackets = await db.select<Bracket[]>(
      'SELECT * FROM bracket WHERE phase_id = $1',
      [phaseId]
    )
    console.log('Brackets:', brackets)
    return brackets
  } catch (error) {
    console.error('Error getting brackets:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER ROUND POR PHASE
export async function getRoundByPhase(phaseId: number) {
  try {
    const rounds = await db.select<Round[]>(
      'SELECT r.id, r.number, r.bo, r.startAt, r.bracket FROM round r  JOIN bracket b ON r.bracket = b.id WHERE b.phase = $1',
      [phaseId]
    )
    console.log('Rounds: ', rounds)
    return rounds
  } catch (error) {
    console.error('Error getting rounds:', error)
    throw error
  }
}

// CONSULTA PARA MODIFICAR match.number
export async function updateMatchNumber(matchId: number, newNumber: number) {
  try {
    const result = await db.execute('UPDATE match SET number = $1 WHERE id = $2', [
      newNumber,
      matchId
    ])
    console.log('Match updated successfully!', result)
    return result
  } catch (error) {
    console.error('Error updating match:', error)
    throw error
  }
}

// CONSULTA PARA OBTENER STANDINGS+TEAMS POR BRACKET
export async function getStandingsByBracket(bracketId: number) {
  try {
    const standings = await db.select<Standing[]>(
      'SELECT s.id, s.placement, s.team, t.name, t.logo FROM standing s JOIN team t ON s.team = t.id WHERE s.bracket = $1 ORDER BY s.placement',
      [bracketId]
    )
    console.log('Standings:', standings)
    return standings
  } catch (error) {
    console.error('Error getting standings:', error)
    throw error
  }
}

// CONSULTA PARA MODIFICAR team.name
export async function updateTeamName(teamId: number, newName: string) {
  try {
    const result = await db.execute('UPDATE team SET name = $1 WHERE id = $2', [
      newName,
      teamId
    ])
    console.log('Team updated successfully!', result)
    return result
  } catch (error) {
    console.error('Error updating team:', error)
    throw error
  }
}

// CONSULTA PARA MODIFICAR team.logo
export async function updateTeamLogo(teamId: number, newLogo: string) {
  try {
    const result = await db.execute('UPDATE team SET logo = $1 WHERE id = $2', [
      newLogo,
      teamId
    ])
    console.log('Team updated successfully!', result)
    return result
  } catch (error) {
    console.error('Error updating team:', error)
    throw error
  }
}

// CONSULTA PARA CAMBIAR player.name
export async function updatePlayerName(playerId: number, newName: string) {
  try {
    const result = await db.execute('UPDATE player SET name = $1 WHERE id = $2', [
      newName,
      playerId
    ])
    console.log('Player updated successfully!', result)
    return result
  } catch (error) {
    console.error('Error updating player:', error)
    throw error
  }
}

// CONSULTA PARA MODIFICAR match.winner
export async function updateMatchWinner(matchId: number, newWinnerId: string) {
  try {
    const result = await db.execute('UPDATE match SET winner = $1 WHERE id = $2', [
      newWinnerId,
      matchId
    ])
    console.log('Match updated successfully!', result)
    return result
  } catch (error) {
    console.error('Error updating match:', error)
    throw error
  }
}

// GET PARA TODAS LAS TABLAS CON PAGINACIÓN Y TIPADO FUERTE **************************************

// BRACKET
export async function getBrackets(page?: number, limit?: number): Promise<Bracket[]> {
  try {
    let query = 'SELECT * FROM bracket'
    const params: unknown[] = []

    if (page && limit) {
      query += ' LIMIT $1 OFFSET $2'
      const offset = (page - 1) * limit
      params.push(limit, offset)
    }

    return db.select<Bracket[]>(query, params)
  } catch (error) {
    console.error('Error getting brackets:', error)
    throw error
  }
}

export async function getBracketById(id: number): Promise<Bracket> {
  try {
    const result = await db.select<Bracket[]>('SELECT * FROM bracket WHERE id = $1', [id])
    return result[0]
  } catch (error) {
    console.error('Error getting bracket:', error)
    throw error
  }
}

// EVENT
export async function getEvents(page?: number, limit?: number): Promise<Event[]> {
  try {
    let query = 'SELECT * FROM event'
    const params: unknown[] = []

    if (page && limit) {
      query += ' LIMIT $1 OFFSET $2'
      const offset = (page - 1) * limit
      params.push(limit, offset)
    }

    return db.select<Event[]>(query, params)
  } catch (error) {
    console.error('Error getting events:', error)
    throw error
  }
}

export async function getEventById(id: number): Promise<Event> {
  try {
    const result = await db.select<Event[]>('SELECT * FROM event WHERE id = $1', [id])
    return result[0]
  } catch (error) {
    console.error('Error getting event:', error)
    throw error
  }
}

// GAME (Ejemplo con paginación avanzada y conteo total)
export async function getGamesPaginated(
  page: number = 1,
  limit: number = 10
): Promise<{ data: Game[]; total: number }> {
  try {
    const offset = (page - 1) * limit

    const data = await db.select<Game[]>('SELECT * FROM game LIMIT $1 OFFSET $2', [
      limit,
      offset
    ])

    const totalResult = await db.select<{ count: number }[]>(
      'SELECT COUNT(*) as count FROM game'
    )

    return {
      data,
      total: totalResult[0].count
    }
  } catch (error) {
    console.error('Error getting games:', error)
    throw error
  }
}

// PHASE (Versión completa con validación)
export async function getPhases(page?: number, limit?: number): Promise<Phase[]> {
  try {
    // Validación de parámetros
    if (page && limit) {
      if (page < 1 || limit < 1) {
        throw new Error('Los parámetros de paginación deben ser números positivos')
      }
    }

    let query = 'SELECT * FROM phase'
    const params: unknown[] = []

    if (page && limit) {
      query += ' LIMIT $1 OFFSET $2'
      const offset = (page - 1) * limit
      params.push(limit, offset)
    }

    return db.select<Phase[]>(query, params)
  } catch (error) {
    console.error('Error getting phases:', error)
    throw error
  }
}
