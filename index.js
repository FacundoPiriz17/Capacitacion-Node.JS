const express = require('express');
const jsonServer = require("json-server");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);

app.get("/usuarios", (request, response) => {
    const users = router.db.get("usuarios").value();
    response.json(users);
});

app.get("/usuarios/id", (request,response) => {
    const id = parseInt(request.params.id);
    const user = router.db.get("usuarios").find({id}).value();
    if(user){
        response.json(user);
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});

app.post("/usuarios", (request,response) => {
    const newUser = request.body;
    const newId = router.db.get("usuarios").size().value() + 1;
    const users = router.db.get("usuarios").value();
    const existentUser = users.find(newUser => newUser.id == newId);
    
    if(existentUser){
        response.status(404).json({message: "Ese Usuario ya existe"});
    }
    else{
        router.db.get("usuarios").push(newUser).write();
        response.json(newUser);
    }
}
);

app.put("/usuarios/:id", (request,response) => {
    const id = parseInt(request.params.id);
    const existentUser = router.db.get("usuarios").find({id}).value();
    if(existentUser){
        const updateUser = router.db.get("usuarios").find({id}).assign(request.body).write();
        response.json(updateUser);
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});

app.delete("/usuarios/id", (request,response) => {
    const id = parseInt(request.params.id);
    const existentUser = router.db.get("usuarios").find({id}).value();
    if(existentUser){
        router.db.get("usuarios").remove({id}).write();
        response.json({message: "Usuario eliminado"});
    }else{
        response.status(404).json({message: "Usuario no encontrado"});
    }
});