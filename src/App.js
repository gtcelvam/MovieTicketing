import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import MovieDetail from "./components/MovieDetail"

var App = ()=>{
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/movie/:id" component={MovieDetail} exact/>
            </Switch>
        </Router>
    )
}


export default App