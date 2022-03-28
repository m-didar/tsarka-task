import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from '../../pages/auth/auth.page'
import Main from '../../pages/main/main.page'
import '../../common/styles'
import './app.component.css'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    )
}

export default App
