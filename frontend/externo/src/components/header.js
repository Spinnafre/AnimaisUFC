import React from "react";

import "./App.css";

function Nav() {
  return (
    <div class="header">
      <header class="page_header">
        <div class="logo">
          <a href="123" id="logo_AU">
            <img src="./images/instagram.svg" alt="logo" srcset=""/>
          </a>
        </div>
        <div class="sections">
          <a href="index.html" class="actual-page">
            <h1>Home</h1>
          </a>
          <a href="adoption-page.html">
            <h1>Adoção</h1>
          </a>
          <a href="temporary-home-page.html">
            <h1>Lar Temporário</h1>
          </a>
          <a href="ufc-animals-page.html">
            <h1>Animais UFC</h1>
          </a>
          <a href="donation.html">
            <h1>Doação</h1>
          </a>
          <a href="faq.html">
            <h1>FAQ</h1>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Nav;