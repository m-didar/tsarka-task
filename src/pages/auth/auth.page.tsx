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
        <div className="auth">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input {...register("email", {
                    required: true,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })} />
                {errors.email?.type === "required" && "Email is required"}
                {errors.email && <span role="alert">{errors.email.message}</span>}
                <label>Password</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password?.type === "required" && "Password is required"}
                <input type="submit" />
            </form>
        </div>
    )
}

export default Auth
