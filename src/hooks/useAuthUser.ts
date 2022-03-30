import { gql, useMutation } from "@apollo/client"
import { useAccessToken } from "../hooks/useToken"

const AUTH_USER = gql`
    mutation AuthUser($email: String!, $password: String!) {
        users {
            login (input: { email: $email, password: $password }) {
                token {
                    accessToken,
                    refreshToken
                }
            }
        }
    }
`

export const useAuthUser = () => {
    const [_, setAccessToken] = useAccessToken()
    return useMutation(AUTH_USER, {
        onCompleted: data => {
            setAccessToken(data.users.login.token.accessToken)
        },
    })
}
