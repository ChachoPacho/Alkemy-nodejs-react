const connect = require("../database");

async function validateUser(db, id, fromUser) {
    const [rows] = await db.query("SELECT email, pass FROM alkemy.users WHERE id=?", [id]);
    return (rows[0] && rows[0].email === fromUser.email && rows[0].pass === fromUser.password)
}

//USERS
async function createUser(req, res) {
    const db = await connect();
    const [rows] = await db.query("SELECT id FROM alkemy.users WHERE email=?", [ req.body.email ]);
    if (rows.length) {
        res.json({
            error: "El e-mail ya existe."
        });
    } else {
        const [result] = await db.query("INSERT INTO alkemy.users(email, pass) VALUES (?, ?)", [
            req.body.email,
            req.body.password
        ]);
        res.json({
            idUser: result.insertId
        });
    }
}

async function loginUser(req, res) {
    const db = await connect();
    const [rows] = await db.query("SELECT pass, id FROM alkemy.users WHERE email=?", [ req.body.email ]);
    
    res.json((rows[0].pass === req.body.password) ? { idUser: rows[0].id } : { error: "Email o Contraseña inválidos" });
}


//OPERATIONS
async function getOperations(req, res) {
    const db = await connect();

    const { type_, idUser, category_, limit, mountMin, mountMax } = req.body;
    if (await validateUser(db, idUser, req.body)) {
        let extra = (type_) ? ` AND type_=${type_}` : "";
        if (category_ && category_.length !== 0) {
            extra += " AND (";
            for (const index in category_) {
                extra += `category_='${category_[index]}'${( index != category_.length - 1 ) ? " OR " : ""}`;
            }
            extra += ")";
        }
        extra += (mountMin) ? ` AND quantity_ >= ${mountMin}` : "";
        extra += (mountMax) ? ` AND quantity_ <= ${mountMax}` : "";
        extra += (limit) ? ` LIMIT ${limit}` : "";
        console.log(extra)
        const [rows] = await db.query("SELECT * FROM alkemy.operations WHERE idUser=?" + extra, [idUser]);
        res.json(rows);
    } else {
        res.send("Ocurrió un error ¿Estás logueado?");
    }
}

async function saveOperation(req, res) {
    console.log(req.body)
    const db = await connect();
    if (await validateUser(db, req.body.idUser, req.body)) {
        const [result] = await db.query("INSERT INTO alkemy.operations(concept_, quantity_, date_, type_, category_, idUser) VALUES (?, ?, ?, ?, ?, ?)", [ 
            req.body.concept_, 
            req.body.quantity_, 
            req.body.date_,
            req.body.type_,
            req.body.category_,
            req.body.idUser 
        ]);
        res.json({
            id: result.insertId,
            ...req.body,
        });
    } else {
        res.send("Ocurrió un error ¿Estás logueado?");
    }

} 

async function deleteOperation(req, res) {
    const db = await connect();
    if (await validateUser(db, req.body.idUser, req.body)) {
        await db.query("DELETE FROM alkemy.operations WHERE idUser=? AND id=?", [
            req.body.idUser,
            req.params.id
        ]);
        res.json("DELETED");
    } else {
        res.send("Ocurrió un error ¿Estás logueado?");
    }
} 

async function updateOperation(req, res) {
    const db = await connect();
    if (await validateUser(db, req.body.idUser, req.body)) {
        delete req.body.email;
        delete req.body.password;
        Object.keys(req.body).forEach(key => {
            if (req.body[key] === null) delete req.body[key];
        });
        await db.query("UPDATE alkemy.operations SET ? WHERE idUser=? AND id=?", [
            req.body,
            req.body.idUser,
            req.params.id
        ]);
        res.json("Updated");
    } else {
        res.send("Ocurrió un error ¿Estás logueado?");
    }
} 

async function getTotals(req, res) {
    const db = await connect();
    if (await validateUser(db, req.body.idUser, req.body)) {
        const [rows] = await db.query("SELECT Sum(IF(type_=1, quantity_, 0)) AS ingresos, Sum(IF(type_=0, quantity_, 0)) AS egresos FROM alkemy.operations WHERE idUser=?", [
            req.body.idUser
        ]);
        res.json(rows);
    } else {
        res.send("Ocurrió un error ¿Estás logueado?");
    }
} 

module.exports = {
    //USERS
    createUser,
    loginUser,
    //OPERATIONS
    getOperations,
    saveOperation,
    deleteOperation,
    updateOperation,
    getTotals
}