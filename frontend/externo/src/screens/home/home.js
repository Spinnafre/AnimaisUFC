import React from "react";
import { Link, NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="textoProjeto">
        <div className="images-container">
          <div id="proparallax">
            <img
              className="one"
              src={require("../../images/home/379954463_37b391e6d7_b.jpg")}
            />
            <img className="two" src={require("../../images/home/gato.jpg")} />
            <img
              className="three"
              src={require("../../images/home/image_4712.svg")}
            />
          </div>
        </div>
        <h2>Sobre o Projeto</h2>
        <h4>
          O <strong>Animais Universitarios</strong> é um grupo voluntário que
          visa dar assistência e um novo lar a animais necessitados na
          Universidade Federal do Ceará, <strong>Campus do Pici.</strong> Nosso
          maior objetivo é ver os animais felizes e saudáveis e cessar o
          abandono de animais no local. Para isso, tentamos dar o nosso máximo
          para acolhê-los da melhor forma possível. <strong>Você</strong> tambem
          pode contribuir para o projeto e nos auxiliar a mantê-lo vivo.
          <strong>Toda ajuda é bem-vinda!</strong>
        </h4>
      </div>
      <div className="cards">
        <NavLink to="/Adoção" className="card" onClick={() => {
              document.getElementById("root").scrollTop = 0;
            }}>
          <img
            src={require("../../images/home/Component_77.svg")}
            alt="Símbolo de etiqueta"
          />
          <h3>Adote</h3>
          <h4>
            Acolha um animal desabrigado em seu lar. Eles estão prontos para
            amar e fazer parte da sua família! Permita-se encontrar um novo
            melhor amigo para que possam construir uma nova história juntos.
          </h4>
        </NavLink>

        <NavLink to="/Lar-Temporário" className="card" onClick={() => {
              document.getElementById("root").scrollTop = 0;
            }}>
          <img
            src={require("../../images/home/Component_76.svg")}
            alt="Símbolo de casinha"
          />
          <h3>Atue como Lar Temporário</h3>
          <h4>
            Ampare animais em baixo estado de saúde, concedendo seu lar para
            eles por um período de tempo limitado. Eles estão preparados e só
            precisam que alguem os acolha com amor, carinho e cuidados.
          </h4>
        </NavLink>

        <NavLink to="/Doação" className="card" onClick={() => {
              document.getElementById("root").scrollTop = 0;
            }}>
          <img
            src={require("../../images/home/Component_75.svg")}
            alt="Símbolo de coração"
          />
          <h3>Faça doações para a causa</h3>
          <h4>
            Nós somos um grupo sem fins lucrativos e por isso precisamos de sua
            ajuda para continuarmos cuidando dos animais. Doe dinheiro, comida
            ou produtos de higiene para que o projeto possa continuar!
          </h4>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
