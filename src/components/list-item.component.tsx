import React from "react"

type Props = {
    host: string,
}

const ListItem: React.FC<Props> = ({ host }) => {
    return (
        <li>
            <a target="_blank" href={"https://" + host}
               className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ml-4 whitespace-nowrap">{host}</span>
            </a>
        </li>
    )
}

export default ListItem
