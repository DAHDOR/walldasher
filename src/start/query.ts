import { graphql } from './graphql'

const UserID = graphql(`
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

const TournamentRounds = graphql(`
  query TournamentRounds($slug: String) {
    tournament(slug: $slug) {
      id
      name
      images(type: "profile") {
        url
      }
      events(filter: { videogameId: [14] }) {
        id
        name
        phases {
          id
          name
          phaseOrder
          phaseGroups {
            nodes {
              id
              displayIdentifier
              bracketType
              rounds {
                id
                number
                bestOf
                startAt
              }
            }
          }
        }
      }
      admins(roles: ["admin", "manager", "bracketManager", "reporter"]) {
        id
      }
    }
  }
`)

const PhaseGroupSets = graphql(`
  query PhaseGroupSets($phaseGroupId: ID!) {
    phaseGroup(id: $phaseGroupId) {
      id
      displayIdentifier
      bracketType
      sets(perPage: 500) {
        nodes {
          id
          identifier
          slots {
            slotIndex
            entrant {
              id
              name
            }
          }
          winnerId
          round
          games {
            id
            orderNum
            entrant1Score
            entrant2Score
            winnerId
          }
        }
      }
    }
  }
`)

const EventPlayers = graphql(`
  query EventPlayers($eventId: ID!) {
    event(id: $eventId) {
      name
      tournament {
        id
      }
      entrants {
        nodes {
          id
          name
          team {
            __typename
            images(type: "profile") {
              url
              type
            }
          }
          participants {
            id
            gamerTag
          }
        }
      }
    }
  }
`)

export { UserID, UserTournaments, TournamentRounds, PhaseGroupSets, EventPlayers }
