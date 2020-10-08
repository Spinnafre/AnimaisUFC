import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import api from "../../api/api";
import "./styles.css";

function ConcludeForm(props) {
  const animal_id = props.match.params.id ? props.match.params.id : "";
  const [animal, setAnimals] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  console.log(animal_id, "DATA= ", animal);

  useEffect(() => {
    api.get(`/animal/api/${animal_id}`).then((animal) => {
      setAnimals(animal.data.data);
    });
  }, []);

  function handleComposeWhatsapp(e) {
    e.preventDefault();
    window.open(
      `https://api.whatsapp.com/send?phone=5585${animal.telephone}&text=Eu sou o ${name}, e quero adotar ${animal.name}. Contatos: email: ${email} e telephone:${telephone}`
    );
  }
  console.log(animal.telephone);
  return (
    <>
      <div className="details-contact">
        <div className="animal-details">
          <div className="image-container">
            <img src={animal.image} alt="Foto" />
          </div>
          <div className='info-animal'>
            <h4>
              <strong>
                Nome: <span>{animal.name}</span>
              </strong>
            </h4>
            <p>
              <strong>
                Espécie: <span>{animal.species}</span>
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
              </p>
              <p>
                <strong>
                  Raça: <span>{animal.breed}</span>
                </strong>
              </p>
            </div>
            <h2>
              <strong>Descrição</strong>
            </h2>
            <div className="description-animal">
              <p>{animal.desc}</p>
            </div>
          </div>
        </div>
        <div className="procedure-contact">
          <div className="procedure">
            <h4>Como vai funcionar ?</h4>
            <p>
              Para continuar com a adoção, você deve preencher os dados que são
              necessários abaixo e em seguida você poderá contactar um de nossos
              voluntários para que ele faça algumas perguntas. Dessa forma, ele
              saberá se você está apto ou não para cuidar do animal.
            </p>
          </div>
          <div className="contact">
            <h4>Formulário de adoção</h4>
            <h5>Seus dados</h5>
            <form id="contact-forms" onSubmit={handleComposeWhatsapp}>
              <div className="input-block-conclude">
                <label htmlFor="name" className="superior-label">
                  Nome:{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-block-conclude">
                <label htmlFor="email" className="superior-label">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block-conclude">
                <label htmlFor="cell-number" className="superior-label">
                  Número de telefone:{" "}
                </label>
                <input
                  type="text"
                  name="cell-number"
                  id="cell-number"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="buttons-confirm">
                <button
                  type="submit"
                  form="contact-forms"
                  className="confirm"
                  name="animal"
                >
                  Contactar voluntário
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConcludeForm;
