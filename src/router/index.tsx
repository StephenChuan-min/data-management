import {Route, Switch} from "react-router";
import login from "./login";
import Main from './main';
import React from "react";
import Login from "../main/login";

function Router(){
    return <Switch>
        {login()}
        <Route path="/main" component={Main} />
        <Route component={Login} />
    </Switch>
}

export default Router;