import React, { useState} from "react";
import { Link} from "react-router-dom";



import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";


import Logo from "../../assets/logo.svg";

import api from '../../api/api'

function LoginScreen(props) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    api.post('user/api/createUserAdm/forgot',{email})
    .then(r=>{
      setEmail("")
      alert("Verifique o seu email por favor")
      props.history.push("/")
    })
    .catch(error=>alert(`Lamento mas tem error: ${error}`))
  }

  return (
    <div className="form-container">
      <section className="form">
        <div className="Logo-Container">
          <img id="img2" src={Logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <AlternateEmailIcon fontSize="large" />
            Email do ADM
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="user@email.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        
          <div className="button-container">
            <button type="submit" className="btn-send-form">
              Enviar email
            </button>
          </div>
        </form>

        <div className="Link-Container">
          <Link className="back-link" to="/">
            {/* <FiLogOut color={"#7079f8"} size={17} /> */}
            <span>Voltar</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LoginScreen;
