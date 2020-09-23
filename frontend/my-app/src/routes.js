import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav/nav";
import Animais from "./screens/catalogoAnimais/home";
import Doacoes from "./screens/catalogoDoacoes/home";
import Faq from "./screens/Faql/fag";
import Config from "./screens/ConfigScreen/configScreen";

// import Profile from './pages/Profile/profile'
// import Incidents from './pages/newIncidents/newincidents'

const rotas = () => {
  return (
    <div className="Container-App">
      <BrowserRouter>
        <div className="app">
          {/* <Nav /> */}
          <div className="content">
              <Route path="/catalogo/Animais" component={Animais} />
              <Route path="/catalogo/Donation" component={Doacoes} />
              <Route path="/catalogo/Faq" component={Faq} />
              <Route path="/config" component={Config} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};
export default rotas;
