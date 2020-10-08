import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../../api/api";

import { useSelector, useDispatch } from "react-redux";
import { listAnimals } from "../../Actions/listAnimals";

function Lar() {
  const [items, setItem] = useState();
  const [data, setData] = useState([]);

  const AnimalList = useSelector((state) => state.AnimalList);
  const { animals, loading, error } = AnimalList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAnimals("Lar temporário"));
  }, []);
  console.log("ANIMAIS= ", animals);

  useEffect(() => {
    showAnimals();
  }, [animals]);

  let filter = {
    species: [],
    sex: [],
    port: [],
    age: [],
  };
  let url = animals;
  console.log("URL= ", url);

  function FilterAnimals(e) {
    if (e.checked) {
      filter[e.name].push(e.value);
    } else {
      const value = filter[e.name].indexOf(e.value);
      filter[e.name].splice(value, 1);
    }
    showAnimals();
  }

  function showAnimals() {
    // Array.from(document.getElementsByClassName("animal")).forEach((element) =>
    // element.remove()
    // );
    let data = url.filter((e) => filterJson(e));
    console.log("DATA FILTRADA= ", data);
    if (data) {
      setData(data);
    } else {
      setData(url);
    }

    // changeAnimalsHTML(data);
  }
  function filterJson(animal) {
    const validation = {
      species: true,
      sex: true,
      port: true,
      age: true,
    };

    for (let i = 0; i < filter.species.length; i++) {
      if (animal.species === filter.species[i]) {
        validation.species = true;
        // break;
        return true;
      }
      validation.species = false;
    }
    if (!validation.species) {
      return false;
    }

    for (let i = 0; i < filter.sex.length; i++) {
      if (animal.sex === filter.sex[i]) {
        validation.sex = true;
        // break;
        return true;
      }
      validation.sex = false;
    }
    if (!validation.sex) {
      return false;
    }

    for (let i = 0; i < filter.port.length; i++) {
      if (animal.port === filter.port[i]) {
        validation.port = true;
        // break;
        return true;
      }
      validation.port = false;
    }
    if (!validation.port) {
      return false;
    }

    for (let i = 0; i < filter.age.length; i++) {
      let ageRange;

      if (filter.age[i] === "0-2") {
        ageRange = [0, 1, 2];
      } else if (filter.age[i] == "3-5") {
        ageRange = [3, 4, 5];
      } else if (filter.age[i] == "6-8") {
        ageRange = [6, 7, 8];
      } else if (filter.age[i] == "9+") {
        ageRange = [9, 10, 11, 12, 13, 14, 15, 16, 17];
      }
      for (let j = ageRange[0]; j <= ageRange[ageRange.length - 1]; j++) {
        if (animal.age == j) {
          validation.age = true;
          return true;
        }
        validation.age = false;
      }
    }
    if (!validation.age) {
      return false;
    }
    return true;
  }

  console.log("DATA TOTAL= ", data);

  return (
    <>
      <div className="content-headerPage">
        <div className="container-img">
          <h1>Lar temporário</h1>

          <img src={require("../../images/headerIMG2.png")} alt="" srcset="" />
        </div>
        <header>
          <h3>
            O lar temporário é uma iniciativa do Animais Universitários para
            garantir um lar a um animal que se encontra em más condições de
            sáude. Ao escolher um bichinho, você concorda em dividir seu
            ambiente com ele enquanto aguarda sua recuperação. Mas não se
            preocupe, nosso projeto irá se encarregar de oferecer a ração e os
            demais materiais necessários para cuidar do bichinho.
          </h3>
        </header>
      </div>
      <div className="content-section">
        <div className="filters">
          <h4>Filtrar</h4>
          <form id="filters" action="">
            <div className="filter-category">
              <h5>Espécie</h5>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="dog"
                  value="Cachorro"
                  name="species"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="dog" className="filter-label">
                  Cachorro
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="cat"
                  value="Gato"
                  name="species"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="cat" className="filter-label">
                  Gato
                </label>
              </div>
            </div>
            <div className="filter-category">
              <h5>Sexo</h5>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="female"
                  value="Feminino"
                  name="sex"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="female" className="filter-label">
                  Fêmea
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="male"
                  value="Masculino"
                  name="sex"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="male" className="filter-label">
                  Macho
                </label>
              </div>
            </div>
            <div className="filter-category">
              <h5>Porte</h5>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="small"
                  value="Pequeno"
                  name="port"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="small" className="filter-label">
                  Pequeno
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="medium"
                  value="Médio"
                  name="port"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="medium" className="filter-label">
                  Médio
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="big"
                  value="Grande"
                  name="port"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="big" className="filter-label">
                  Grande
                </label>
              </div>
            </div>
            <div className="filter-category">
              <h5>Idade</h5>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="0-2"
                  value="0-2"
                  name="age"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="0-2" className="filter-label">
                  0 - 2 anos
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="3-5"
                  value="3-5"
                  name="age"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="3-5" className="filter-label">
                  3 - 5 anos
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="6-8"
                  value="6-8"
                  name="age"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="6-8" className="filter-label">
                  6 - 8 anos
                </label>
              </div>
              <div className="input-block">
                <input
                  type="checkbox"
                  id="9+"
                  value="9+"
                  name="age"
                  onChange={(e) => FilterAnimals(e.target)}
                />
                <label htmlFor="9+" className="filter-label">
                  9 anos ou mais
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="animals">
          <section>
            <ul id="animals-form">
              {data.length === 0 ? (
                <h1>Não foi possível encontrar o animal</h1>
              ) : (
                data.map((animal) => (
                  <li key={animal._id}>
                    <Link
                      to={`/Adoção/detail/animal/${animal._id}`}
                      className="animal"
                      type="submit"
                      name="animal"
                    >
                      <div className="photo">
                        <img src={animal.image} alt="Foto" />
                      </div>
                      <div className="name-port">
                        <h6>{animal.name}</h6>
                        <div className="porte-sex">
                          <div className="porte">
                            {/* {console.log(animal.port)} */}
                            <p
                              className={
                                animal.port === "Pequeno" ? "actual-port" : ""
                              }
                            >
                              P
                            </p>
                            <p
                              className={
                                animal.port === "Médio" ? "actual-port" : ""
                              }
                            >
                              M
                            </p>
                            <p
                              className={
                                animal.port === "Grande" ? "actual-port" : ""
                              }
                            >
                              G
                            </p>
                          </div>
                          <img
                            src={
                              animal.sex === "Masculino"
                                ? require("../../images/animals/masculino.svg")
                                : require("../../images/animals/feminino.svg")
                            }
                            alt="Sexo"
                          />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default Lar;
