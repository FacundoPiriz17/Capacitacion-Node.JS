const routeUsuarios = require('./routes/usuarios');
const express = require('express');
const app = express();

app.use(express.json());

app.use("/", routeUsuarios);
app.listen((3000),()=>{
    console.log("Server is Running")
})