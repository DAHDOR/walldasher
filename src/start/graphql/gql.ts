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
};
const documents: Documents = {
    "\n  query UserID {\n    currentUser {\n      id\n    }\n  }\n": types.UserIdDocument,
    "\n  query Tournaments {\n    currentUser {\n      tournaments {\n        nodes {\n          id\n          name\n          slug\n          admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.TournamentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserID {\n    currentUser {\n      id\n    }\n  }\n"): typeof import('./graphql').UserIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tournaments {\n    currentUser {\n      tournaments {\n        nodes {\n          id\n          name\n          slug\n          admins(roles: [\"admin\", \"manager\", \"bracketManager\", \"reporter\"]) {\n            id\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TournamentsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
