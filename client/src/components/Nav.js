import React from 'react';
import { useHistory } from 'react-router';

import { removeSessionStorage } from '../sessionStorage';

function Nav() {
    const email = sessionStorage.getItem("email");
    const history = useHistory();

    return (
        <nav className="navbar navbar-secondary bg-secondary mb-4">
            <div className="d-flex w-100">
                <div className="align-self-center"><a className="ms-3 me-2 text-light align-center text-decoration-none fw-bold" href="/">ALKEMY</a></div>
                <div><a className="mx-1 btn btn-primary me-2" href="/operations" type="button">OPERACIONES</a></div> 
                {
                    (email) ? (
                        <>
                            <div className="align-self-center text-light align-center">
                                <span className="fw-bold">Usuario: </span>{ sessionStorage.getItem("email") }
                            </div>
                            <div className="ms-auto align-self-center">
                                <div onClick={() => { removeSessionStorage(history) }} className="btn btn-danger me-3 p-1" type="button">Cerrar Sesión</div>
                            </div>
                        </>
                    ) : (
                        <div className="ms-auto align-self-center">
                            <a className="btn btn-info me-3 p-1" href="/login" type="button">Iniciar Sesión</a>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav
