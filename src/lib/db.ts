import TournamentState from '@models/TournamentState'
import Database from '@tauri-apps/plugin-sql'
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
import { uint8ArrayStringTouint8Array as uint8ArrayStringToUint8Array } from './images'

class DB {
  private db: Database

  constructor(db: Database) {
    this.db = db
  }

  insertTournamentState = async (tournamentState: TournamentState) => {
    for (const team of tournamentState.teams) {
      await this.insertTeam(team)
      for (const player of team.players) {
        await this.insertPlayer(player)
      }
    }
    for (const event of tournamentState.events) {
      await this.insertEvent(event)
      for (const phase of event.phases) {
        await this.insertPhase(phase)
        for (const bracket of phase.brackets) {
          await this.insertBracket(bracket)
          for (const round of bracket.rounds) {
            await this.insertRound(round)
            for (const standing of bracket.standings) {
              await this.insertStanding(standing)
            }
          }
        }
      }
    }
  }

  insertBracket = async (bracket: Bracket) =>
    await this.db.execute(
      'INSERT INTO stats (id, phase, identifier, type) VALUES ($1, $2, $3, $4)',
      [bracket.id, bracket.phase, bracket.identifier, bracket.type]
    )

  insertEvent = async (event: Event) =>
    await this.db.execute(
      'INSERT INTO event (id, tournament, name) VALUES ($1, $2, $3)',
      [event.id, event.tournament, event.name]
    )

  insertGame = async (game: Game) =>
    await this.db.execute(
      'INSERT INTO game (id, match, number, score1, score2) VALUES ($1, $2, $3, $4, $5)',
      [game.id, game.match, game.number, game.score1, game.score2]
    )

