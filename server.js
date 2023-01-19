const express = require('express')
//const mongoose = require('mongoose')

const app = express();
let tasks = require('./tarefas.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    res.send('Você está conectado com o servidor!')
})

app.get("/tasks", (req, res) => {
    res.json(tasks);
})

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((t) => t.identificador == id);

    if(!task) return res.status(404).json({status: 'erro', message: "identificador invalido"});

    res.json(task);
})

app.post("/tasks", (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((task) => task.identificador != id );
    
    res.json('Removido');
});

app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.identificador == id);

    if(!task) return res.status(404).json({status: 'erro', message: "identificador invalido"});
    
    positionOfTaskToBeChanged = tasks.indexOf(task);
    tasks[ positionOfTaskToBeChanged ] = req.body
    
    res.json(task[positionOfTaskToBeChanged]);
}); 


app.listen(3000, () => { console.log('Servidor de execucao na porta 3000') });