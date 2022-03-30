import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.component'
import 'dotenv/config'

require('dotenv').config()

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
