import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthUser } from "../../hooks/useAuthUser";

type FormData = {
    email: string,
    password: string,
}

const Auth: React.FC = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>()
    const login = useAuthUser()
    const onSubmit: SubmitHandler<FormData> = data => {
        login({
            variables: data
        })
    }

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
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "wrong email format"
                                }
                            })}
                            {...errors.email && "invalid"}
                        />
                        {errors.email?.type === "required" && "Email is required"}
                        {errors.email && <span role="alert">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1
                            focus:outline-none focus:border-sky-500
                            focus:ring-1 focus:ring-sky-500"
                            style={{ borderColor: errors.email ? "red" : "" }}
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && "password is required"}
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                        type="submit">
                        let me in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth
