import React from "react";
import PetsIcon from "@material-ui/icons/Pets";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ForumIcon from "@material-ui/icons/Forum";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, NavLink } from "react-router-dom";

import Logo from "../../assets/logo2.svg";

import "./styles.css";

function Nav(props) {
  return (
    <div className="headerNav-Container">
      <div className="Header-Nav-Links">
        <div className="Logo-Container">
          <img src={Logo} alt="logo" />
        </div>

        <div className="nav-Container">
          <NavLink
            to="/catalogo/Animais"
            // className="content-link"
            activeClassName="content-link-selected"
          >
            <PetsIcon />
            <span id="animais">Animais</span>
          </NavLink>

          <NavLink
            to="/catalogo/Donation"
            activeClassName="content-link-selected"
          >
            <MonetizationOnIcon />
            <span id="doacoes">Doações</span>
          </NavLink>

          <NavLink to="/catalogo/Faq" activeClassName="content-link-selected">
            <ForumIcon />
            <span id="FAQ">FAQ</span>
          </NavLink>

          <NavLink to="/config" activeClassName="content-link-selected">
            <SettingsIcon />
            <span id="config">configurações</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
