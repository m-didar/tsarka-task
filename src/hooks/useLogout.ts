import { useApolloClient } from "@apollo/client"
import { useAccessToken } from '../hooks/useToken'

export const useLogout = () => {
    const [,, removeAccessToken] = useAccessToken()
    const apolloClient = useApolloClient()

    const logout = async() => {
        await apolloClient.clearStore()
        removeAccessToken()
    }

    return logout
}
