import { useCookies } from "react-cookie"

const accessToken: string = process.env.REACT_APP_ACCESS_TOKEN_NAME || ""

export const useAccessToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([accessToken])

    const setAccessToken = (authToken: string) => {
        setCookie(accessToken, authToken)
    }

    const removeAccessToken = () => {
        removeCookie(accessToken)
    }

    return [cookies[accessToken], setAccessToken, removeAccessToken]
}
