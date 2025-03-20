/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query UserID {\n    currentUser {\n      id\n    }\n  }\n": typeof types.UserIdDocument,
    "\n  query Tournaments {\n    currentUser {\n      tournaments {\n        nodes {\n          id\n          name\n          slug\n          admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n            id\n          }\n        }\n      }\n    }\n  }\n": typeof types.TournamentsDocument,
    "\n  query TournamentRounds($slug: String) {\n    tournament(slug: $slug) {\n      id\n      name\n      images(type: \"profile\") {\n        url\n      }\n      events(filter: { videogameId: [14] }) {\n        id\n        name\n        phases {\n          id\n          name\n          phaseOrder\n          phaseGroups {\n            nodes {\n              id\n              displayIdentifier\n              bracketType\n              rounds {\n                id\n                number\n                bestOf\n                startAt\n              }\n            }\n          }\n        }\n      }\n      admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n        id\n      }\n    }\n  }\n": typeof types.TournamentRoundsDocument,
    "\n  query PhaseGroupSets($phaseGroupId: ID!) {\n    phaseGroup(id: $phaseGroupId) {\n      id\n      displayIdentifier\n      bracketType\n      sets(perPage: 500) {\n        nodes {\n          id\n          identifier\n          slots {\n            slotIndex\n            entrant {\n              id\n              name\n            }\n          }\n          winnerId\n          round\n          games {\n            id\n            orderNum\n            entrant1Score\n            entrant2Score\n            winnerId\n          }\n        }\n      }\n    }\n  }\n": typeof types.PhaseGroupSetsDocument,
    "\n  query EventPlayers($eventId: ID!) {\n    event(id: $eventId) {\n      name\n      tournament {\n        id\n      }\n      entrants {\n        nodes {\n          id\n          name\n          team {\n            __typename\n            images(type: \"profile\") {\n              url\n              type\n            }\n          }\n          participants {\n            id\n            gamerTag\n          }\n        }\n      }\n    }\n  }\n": typeof types.EventPlayersDocument,
};
const documents: Documents = {
    "\n  query UserID {\n    currentUser {\n      id\n    }\n  }\n": types.UserIdDocument,
    "\n  query Tournaments {\n    currentUser {\n      tournaments {\n        nodes {\n          id\n          name\n          slug\n          admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.TournamentsDocument,
    "\n  query TournamentRounds($slug: String) {\n    tournament(slug: $slug) {\n      id\n      name\n      images(type: \"profile\") {\n        url\n      }\n      events(filter: { videogameId: [14] }) {\n        id\n        name\n        phases {\n          id\n          name\n          phaseOrder\n          phaseGroups {\n            nodes {\n              id\n              displayIdentifier\n              bracketType\n              rounds {\n                id\n                number\n                bestOf\n                startAt\n              }\n            }\n          }\n        }\n      }\n      admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n        id\n      }\n    }\n  }\n": types.TournamentRoundsDocument,
    "\n  query PhaseGroupSets($phaseGroupId: ID!) {\n    phaseGroup(id: $phaseGroupId) {\n      id\n      displayIdentifier\n      bracketType\n      sets(perPage: 500) {\n        nodes {\n          id\n          identifier\n          slots {\n            slotIndex\n            entrant {\n              id\n              name\n            }\n          }\n          winnerId\n          round\n          games {\n            id\n            orderNum\n            entrant1Score\n            entrant2Score\n            winnerId\n          }\n        }\n      }\n    }\n  }\n": types.PhaseGroupSetsDocument,
    "\n  query EventPlayers($eventId: ID!) {\n    event(id: $eventId) {\n      name\n      tournament {\n        id\n      }\n      entrants {\n        nodes {\n          id\n          name\n          team {\n            __typename\n            images(type: \"profile\") {\n              url\n              type\n            }\n          }\n          participants {\n            id\n            gamerTag\n          }\n        }\n      }\n    }\n  }\n": types.EventPlayersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserID {\n    currentUser {\n      id\n    }\n  }\n"): typeof import('./graphql').UserIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tournaments {\n    currentUser {\n      tournaments {\n        nodes {\n          id\n          name\n          slug\n          admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n            id\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TournamentsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TournamentRounds($slug: String) {\n    tournament(slug: $slug) {\n      id\n      name\n      images(type: \"profile\") {\n        url\n      }\n      events(filter: { videogameId: [14] }) {\n        id\n        name\n        phases {\n          id\n          name\n          phaseOrder\n          phaseGroups {\n            nodes {\n              id\n              displayIdentifier\n              bracketType\n              rounds {\n                id\n                number\n                bestOf\n                startAt\n              }\n            }\n          }\n        }\n      }\n      admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').TournamentRoundsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PhaseGroupSets($phaseGroupId: ID!) {\n    phaseGroup(id: $phaseGroupId) {\n      id\n      displayIdentifier\n      bracketType\n      sets(perPage: 500) {\n        nodes {\n          id\n          identifier\n          slots {\n            slotIndex\n            entrant {\n              id\n              name\n            }\n          }\n          winnerId\n          round\n          games {\n            id\n            orderNum\n            entrant1Score\n            entrant2Score\n            winnerId\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').PhaseGroupSetsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EventPlayers($eventId: ID!) {\n    event(id: $eventId) {\n      name\n      tournament {\n        id\n      }\n      entrants {\n        nodes {\n          id\n          name\n          team {\n            __typename\n            images(type: \"profile\") {\n              url\n              type\n            }\n          }\n          participants {\n            id\n            gamerTag\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').EventPlayersDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
