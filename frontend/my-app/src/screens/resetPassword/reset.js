import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BoxLoading } from "react-loadingg";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

import Logo from "../../assets/logo.svg";

import api from '../../api/api'

function ResetScreen(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    api.post('user/api/createUserAdm/reset_password',{email,token:props.match.params.id, password,confirmPassword})
    .then(r=>{
      setPassword("")
      setConfirmPassword("")
      setEmail("")
      return alert("ATUALIZADO!")
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
            Email do usuário ADM
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Digite o seu email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" id="password-label">
            <LockIcon fontSize="large" />
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            minLength={6}
            placeholder="Digite a sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmpassword" id="password-label">
            <LockIcon fontSize="large" />
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={confirmPassword}
            minLength={6}
            required
            placeholder="Digite a sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" className="btn-send-form">
              Mudar senha
            </button>
          </div>
        </form>

      </section>
    </div>
  );
}

export default ResetScreen;
