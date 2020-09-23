import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./screens/register/register";
import Login from "./screens/login/login";

import Animais from "./screens/catalogoAnimais/home";
import Doacoes from "./screens/catalogoDoacoes/home";
import Faq from "./screens/Faql/fag";
import Config from "./screens/ConfigScreen/configScreen";
import Nav from "./components/Nav/nav";
import Reset from "./screens/resetPassword/reset";
import Forgot from "./screens/forgotPassword/Fortgot";

import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} />
        <Route path="/reset/:id" component={Reset} />
        <Route path="/forgot" component={Forgot} />
        <>
          <div className="Container-App">
            <div className="app">
              <Nav />
              <div className="content">
                <Route path="/catalogo/Animais" component={Animais} />
                <Route path="/catalogo/Donation" component={Doacoes} />
                <Route path="/catalogo/Faq" component={Faq} />
                <Route path="/config" component={Config} />
              </div>
            </div>
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
