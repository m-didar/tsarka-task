import { useNavigate } from 'react-router-dom'
import { useApolloClient } from "@apollo/client"
import { useAccessToken } from '../hooks/useToken'

export const useLogout = () => {
    const [,, removeAccessToken] = useAccessToken()
    const apolloClient = useApolloClient()
    const navigate = useNavigate()

    const logout = async() => {
        await apolloClient.clearStore()
        removeAccessToken()
        navigate('/login')
    }

    return logout
}
