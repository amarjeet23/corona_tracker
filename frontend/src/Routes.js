import React from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import {API} from "./backend"


export default function Routes() {
    console.log(API)
    return (
       
        <div>
            
            <BrowserRouter>
            <Switch>
                <Route path = "/" exact component={Home}/>
                <Route path = "/signin" exact component={Signin}/>
                <Route path = "/signup" exact component={Signup}/>

            </Switch>
            </BrowserRouter>
        </div>
    )
}
