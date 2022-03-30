import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAccessToken } from "../../hooks/useToken"
import { useGetSites } from "../../hooks/useGetSites"
import ListItem from "../../components/list-item.component"
import Loading from "../../components/loading.component"
import ErrorComponent from "../../components/error.component"

interface SiteData {
    id: string,
    host: string,
}

const Main: React.FC = () => {

    const navigate = useNavigate()
    const logout = useLogout()
    const [accessToken] = useAccessToken()
    const { loading, error, data } = useGetSites()

    useEffect(() => {
        if (!accessToken) navigate("/login")
    }, [])

    const renderListItem = (id: string, host: string) => {
        return <ListItem key={id} host={host} />
    }

    return (
        <div className="min-h-screen bg-gray-50 md:px-0 flex flex-col justify-center p-4">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg border shadow-md p-5">
                <div className="flex justify-center items-center mb-8 mt-5">
                    <h5 className="text-xl font-bold leading-none text-gray-900">your websites list</h5>
                </div>
                <div className="flow-root">
                    {loading ? <Loading />
                        :
                        (error ? <ErrorComponent error={error.message} />
                                :
                            <ul role="list" className="my-4 space-y-3">
                                {data.viewer.sites.map((site:SiteData) => renderListItem(site.id, site.host))}
                            </ul>
                        )
                    }
                </div>
                <div className="flex justify-between items-center mt-8">
                    <span className="text-sm text-gray-700">
                        {loading ? "..." : (!error && data.viewer.email)}
                    </span>
                    <a href="/login" onClick={logout} className="text-sm font-medium text-blue-600 hover:underline">
                        log out
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Main
