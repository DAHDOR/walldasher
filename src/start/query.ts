import { graphql } from './graphql'

const GetUserID = graphql(`
  query UserID {
    currentUser {
      id
    }
  }
`)

const UserTournaments = graphql(`
  query Tournaments {
    currentUser {
      tournaments {
        nodes {
          id
          name
          slug
          admins(roles: ["admin", "manager", "bracketManager", "reporter"]) {
            id
          }
        }
      }
    }
  }
`)
