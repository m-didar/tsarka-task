import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://tsarka-frontend-test.herokuapp.com/frontend/task/graphql",
    cache: new InMemoryCache()
})

export default client
