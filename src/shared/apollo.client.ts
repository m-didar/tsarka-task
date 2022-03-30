import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { useAccessToken } from "../hooks/useToken"

const getHeaders = (token: string) => {
    const headers: HeadersInit = {}
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
}

const createLink = (token: string) => {
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_API, // uri of endpoint
    })

    const authLink = new ApolloLink((operation, forward) => {
        if (token) {
            operation.setContext(({headers = {}}) => ({
                headers: {
                    ...headers,
                    ...getHeaders(token),
                }
            }))
        }
        return forward(operation)
    }) // acts as middleware

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            })
        }
        if (networkError) {
            console.log(`[Network Error]: ${networkError}`)
        }
    })

    return from([
        errorLink,
        authLink,
        httpLink,
    ])
}

export const useAppApolloClient = () => {
    const [token] = useAccessToken()
    return new ApolloClient({
        link: createLink(token),
        cache: new InMemoryCache(),
    })
}
