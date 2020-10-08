import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import api from "../../api/api";
import "./styles.css";

function AnimalDetail(props) {
  const animal_id = props.match.params.id ? props.match.params.id : "";
  const [animal, setAnimals] = useState([]);

  console.log(animal_id, "DATA= ", animal);

  useEffect(() => {
    api.get(`/animal/api/${animal_id}`).then((animal) => {
      setAnimals(animal.data.data);
    });
  }, []);

  return (
    <>
      <div className="detailAnimal">
        <div className="content-header">
          <img src={animal.image} alt="Foto" />
          <div className="details">
            <h4>
              <strong>
                Nome: <span>{animal.name}</span>{" "}
              </strong>
            </h4>
            <p>
              <strong>
                Espécie: <span>{animal.species}</span>{" "}
              </strong>
            </p>
            <div className="side-elements">
              <p>
                <strong>
                  Idade: <span>{animal.age}</span>
                </strong>
              </p>
              <p>
                <strong>
                  Porte: <span>{animal.port}</span>
                </strong>
              </p>
            </div>
            <div className="side-elements">
              <p>
                <strong>
                  Sexo: <span>{animal.sex}</span>
                </strong>
                {/* <h5>Masculino</h5> */}
              </p>
              <p>
                <strong>
                  Raça: <span>{animal.breed}</span>
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div className="description">
          <p>{animal.desc}</p>
        </div>
        <div className="buttons">
          <Link
            to={`/Adoção/QueroAdotar/${animal_id}`}
            onClick={() => {
              document.getElementById("root").scrollTop = 0;
            }}
          >
            <button className="confirm">Quero adotar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AnimalDetail;
