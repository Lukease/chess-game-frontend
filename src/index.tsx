import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {UserService} from './backend-service-connector/service'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {UserSettings} from './UI/settings/UserSettings'
import {LoginNavigation} from './UI/login/LoginNavigation'
import {Context} from './UI/context/Context'
import {Arena} from './UI/board/Arena'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const userService = new UserService()

root.render(
    <Router>
        <Routes>
            <Route path={'/'}
                   element={
                       <Context.Provider value={userService}>
                           <LoginNavigation/>
                       </Context.Provider>
                   }
            />
            <Route
                path='/game'
                element={
                    <Arena/>
                }/>
            <Route path={'/settings'}
                   element={
                       <Context.Provider value={userService}>
                           <UserSettings/>
                       </Context.Provider>
                   }
            />
        </Routes>
    </Router>
)

reportWebVitals()
