import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";

import { Link } from "react-router-dom";
import { Logout, UpdateUser } from "../../Actions/ActionsUsers";

import Main from "../../components/Title/main";
import Logo from "../../assets/logo.svg";
import "./styles.css";

function ConfigSreen(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const UserLogin = useSelector((state) => state.UserLogin);
  const { loading, error, userInfo } = UserLogin;

  const UserUpdate = useSelector((state) => state.UserUpdate);
  const {
    loading: LoadingUpdate,
    error: ErrorUpdate,
    success,
    infoUser,
  } = UserUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    // Se as informações passadas pelo o usuário estiver OK
    if (userInfo) {
      setEmail(userInfo.data.email);
    }
  }, [userInfo]);


  function handleLogout() {
    dispatch(Logout());
    props.history.push("/");
    window.location.reload(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userInfo.data.isADM) {
      dispatch(
        UpdateUser({
          userID: userInfo.data._id,
          email,
          password,
          confirmPassword,
        })
      );
      
    } else {
      alert("Você não tem a permissão para alterar a senha!");
    }
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="">
      <Main icon="SettingsIcon" title="Configurações"></Main>

      <div className="content-container">
        <div className="Header-GoBack" onClick={() => {}}></div>

        <div className="Content">
          <Link to="/" className="Handle-Link-Back" onClick={handleLogout}>
            <span>Sair</span>
            <KeyboardTabIcon />
          </Link>

          <section>
            {loading && <div>Carregando</div>}
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
                placeholder="Digite o seu email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="login" id="password-label">
                <LockIcon fontSize="large" />
                <span>Nova Senha</span>
              </label>
              <input
                type="password"
                id="login"
                name="login"
                value={password}
                placeholder="Digite a sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="newpassword" id="password-label">
                <LockIcon fontSize="large" />
                Confirmar Senha
              </label>
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                value={confirmPassword}
                placeholder="Digite a sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="button-container-config">
                <button type="submit" className="btn-confirm">
                  Confirmar
                </button>
                <button type="reset" className="btn-cancel">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ConfigSreen;
