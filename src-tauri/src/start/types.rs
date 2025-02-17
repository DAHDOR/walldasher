use graphql_client::GraphQLQuery;

pub type Timestamp = i64;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
pub struct UserID;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
pub struct Tournaments;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
pub struct Tournament;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
pub struct PhaseGroupSets;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/graphql/schema.graphql",
    query_path = "src/graphql/queries.graphql",
    response_derives = "Debug"
)]
pub struct EventPlayers;
