import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import "./App.css";

import Home from "./screens/home/home";
import Adocao from "./screens/Adocao/Adocao";
import AdocaoFormPage from './screens/ConcludeAdoption/index'
import Faq from "./screens/FAQ/Faq";
import Lar from "./screens/Lar/Lar";
import Doacao from "./screens/Doacao/doacao";
import Animais from "./screens/AnimaisUFC/animais";
import DetailsAnimal from './screens/AnimalDetail/animalDetail'


function App() {
  return (
    <BrowserRouter>
    
      <div className="container">
        <div className="header">
          <header className="page_header">
            <div className="logo">
              <Link to="/" id="logo_AU">
                <img src={require("./images/logo_5.svg")} alt="Logo" />
                <img
                  src={require("./images/image_17.svg")}
                  alt="Animais Universitários"
                  id="nome"
                />
              </Link>
            </div>

            <div className="sections">
              <NavLink
                to="/"
                activeClassName="actual-page"
                exact={true}
                onClick={() => {
                  document.documentElement.scrollTop = 0;
                }}
              >
                <h1>Home</h1>
              </NavLink>

              <NavLink to="/Adoção" activeClassName="actual-page">
                <h1>Adoção</h1>
              </NavLink>

              <NavLink to="/Lar-Temporário" activeClassName="actual-page">
                <h1>Lar Temporário</h1>
              </NavLink>

              <NavLink to="/AnimaisUFC" activeClassName="actual-page">
                <h1>Animais UFC</h1>
              </NavLink>

              <NavLink to="/Doação" activeClassName="actual-page">
                <h1>Doação</h1>
              </NavLink>

              <NavLink to="/FAQ" activeClassName="actual-page">
                <h1>FAQ</h1>
              </NavLink>
            </div>
          </header>
        </div>

        <div className="content">
          <Route component={Home} path="/" exact />
          <Route component={Adocao} path="/Adoção" exact/>
          <Route component={AdocaoFormPage} path="/Adoção/QueroAdotar/:id" exact/>
          <Route component={Lar} path="/Lar-Temporário" />
          <Route component={Animais} path="/AnimaisUFC" />
          <Route component={DetailsAnimal} path="/Adoção/detail/animal/:id" exact/>
          <Route component={DetailsAnimal} path="/Lar-Temporário/detail/animal/:id"/>
          <Route component={DetailsAnimal} path="/AnimaisUFC/detail/animal/:id" />
          <Route component={Doacao} path="/Doação" />
          <Route component={Faq} path="/FAQ" />
        </div>
      </div>

      <div className="footer">
        <div className="footer_int">
          <div className="grid-item collumn-1">
            <Link
              to="/"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              Home
            </Link>
            <Link
              to="/Adoção"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              Adoção
            </Link>
            <Link
              to="/Lar-Temporário"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              Lar Temporário
            </Link>
            <Link
              to="/AnimaisUFC"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              Animais UFC
            </Link>
          </div>

          <div className="grid-item collumn-4">
            <Link
              to="/Doação"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              Doação
            </Link>
            <Link
              to="/FAQ"
              onClick={() => {
                document.getElementById('root').scrollTop = 0;
              
            }}
            >
              FAQ
            </Link>
          </div>

          <div className="grid-item logo-item collumn-8">
            <a
              href="https://www.facebook.com/animaisuniversitarios"
              target="_blank"
            >
              <img src={require("./images/facebook.svg")} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/animaisuniversitarios/"
              target="_blank"
            >
              <img src={require("./images/instagram.svg")} alt="Instagram" />
            </a>
          </div>

          <div className="collumn-12 logo-footer">
            <img
              src={require("./images/AU_logo.svg")}
              alt="Animais Universitários"
            />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
