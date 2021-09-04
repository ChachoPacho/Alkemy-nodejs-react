const setSessionStorage = async (email, password, errorHTML, history, functionUser) => {
    const { idUser, error } = await functionUser(email, password);

    if (error) errorHTML.innerHTML = error;
    else {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("idUser", idUser);
        history.push("/");
    };
}

const removeSessionStorage = (history) => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("idUser");
    history.push("/login");
}

module.exports = {
    setSessionStorage,
    removeSessionStorage
}