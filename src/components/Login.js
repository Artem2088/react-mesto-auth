import React, { useState } from "react";
import headerLogo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordLogin = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="log-in">
      <div className="log-in__container">
        <img alt="Лого" className="header__logo" src={headerLogo} />
        <Link to="/signup" className="log-in__button">
          Регистрация
        </Link>
      </div>
      <h2 className="log-in__title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="log-in__fieldset">
          <input
            className="log-in__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            onChange={handleEmailLogin}
            value={email}
          />
          <input
            className="log-in__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            onChange={handlePasswordLogin}
            value={password}
          />
        </fieldset>
      </form>
      <button
        className="log-in__button_ent"
        type="button"
        onClick={handleSubmit}
      >
        Войти
      </button>
    </div>
  );
}

export default Login;
