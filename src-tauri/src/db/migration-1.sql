--
-- File generated with SQLiteStudio v3.4.13 on Tue Mar 11 17:26:10 2025
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;

-- Table: bracket

CREATE TABLE IF NOT EXISTS bracket (
    id         INTEGER PRIMARY KEY,
    phase      INTEGER,
    identifier TEXT,
    type       TEXT    CHECK (type IN ('SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN', 'SWISS', 'CUSTOM_SCHEDULE', 'MATCHMAKING') ),
    FOREIGN KEY (
        phase
    )
    REFERENCES phase (id),
    UNIQUE (
        phase,
        identifier
    )
);


-- Table: event

CREATE TABLE IF NOT EXISTS event (
    id         INTEGER PRIMARY KEY,
    tournament INTEGER,
    name       TEXT,
    FOREIGN KEY (
        tournament
    )
    REFERENCES tournament (id) 
);


-- Table: game

CREATE TABLE IF NOT EXISTS game (
    id     INTEGER PRIMARY KEY,
    match  INTEGER,
    number INTEGER,
    score1 INTEGER CHECK (score1 >= 0),
    score2 INTEGER CHECK (score2 >= 0),
    FOREIGN KEY (
        match
    )
    REFERENCES match (id),
    UNIQUE (
        match,
        number
    ),
    CHECK (number BETWEEN 1 AND 9) 
);


-- Table: match

CREATE TABLE IF NOT EXISTS match (
    id         INTEGER PRIMARY KEY,
    title      TEXT,
    round      INTEGER,
    identifier TEXT,
    number     INTEGER,
    best_of    INTEGER CHECK (best_of IN (1, 3, 5, 7, 9) ),
    team1      INTEGER,
    team2      INTEGER,
    winner     INTEGER,
    FOREIGN KEY (
        team1
    )
    REFERENCES team (id),
    FOREIGN KEY (
        team2
    )
    REFERENCES team (id),
    FOREIGN KEY (
        winner
    )
    REFERENCES team (id),
    FOREIGN KEY (
        round
    )
    REFERENCES round (id),
    UNIQUE (
        number,
        round
    ),
    UNIQUE (
        identifier,
        round
    ),
    CHECK (winner IN (team1, team2) ) 
);


-- Table: phase

CREATE TABLE IF NOT EXISTS phase (
    id     INTEGER PRIMARY KEY,
    event  INTEGER,
    number INTEGER,
    name   TEXT,
    FOREIGN KEY (
        event
    )
    REFERENCES event (id),
    UNIQUE (
        number,
        event
    )
);


-- Table: player

CREATE TABLE IF NOT EXISTS player (
    id   INTEGER PRIMARY KEY,
    team INTEGER,
    name TEXT,
    FOREIGN KEY (
        team
    )
    REFERENCES team (id) 
);


-- Table: round

CREATE TABLE IF NOT EXISTS round (
    id       INTEGER PRIMARY KEY,
    bracket  INTEGER,
    number   INTEGER,
    best_of  INTEGER CHECK (best_of = 1 OR 
                            best_of = 3 OR 
                            best_of = 5 OR 
                            best_of = 7 OR 
                            best_of = 9),
    start_at INTEGER,
    FOREIGN KEY (
        bracket
    )
    REFERENCES bracket (id),
    UNIQUE (
        number,
        bracket
    )
);


-- Table: standing

CREATE TABLE IF NOT EXISTS standing (
    id        INTEGER PRIMARY KEY,
    bracket   INTEGER,
    placement INTEGER,
    team      INTEGER,
    FOREIGN KEY (
        bracket
    )
    REFERENCES bracket (id),
    FOREIGN KEY (
        team
    )
    REFERENCES team (id),
    UNIQUE (
        bracket,
        placement
    )
);


-- Table: stat

CREATE TABLE IF NOT EXISTS stat (
    id      INTEGER PRIMARY KEY,
    game    INTEGER,
    player  INTEGER,
    score   INTEGER CHECK (score >= 0),
    goals   INTEGER CHECK (goals >= 0),
    assists INTEGER CHECK (assists >= 0),
    saves   INTEGER CHECK (saves >= 0),
    shots   INTEGER CHECK (shots >= 0),
    FOREIGN KEY (
        game
    )
    REFERENCES game (id),
    FOREIGN KEY (
        player
    )
    REFERENCES player (id),
    UNIQUE (
        game,
        player
    )
);


-- Table: team

CREATE TABLE IF NOT EXISTS team (
    id         INTEGER PRIMARY KEY,
    tournament INTEGER,
    name       TEXT,
    logo   BLOB,
    FOREIGN KEY (
        tournament
    )
    REFERENCES tournament (id) 
);


-- Table: tournament

CREATE TABLE IF NOT EXISTS tournament (
    id       INTEGER PRIMARY KEY,
    name     TEXT,
    logo BLOB
);

PRAGMA foreign_keys = on;
