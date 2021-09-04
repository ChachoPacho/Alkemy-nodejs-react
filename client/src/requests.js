const requestedHostname = 'http://localhost:3000/';

function getUserData() {
    return {
        email: sessionStorage.getItem('email'),
        password: sessionStorage.getItem('password'),
        idUser: sessionStorage.getItem('idUser')
    }
}

//USERS
async function createUser(email, password) {
    return await fetch(requestedHostname + "users", {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
}

async function loginUser(email, password) {
    return await fetch(requestedHostname + "users", {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
}


//OPERATIONS
async function getOperations(type_=null, category_=null, limit=null, mountMin=null, mountMax=null) {
    const { email, password, idUser } = getUserData();
    return await fetch(requestedHostname + "operations", {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            idUser,
            limit,
            mountMin,
            mountMax,
            type_,
            category_
        })
    })
    .then(res => res.json())
}

async function saveOperation(concept_, quantity_, date_, type_, category_) {
    const { email, password, idUser } = getUserData();

    return await fetch(requestedHostname + "operations", {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            idUser,
            concept_,
            type_,
            category_,
            quantity_,
            date_
        })
    })
    .then(res => res.json())
}

async function updateOperation(idOperation, concept_=null, quantity_=null, date_=null, category_=null) {
    const { email, password, idUser } = getUserData();

    return await fetch(requestedHostname + "operations/" + idOperation, {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            idUser,
            concept_,
            category_,
            quantity_,
            date_
        })
    })
    .then(res => res.json())
}

async function deleteOperation(idOperation) {
    return await fetch(requestedHostname + "operations/" + idOperation, {
        method: 'DELETE',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getUserData())
    })
    .then(res => res.json())
}

async function getTotals() {
    return await fetch(requestedHostname + "operations/totals", {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getUserData())
    })
    .then(res => res.json())
}


module.exports = {
    //USERS
    createUser,
    loginUser,
    //OPERATIONS
    getOperations,
    deleteOperation,
    saveOperation,
    updateOperation,
    getTotals
}