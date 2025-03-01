// TODO: db queries functions

import Database from '@tauri-apps/plugin-sql'

// Verificamos que la DB se conecte correctamente
export async function initDatabase() {
  try {
    const db = await Database.load('sqlite:test2.db')
    console.log('Database connected successfully!')
    return db
  } catch (error) {
    console.error('Error connecting to the database:', error)
    throw error
  }
}

// Tables

// Table Bracket
interface Bracket {
  id?: number;
  phase: number;
  identifier: string;
  type: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS' | 'CUSSTOM_SCHEDULE' | 'MATCHMAKING';
}

// Table Event
interface Event {
  id?: number;
  tournament: number;
  name: string;
}

// Table Game
interface Game {
  id?: number
  match: number
  number: number
  score1: number
  score2: number
}

// Table Match
interface Match {
  id?: number;
  round: number;
  identifier: string;
  number: number;
  best_of: 1 | 3 | 5 | 7 | 9;
  team1?: number;
  team2?: number;
  winner?: number;
}

// Table phase
interface Phase {
  id?: number;
  event: number;
  number: number;
  name: string;
}

// Table Player
interface Player {
  id?: number;
  team?: number;
  name: string;
}

// Table Round
interface Round {
  id?: number;
  bracket: number;
  number: number;
  best_of: 1 | 3 | 5 | 7 | 9;
  start_at: number;
}

// Table standing
interface Standing {
  id?: number;
  bracket: number;
  placement: number;
  team: number;
}

// Table Stat
interface Stat {
  id: number
  score: number
  game: number
  goals: number
  assists: number
  saves: number
  shots: number
  player: number
}

// Table Team
interface Team {
  id?: number;
  name: string;
  logo_url?: string;
}

// Table Tournament
interface Tournament{
    id?: number;
    name: string;
    logo_url?: string;
}

// INSERTS
// INSERT into Table Bracket
export async function insertBracket(bracket: Bracket) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, phase, identifier, type) VALUES ($1, $2, $3, $4)',
        [bracket.id, bracket.phase, bracket.identifier, bracket.type]
      );
      console.log('Bracket inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting bracket:', error);
      throw error;
    }
  }

  // INSERT into Table Event
export async function insertEvent(event: Event) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, tournament, name) VALUES ($1, $2, $3)',
        [event.id, event.tournament, event.name]
      );
      console.log('Event inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting event:', error);
      throw error;
    }
  }

// INSERT into Table Game
export async function insertGame(game: Game) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, match, number, score1, score2) VALUES ($1, $2, $3, $4, $5)',
        [game.id, game.match, game.number, game.score1, game.score2]
      );
      console.log('Game inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting game:', error);
      throw error;
    }
  }

//INSERT a Table Match
export async function insertMatch(match: Match) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, round, identifier, number, best_of, team1, team2, winner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [match.id, match.round, match.identifier, match.number, match.best_of, match.team1, match.team2, match.winner]
      );
      console.log('Match inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting match:', error);
      throw error;
    }
  }

  // INSERT into Table Phase
export async function insertPhase(phase: Phase) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, event, number, name) VALUES ($1, $2, $3, $4)',
        [phase.id, phase.event, phase.number, phase.name]
      );
      console.log('Event inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting event:', error);
      throw error;
    }
  }

// INSERT a Table Player
export async function insertPlayer(player: Player) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, team, name) VALUES ($1, $2, $3)',
        [player.id, player.team, player.name]
      );
      console.log('Player inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting player:', error);
      throw error;
    }
  }

  // INSERT into Table Round
export async function insertRound(round: Round) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, bracket, number, best_of, start_at) VALUES ($1, $2, $3, $4, $5)',
        [round.id, round.bracket, round.number, round.best_of, round.start_at]
      );
      console.log('Round inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting round:', error);
      throw error;
    }
  }

  // INSERT into Table Standing
export async function insertStanding(standing: Standing) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, bracket, number, team) VALUES ($1, $2, $3, $4)',
        [standing.id, standing.bracket, standing.placement, standing.team]
      );
      console.log('Standing inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting standing:', error);
      throw error;
    }
  }

// INSERT into Table Stat
export async function insertStat(stat: Stat) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, score, game, goals, assists, saves, shots, player) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [stat.id, stat.score, stat.game, stat.goals, stat.assists, stat.saves, stat.shots, stat.player]
      );
      console.log('Stat inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting stat:', error);
      throw error;
    }
  }

// INSERT a Table Team
export async function insertTeam(team: Team) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, team, logo_url) VALUES ($1, $2, $3)',
        [team.id, team.name, team.logo_url]
      );
      console.log('Team inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting team:', error);
      throw error;
    }
  }

// INSERT a Table Tournament
export async function insertTournament(tournament: Tournament) {
  try{
      const db = await Database.load('sqlite:test2.db');
      const result = await db.execute(
        'INSERT INTO stats (id, name, logo_url) VALUES ($1, $2, $3)',
        [tournament.id, tournament.name, tournament.logo_url]
      );
      console.log('Tournament inserted successfully!', result);
      return result;
    } catch (error) {
      console.error('Error inserting tournament:', error);
      throw error;
    }
  }

// CONSULTAS 
// CONSULTA PARA OBTENER TODOS LOS TORNEOS
export async function getTournaments() {
  try {
    const db = await Database.load('sqlite:test2.db');
    const tournaments = await db.select<Tournament[]>('SELECT * FROM tournament');
    console.log('Tournaments:', tournaments);
    return tournaments;
  } catch (error) {
    console.error('Error getting tournaments:', error);
    throw error;
  }
}

// CONSULTA PARA OBTENER TORNEOS POR ID
export async function getTournamentById(id: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const tournament = await db.select<Tournament[]>('SELECT * FROM tournament WHERE id = $1', [id]);
    console.log('Tournament:', tournament);
    return tournament;
  } catch (error) {
    console.error('Error getting tournament:', error);
    throw error;
  }
}

// CONSULTA PARA OBTENER LOS EVENTOS POR TORNEO
export async function getEventsByTournament(tournamentId: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const events = await db.select<Event[]>('SELECT * FROM event WHERE tournament_id = $1', [tournamentId]);
    console.log('Events:', events);
    return events;
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

// CONSULTA PARA OBTENER PHASES POR EVENTO
export async function getPhasesByEvent(eventId: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const phases = await db.select<Phase[]>('SELECT * FROM phase WHERE event_id = $1', [eventId]);
    console.log('Phases:', phases);
    return phases;
    } catch (error) {
      console.error('Error getting phases:', error);
      throw error;
    }
    }

// CONSULTA PARA OBTENER BRACKETS POR PHASE
export async function getBracketsByPhase(phaseId: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const brackets = await db.select<Bracket[]>('SELECT * FROM bracket WHERE phase_id = $1', [phaseId]);
    console.log('Brackets:', brackets);
    return brackets;
    } catch (error) {
      console.error('Error getting brackets:', error);
      throw error;
      }
    }
