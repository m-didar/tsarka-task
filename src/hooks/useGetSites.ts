import { gql, useQuery } from "@apollo/client"

const GET_SITES = gql`
    query GetSites {
        viewer {
            id
            email
            sites {
                id
                host
            }
        }
    }
`

export const useGetSites = () => useQuery(GET_SITES)