  insertMatch = async (match: Match) =>
    await this.db.execute(
      'INSERT INTO match (id, title, round, identifier, number, best_of, team1, team2, winner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        match.id,
        match.title,
        match.round,
        match.identifier,
        match.number,
        match.best_of,
        match.team1,
        match.team2,
        match.winner
      ]
    )

  insertPhase = async (phase: Phase) =>
    await this.db.execute(
      'INSERT INTO phase (id, event, number, name) VALUES ($1, $2, $3, $4)',
      [phase.id, phase.event, phase.number, phase.name]
    )

  insertPlayer = async (player: Player) =>
    await this.db.execute('INSERT INTO player (id, team, name) VALUES ($1, $2, $3)', [
      player.id,
      player.team,
      player.name
    ])

  insertRound = async (round: Round) =>
    await this.db.execute(
      'INSERT INTO round (id, bracket, number, best_of, start_at) VALUES ($1, $2, $3, $4, $5)',
      [round.id, round.bracket, round.number, round.best_of, round.start_at]
    )

  insertStanding = async (standing: Standing) =>
    await this.db.execute(
      'INSERT INTO standing (id, bracket, placement, team) VALUES ($1, $2, $3, $4)',
      [standing.id, standing.bracket, standing.placement, standing.team]
    )

  insertStat = async (stat: Stat) =>
    await this.db.execute(
      'INSERT INTO stat (id, game, player, score, goals, assists, saves, shots) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        stat.id,
        stat.game,
        stat.player,
        stat.score,
        stat.goals,
        stat.assists,
        stat.saves,
        stat.shots
      ]
    )

  insertTeam = async (team: Team) =>
    await this.db.execute(
      'INSERT INTO team (id, tournament, name, logo) VALUES ($1, $2, $3, $4)',
      [team.id, team.tournament, team.name, team.logo]
    )

  insertTournament = async (tournament: Tournament) =>
    await this.db.execute('INSERT INTO tournament (id, name, logo) VALUES ($1, $2, $3)', [
      tournament.id,
      tournament.name,
      tournament.logo
    ])

  // UPDATE functions
  updateBracket = async (bracket: Bracket) =>
    await this.db.execute(
      'UPDATE bracket SET phase = $1, identifier = $2, type = $3 WHERE id = $4',
      [bracket.phase, bracket.identifier, bracket.type, bracket.id]
    )

  updateEvent = async (event: Event) =>
    await this.db.execute('UPDATE event SET tournament = $1, name = $2 WHERE id = $3', [
      event.tournament,
      event.name,
      event.id
    ])

  updateGame = async (game: Game) =>
    await this.db.execute(
      'UPDATE game SET match = $1, number = $2, score1 = $3, score2 = $4 WHERE id = $5',
      [game.match, game.number, game.score1, game.score2, game.id]
    )

  updateMatch = async (match: Match) =>
    await this.db.execute(
      'UPDATE match SET title = $1, round = $2, identifier = $3, number = $4, best_of = $5, team1 = $6, team2 = $7, winner = $8 WHERE id = $9',
      [
        match.title,
        match.round,
        match.identifier,
        match.number,
        match.best_of,
        match.team1,
        match.team2,
        match.winner,
        match.id
      ]
    )

  updatePhase = async (phase: Phase) =>
    await this.db.execute(
      'UPDATE phase SET event = $1, number = $2, name = $3 WHERE id = $4',
      [phase.event, phase.number, phase.name, phase.id]
    )

  updatePlayer = async (player: Player) =>
    await this.db.execute('UPDATE player SET team = $1, name = $2 WHERE id = $3', [
      player.team,
      player.name,
      player.id
    ])

  updateRound = async (round: Round) =>
    await this.db.execute(
      'UPDATE round SET bracket = $1, number = $2, best_of = $3, start_at = $4 WHERE id = $5',
      [round.bracket, round.number, round.best_of, round.start_at, round.id]
    )

  updateStanding = async (standing: Standing) =>
    await this.db.execute(
      'UPDATE standing SET bracket = $1, placement = $2, team = $3 WHERE id = $4',
      [standing.bracket, standing.placement, standing.team, standing.id]
    )

  updateStat = async (stat: Stat) =>
    await this.db.execute(
      'UPDATE stat SET game = $1, player = $2, score = $3, goals = $4, assists = $5, saves = $6, shots = $7 WHERE id = $8',
      [
        stat.game,
        stat.player,
        stat.score,
        stat.goals,
        stat.assists,
        stat.saves,
        stat.shots,
        stat.id
      ]
    )

  updateTeam = async (team: Team) =>
    await this.db.execute(
      'UPDATE team SET tournament = $1, name = $2, logo = $3 WHERE id = $4',
      [team.tournament, team.name, team.logo, team.id]
    )

  updateTournament = async (tournament: Tournament) =>
    await this.db.execute('UPDATE tournament SET name = $1, logo = $2 WHERE id = $3', [
      tournament.name,
      tournament.logo,
      tournament.id
    ])

  // SELECT functions

  selectTournaments = async (): Promise<Tournament[]> => {
    try {
      return await this.db.select<Tournament[]>('SELECT * FROM tournament')
    } catch (error) {
      console.error('Error selecting tournaments:', error)
      throw error
    }
  }

  selectTournamentById = async (id: number): Promise<Tournament | undefined> => {
    try {
      const results = await this.db.select<Tournament[]>(
        'SELECT * FROM tournament WHERE id = $1',
        [id]
      )
      return results[0]
    } catch (error) {
      console.error('Error selecting tournament by id:', error)
      throw error
    }
  }

  selectEvents = async (): Promise<Event[]> => {
    try {
      return await this.db.select<Event[]>('SELECT * FROM event')
    } catch (error) {
      console.error('Error selecting events:', error)
      throw error
    }
  }

  selectEventById = async (id: number): Promise<Event | undefined> => {
    try {
      const results = await this.db.select<Event[]>('SELECT * FROM event WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting event by id:', error)
      throw error
    }
  }

  selectGames = async (): Promise<Game[]> => {
    try {
      return await this.db.select<Game[]>('SELECT * FROM game')
    } catch (error) {
      console.error('Error selecting games:', error)
      throw error
    }
  }

  selectGameById = async (id: number): Promise<Game | undefined> => {
    try {
      const results = await this.db.select<Game[]>('SELECT * FROM game WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting game by id:', error)
      throw error
    }
  }

  selectMatches = async (): Promise<Match[]> => {
    try {
      return await this.db.select<Match[]>('SELECT * FROM match')
    } catch (error) {
      console.error('Error selecting matches:', error)
      throw error
    }
  }

  selectMatchById = async (id: number): Promise<Match | undefined> => {
    try {
      const results = await this.db.select<Match[]>('SELECT * FROM match WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting match by id:', error)
      throw error
    }
  }

  selectPhases = async (): Promise<Phase[]> => {
    try {
      return await this.db.select<Phase[]>('SELECT * FROM phase')
    } catch (error) {
      console.error('Error selecting phases:', error)
      throw error
    }
  }

  selectPhaseById = async (id: number): Promise<Phase | undefined> => {
    try {
      const results = await this.db.select<Phase[]>('SELECT * FROM phase WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting phase by id:', error)
      throw error
    }
  }

  selectPlayers = async (): Promise<Player[]> => {
    try {
      return await this.db.select<Player[]>('SELECT * FROM player')
    } catch (error) {
      console.error('Error selecting players:', error)
      throw error
    }
  }

  selectPlayerById = async (id: number): Promise<Player | undefined> => {
    try {
      const results = await this.db.select<Player[]>(
        'SELECT * FROM player WHERE id = $1',
        [id]
      )
      return results[0]
    } catch (error) {
      console.error('Error selecting player by id:', error)
      throw error
    }
  }

  selectRounds = async (): Promise<Round[]> => {
    try {
      return await this.db.select<Round[]>('SELECT * FROM round')
    } catch (error) {
      console.error('Error selecting rounds:', error)
      throw error
    }
  }

  selectRoundById = async (id: number): Promise<Round | undefined> => {
    try {
      const results = await this.db.select<Round[]>('SELECT * FROM round WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting round by id:', error)
      throw error
    }
  }

  selectStandings = async (): Promise<Standing[]> => {
    try {
      return await this.db.select<Standing[]>('SELECT * FROM standing')
    } catch (error) {
      console.error('Error selecting standings:', error)
      throw error
    }
  }

  selectStandingById = async (id: number): Promise<Standing | undefined> => {
    try {
      const results = await this.db.select<Standing[]>(
        'SELECT * FROM standing WHERE id = $1',
        [id]
      )
      return results[0]
    } catch (error) {
      console.error('Error selecting standing by id:', error)
      throw error
    }
  }

  selectStats = async (): Promise<Stat[]> => {
    try {
      return await this.db.select<Stat[]>('SELECT * FROM stat')
    } catch (error) {
      console.error('Error selecting stats:', error)
      throw error
    }
  }

  selectStatById = async (id: number): Promise<Stat | undefined> => {
    try {
      const results = await this.db.select<Stat[]>('SELECT * FROM stat WHERE id = $1', [
        id
      ])
      return results[0]
    } catch (error) {
      console.error('Error selecting stat by id:', error)
      throw error
    }
  }

  selectTeams = async (): Promise<Team[]> => {
    try {
      const teams = await this.db.select<Team[]>('SELECT * FROM team')
      for (const team of teams) {
        team.logo = uint8ArrayStringToUint8Array(team.logo as unknown as string)
      }
      return teams
    } catch (error) {
      console.error('Error selecting teams:', error)
      throw error
    }
  }

  selectTeamById = async (id: number): Promise<Team | undefined> => {
    try {
      const results = await this.db.select<Team[]>('SELECT * FROM team WHERE id = $1', [
        id
      ])
      const team = results[0]
      team.logo = uint8ArrayStringToUint8Array(team.logo as unknown as string)
      return team
    } catch (error) {
      console.error('Error selecting team by id:', error)
      throw error
    }
  }
}

export default DB
