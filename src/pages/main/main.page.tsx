import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAccessToken } from "../../hooks/useToken"
import { useGetSites } from "../../hooks/useGetSites"

const Main: React.FC = () => {

    const navigate = useNavigate()
    const logout = useLogout()
    const [accessToken] = useAccessToken()
    const sitesData = useGetSites()

    useEffect(() => {
        if (!accessToken) navigate("/login")
    }, [])

    return (
        <div className="main">
            Main page
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Main
