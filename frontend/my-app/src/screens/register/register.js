import React, { useState,useEffect} from "react";
import { Link} from "react-router-dom";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

import { useSelector, useDispatch } from "react-redux";

import Logo from "../../assets/logo.svg";
import {Register} from '../../Actions/ActionsUsers'

import "./styles.css";

function Login(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const UserRegist=useSelector(state=>state.UserRegister)
  const {loading,error,userInfo,success}=UserRegist
  const dispatch = useDispatch();


  function handleSubmit(e) {
    e.preventDefault()
    dispatch(Register(email,password,confirmPassword))
  }
  
  useEffect(()=>{
    if(success){
      props.history.push("catalogo/Animais");
      window.location.reload(false);
    }
  },[success])

  return (
    <div className="form-container">
      <section className="form">
        <div className="Logo-Container">
          <img id="img2" src={Logo} alt="Logo" />
        </div>
        {loading && <div>Carregando</div>}
        {error && <div>{
          error
        }</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <AlternateEmailIcon fontSize="large" />
            Email
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
              Registrar
            </button>
          </div>
        </form>

        <div className="Link-Container">
          <Link className="back-link" to="/">
            {/* <FiLogOut color={"#7079f8"} size={17} /> */}
            <span>Já é registrado?</span>
          </Link>
        </div>
      </section>
      {/* <img id="img2" src={heroes} alt="" /> */}
    </div>
  );
}

export default Login;
