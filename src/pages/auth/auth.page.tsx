import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from "../../hooks/useAuthUser";
import { useAccessToken } from "../../hooks/useToken";

type FormData = {
    email: string,
    password: string,
}

const Auth: React.FC = () => {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>()
    const [login] = useAuthUser()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<FormData> = data => {
        setError("")
        setIsLoading(true)
        login({
            variables: data
        }).then(res => {
            setIsLoading(false)
            navigate("/")
        }).catch(err => {
            setIsLoading(false)
            if (err.message === "INVALID_CREDENTIALS") setError("wrong email or password")
        })
    }
    const [accessToken] = useAccessToken()

    useEffect(() => {
        if (accessToken) navigate('/')
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 px-2 md:px-0 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center font-medium text-xl">welcome</div>
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">wanna see some websites?</div>
            </div>
            <div className="max-w-md w-full mx-auto mt-4 rounded-md bg-white p-8 border border-gray-300">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">email</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1
                            placeholder:text-slate-400 placeholder:italic
                            focus:outline-none focus:border-sky-500
                            focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            placeholder="hello@example.com"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "email is required"
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "wrong email format"
                                }
                            })}
                            {...errors.email && "invalid"}
                        />
                        {errors.email && <span
                            role="alert"
                            className="text-sm font-bold text-pink-600"
                        >
                            {errors.email.message}
                        </span>}
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1
                            focus:outline-none focus:border-sky-500
                            focus:ring-1 focus:ring-sky-500"
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && <span
                            role="alert"
                            className="text-sm font-bold text-pink-600"
                        >
                            password is required
                        </span>}
                    </div>
                    {error && <div className="text-sm font-bold text-pink-600 text-center">{error}</div>}
                    <button
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                        type="submit">
                        {isLoading ?
                            <svg role="status"
                                 className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            : "let me in"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth
