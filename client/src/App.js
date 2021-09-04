import React from 'react';
import Home from './views/Home';
import Login from './views/Login';
import Operations from './views/Operations'

import { Route } from 'react-router-dom';

import './App.css';

function App() {
    return ( 
        <div className="App">
            <Route exact path="/" component={ Home } />
            <Route exact path="/operations" component={ Operations } />
            <Route exact path="/login" component={ Login } />
        </div>
    )
}

export default App