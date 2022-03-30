import React from "react"

type Props = {
    error: string
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
    return (
        <div className="w-full flex justify-center items-center flex-col">
            <h5 className="text-red-500 text-2xl">oops... something went wrong</h5>
            <h4 className="text-gray-500">try to
                <a href="/" className="ml-1 underline hover:text-blue-500">refresh the page</a></h4>
            {console.log(error)}
        </div>
    )
}

export default ErrorComponent
