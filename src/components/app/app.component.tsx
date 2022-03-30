import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { useAppApolloClient } from '../../shared/apollo.client'
import { useAccessToken } from "../../hooks/useToken"
import Auth from '../../pages/auth/auth.page'
import Main from '../../pages/main/main.page'
import '../../shared/styles'
import './app.component.css'

const App: React.FC = () => {
    const client = useAppApolloClient()

    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App
