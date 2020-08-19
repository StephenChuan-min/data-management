import {Route, Switch} from "react-router";
import login from "./login";
import Main from './main';
import NoMatch from "../components/no-match";
import React, {Component} from "react";

class Router extends Component{
    render() {
        return  <Switch>
            {login()}
            <Main />
            <Route component={NoMatch} />
        </Switch>
    }
}

export default Router;