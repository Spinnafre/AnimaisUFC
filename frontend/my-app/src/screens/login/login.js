import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BoxLoading } from "react-loadingg";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";

import Logo from "../../assets/logo.svg";

import { Login } from "../../Actions/ActionsUsers";

function LoginScreen(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const LoginInfo = useSelector((state) => state.UserLogin);
  const { loading, userInfo, error } = LoginInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    /*Se o usuário já estiver cadastrado, então irá pular o 
    login (Tanto para a compra como quando o mesmo querer logar novamente)
    */
    if (userInfo) {
      //
      props.history.push("catalogo/Animais");
    }
  }, [userInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Login(email, password));
  }

  return (
    <div className="form-container">
      <section className="form">
        <div className="Logo-Container">
          <img id="img2" src={Logo} alt="Logo" />
        </div>

        {loading && (
          <div className="Loading-Container">
            <BoxLoading size={30} color="red" />
          </div>
        )}
        {error && <div>{error}</div>}
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
            placeholder="user@email.com"
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
            placeholder="Digite a sua senha"
            minLength={6}
            title="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit" className="btn-send-form">
              Entrar
            </button>
          </div>
        </form>
        <div className="Link-Container">
          <Link className="back-link" to="/forgot">
            <span>Esqueceu a senha?</span>
          </Link>
        </div>

        <div className="Link-Container">
          <Link className="back-link" to="/register">
            <span>Não é registrado?</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default LoginScreen;
