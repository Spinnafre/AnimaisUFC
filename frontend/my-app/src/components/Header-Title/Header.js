import React from "react";
import PetsIcon from "@material-ui/icons/Pets";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ForumIcon from "@material-ui/icons/Forum";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";

import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <h1 className="mt-3">
        {props.icon === "PetsIcon" ? (
          <PetsIcon />
        ) : props.icon === "MonetizationOnIcon" ? (
          <MonetizationOnIcon />
        ) : props.icon === "ForumIcon" ? (
          <ForumIcon />
        ) : props.icon === "SettingsIcon" ? (
          <SettingsIcon />
        ) : (
          ""
        )}
        <span>{props.title}</span>
      </h1>

      
    </header>
  );
}

export default Header;
