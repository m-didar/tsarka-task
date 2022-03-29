import { gql, useMutation } from "@apollo/client"
import { useAccessToken } from "../hooks/useToken"
import { AuthUserInput } from "../shared/models/user.model";

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

export const useAuthUser = (): ((
    authUserInput: AuthUserInput
) => any) => {
    const [_, setAccessToken] = useAccessToken()
    const [login] = useMutation(AUTH_USER, {
        onCompleted: data => {
            setAccessToken(data.users.login.token.accessToken)
        },
    })

    return login
}
