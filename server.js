const express = require('express');
const fs = require('fs');
let tasks, idAtual;

fs.readFile('tarefas.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        tasks = JSON.parse(data);
        idAtual = tasks.length + 1;

}});


const app = express();

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
    let task = req.body;
    task = { identificador : idAtual, ...task };
    tasks.push(task);
    idAtual++;

    const tasksJSON = JSON.stringify(tasks);
    fs.writeFile('tarefas.json', tasksJSON , 'utf-8' , (err) => { if (err) throw err }  );

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((task) => task.identificador != id );

    const tasksJSON = JSON.stringify(tasks);
    fs.writeFile('tarefas.json', tasksJSON , 'utf-8' , (err) => { if (err) throw err } );
    
    res.json('Removido');
});

app.put("/tasks/:id", (req, res) => {
    let id = req.params.id;
    let taskAlterada = tasks.find((task) => task.identificador == id);
    
    if(!taskAlterada) return res.status(404).json({status: 'erro', message: "identificador invalido"});
    
    let novoCorpo = req.body; novoCorpo = { identificador : id, ...novoCorpo}; 
    let posicao = tasks.indexOf(taskAlterada);;
    tasks[ posicao ] = novoCorpo;

    const tasksJSON = JSON.stringify(tasks);
    fs.writeFile('tarefas.json', tasksJSON , 'utf-8' , (err) => { if (err) throw err } );
    
    res.json(tasks[ posicao ]);
}); 


app.listen(3000, () => { console.log('Servidor de execucao na porta 3000') });