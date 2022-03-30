import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuthUser } from "../hooks/useAuthUser"
import Loading from "./loading.component"

type FormData = {
    email: string,
    password: string,
}

type Props = {
    isLoading: boolean,
    setIsLoading: (a: boolean) => void,
    formError: string,
    setFormError: (a: string) => void,
}

const AuthForm: React.FC<Props> = ({ isLoading, setIsLoading, formError, setFormError }) => {

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>()
    const [login] = useAuthUser()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<FormData> = data => {
        setFormError("")
        setIsLoading(true)
        login({
            variables: data
        }).then(res => {
            setIsLoading(false)
            navigate("/")
        }).catch(err => {
            setIsLoading(false)
            if (err.message === "INVALID_CREDENTIALS") setFormError("wrong email or password")
        })
    }

    return (
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
            {formError && <div className="text-sm font-bold text-pink-600 text-center">{formError}</div>}
            <button
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                type="submit">
                {isLoading ? <Loading /> : "let me in"}
            </button>
        </form>
    )
}

export default AuthForm
