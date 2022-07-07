import React, { useState } from "react";
import headerLogo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterMail = (e) => {
    setEmail(e.target.value);
  };

  const handleRegisterPsw = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="sign-up">
      <div className="sign-up__container">
        <img alt="Лого" className="header__logo" src={headerLogo} />
        <Link to={"/sign-in"} className="sign-up__button">
          Войти
        </Link>
      </div>
      <h2 className="sign-up__title">Регистрация</h2>
      <form onSubmit={handleSubmit} noValidate className="popup__form">
        <fieldset className="sign-up__fieldset">
          <input
            className="sign-up__input"
            id="email"
            type="email"
            name="Email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            onChange={handleRegisterMail}
            value={email}
          />
          <input
            className="sign-up__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
            autoComplete="on"
            onChange={handleRegisterPsw}
            value={password}
          />
        </fieldset>
      </form>

      <button
        className="sign-up__button_reg"
        type="submit"
        onClick={handleSubmit}
      >
        Зарегестрироваться
      </button>
      <p className="sign-up__description">
        Уже зарегистрированы?
        <Link className="sign-up__button_enter" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
