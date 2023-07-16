import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Users from "./pages/users"
import Dashboard from "./pages/Dashboard";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/statistics">
                <Dashboard/>
            </Route>
            <Route exact path="/users">
                <Users/>
            </Route>
            <Route exact path="/diagrams">
                <h1>Diagrams Page</h1>
            </Route>
        </Switch>
    );
};

export default Routes;