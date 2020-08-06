import { Route } from "react-router";
import Login from "../main/login/index";
import React from "react";

function login() {
    return <Route exact path="/" component={Login} />
}

export default login;