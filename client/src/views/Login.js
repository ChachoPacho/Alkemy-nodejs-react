import React from 'react';
import { useHistory } from "react-router";

import Nav from '../components/Nav';

import { createUser, loginUser } from '../requests';
import { setSessionStorage } from '../sessionStorage';

const fieldsRequired = ["email", "password", "repeatPassword"];
const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function Login() {
    const history = useHistory();

    const prepareCreateUser = e => {
        const errorHTML = document.getElementById("registerMSG");
        const formHTML = e.target.parentElement;
        const formData = new FormData(formHTML);

        for (let index = 0; index < 3; index++) {
            if (!formData.get(fieldsRequired[index])) return formHTML[index].focus();
        }
  
        const email = formData.get("email");
        const password = formData.get("password");
        let errorMSG = (password.length < 6) ? "LA CONTRASEÑA ES MUY CORTA" : (password !== formData.get("repeatPassword")) ? "LAS CONTRASEÑAS NO COINCIDEN" : "";
        errorMSG = (emailRegex.test(email)) ? errorMSG : "EMAIL INVÁLIDO";

        if (errorMSG) return errorHTML.innerHTML = errorMSG;

        setSessionStorage(email, password, errorHTML, history, createUser);
    }

    const prepareLoginUser = e => {
        const errorHTML = document.getElementById("loginMSG");
        const formHTML = e.target.parentElement;
        const formData = new FormData(formHTML);
  
        const email = formData.get("email");
        const password = formData.get("password");

        setSessionStorage(email, password, errorHTML, history, loginUser);
    }

    return (
        <div className="container pt-2 pb-5">
            <Nav />
            <div className="text-center pb-4">
                <h1>ALKEMY ABM</h1>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="col-12 col-md-5">
                        <form className="card card-light p-4">
                            <div id="loginMSG" className="text-danger text-center w-100 fw-bold"></div>
                            <div className="mb-3">
                                <label htmlFor="loginEmail">Email:</label>
                                <input name="email" type="email" className="form-control" id="loginEmail" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword">Contraseña:</label>
                                <input name="password" type="password" className="form-control" id="loginPassword"/>
                            </div>
                            <div type="button" onClick={prepareLoginUser} className="btn btn-primary">Iniciar Sesión</div>
                        </form>
                    </div>
                    <div className="col-12 col-md-5">
                        <form className="card card-light p-4">
                            <div id="registerMSG" className="text-danger text-center w-100 fw-bold"></div>
                            <div className="mb-3">
                                <label htmlFor="registerEmail">Email:</label>
                                <input name="email" type="email" className="form-control" id="registerEmail" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerPassword">Contraseña:</label>
                                <input name="password" type="password" className="form-control" id="registerPassword"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerRepeatPassword">Repetir contraseña:</label>
                                <input name="repeatPassword" type="password" className="form-control" id="registerRepeatPassword"/>
                            </div>
                            <div type="button" onClick={prepareCreateUser} className="btn btn-primary">Registrarse</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
