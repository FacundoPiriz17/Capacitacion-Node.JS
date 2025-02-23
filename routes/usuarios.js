const express = require('express');
const router = express.Router();
const jsonServer = require("json-server");
const dbRouter = jsonServer.router("db.json");

router.get("/usuarios", (request, response) => {
    const users = dbRouter.db.get("usuarios").value();
    response.json(users);
});

router.get("/usuarios/:id", (request,response) => {
    const id = parseInt(request.params.id);
    const user = dbRouter.db.get("usuarios").find({id}).value();
    if(user){
        response.json(user);
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});

router.post("/usuarios", (request,response) => {
    const newUser = request.body;
    const existentUser = dbRouter.db.get("usuarios").find(user => user.id === newUser.id).value();    
    if(existentUser){
        response.status(404).json({message: "Ese Usuario ya existe"});
    }
    else{
        dbRouter.db.get("usuarios").push(newUser).write();
        response.json(newUser);
    }
}
);

router.put("/usuarios/:id", (request,response) => {
    const id = parseInt(request.params.id);
    const existentUser = dbRouter.db.get("usuarios").find({id}).value();
    if(existentUser){
        const updateUser = dbRouter.db.get("usuarios").find({id}).assign(request.body).write();
        response.json(updateUser);
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});

router.delete("/usuarios/:id", (request,response) => {
    const id = parseInt(request.params.id);
    const existentUser = dbRouter.db.get("usuarios").find({id}).value();
    if(existentUser){
        dbRouter.db.get("usuarios").remove({id}).write();
        response.json({message: "Usuario eliminado"});
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});

module.exports = router;