import React, { useState, useEffect } from 'react'
import AuthForm from '../../components/auth-form.component'
import { useNavigate } from 'react-router-dom'
import { useAccessToken } from "../../hooks/useToken"


const Auth: React.FC = () => {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [accessToken] = useAccessToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) navigate('/')
    }, [])

    const formProps = {
        isLoading,
        setIsLoading,
        formError: error,
        setFormError: setError,
    }

    return (
        <div className="min-h-screen bg-gray-50 px-2 md:px-0 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center font-medium text-xl">welcome</div>
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">wanna see some websites?</div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 rounded-md bg-white p-8 border border-gray-300">
                <AuthForm {...formProps} />
            </div>
        </div>
    )
}

export default Auth
