// TODO: db queries functions

import Database from '@tauri-apps/plugin-sql'

// Import all the tables from models/db.ts
import { Bracket, Event, Game, Match, Phase, Player, Round, Standing, Stat, Team, Tournament } from '../models/db';

// Verifies if the database is connected
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

// INSERT into Table Tournament
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

// CONSULTA PARA OBTENER ROUND POR PHASE
export async function getRoundByPhase(phaseId: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const rounds = await db.select<Round[]>(`SELECT 
    r.id, r.number, r.bo, r.startAt, r.bracket
    FROM round r 
    JOIN bracket b ON r.bracket = b.id 
    WHERE b.phase = $1`, [phaseId]);
    console.log('Rounds: ', rounds);
    return rounds;
    } catch (error) {
      console.error('Error getting rounds:', error);
      throw error;
    }
  }
  
// CONSULTA PARA MODIFICAR match.number
export async function updateMatchNumber(matchId: number, newNumber: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const result = await db.execute('UPDATE match SET number = $1 WHERE id = $2', [newNumber, matchId]);
    console.log('Match updated successfully!', result);
    return result;
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  }

// CONSULTA PARA OBTENER STANDINGS+TEAMS POR BRACKET
export async function getStandingsByBracket(bracketId: number) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const standings = await db.select<Standing[]>(`SELECT
    s.id, s.placement, s.team, t.name, t.logo_url
    FROM standing s
    JOIN team t ON s.team = t.id
    WHERE s.bracket = $1
    ORDER BY s.placement`, [bracketId]);
    console.log('Standings:', standings);
    return standings;
    } catch (error) {
      console.error('Error getting standings:', error);
      throw error;
    }
  }

// CONSULTA PARA MODIFICAR team.name
export async function updateTeamName(teamId: number, newName: string) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const result = await db.execute('UPDATE team SET name = $1 WHERE id = $2', [newName, teamId]);
    console.log('Team updated successfully!', result);
    return result;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

// CONSULTA PARA MODIFICAR team.logo_url
export async function updateTeamLogo(teamId: number, newLogo: string) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const result = await db.execute('UPDATE team SET logo_url = $1 WHERE id = $2', [newLogo, teamId]);
    console.log('Team updated successfully!', result);
    return result;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

// CONSULTA PARA CAMBIAR player.name
export async function updatePlayerName(playerId: number, newName: string) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const result = await db.execute('UPDATE player SET name = $1 WHERE id = $2', [newName, playerId]);
    console.log('Player updated successfully!', result);
    return result;
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

// CONSULTA PARA MODIFICAR match.winner
export async function updateMatchWinner(matchId: number, newWinnerId: string) {
  try {
    const db = await Database.load('sqlite:test2.db');
    const result = await db.execute('UPDATE match SET winner = $1 WHERE id = $2', [newWinnerId, matchId]);
    console.log('Match updated successfully!', result);
    return result;
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  }