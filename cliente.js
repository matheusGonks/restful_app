//API: https://localhost:3000
let tabela = document.querySelector('.tarefas');
const endereco = 'http://localhost:3000/tasks/';

//get
function getRequest(){

    const idTarefa = prompt("Qual tarefa você está buscando?");

    fetch(endereco + idTarefa)
    .then(res => {
        if(!res.ok){
            console.log("GET request unsuccessful");
            throw res;
        }
        console.log("GET request successful");
        return res;
    })
    .then(res => res.json(res))
    .then(listaDeTarefas => {

        let minhasTarefas = [];
        minhasTarefas = minhasTarefas.concat(listaDeTarefas);
        progressaoID = minhasTarefas.length + 1;

        tabela.innerHTML = " <tr>" +
                                "<th>Id</th>" +
                                "<th>Descricao</th>" +
                                "<th>Prazo</th>" +
                                "<th>Completa</th>" +
                            "</tr>";

        minhasTarefas.forEach((tarefa) => {
            
            tabela.innerHTML += "<tr>" +
            "<td>" + tarefa.identificador + "</td>" + 
            "<td>" + tarefa.descricao + "</td>" + 
            "<td>" + new Date(tarefa.prazo) + "</td>" +
            "<td>" + ((tarefa.completa)? "Sim" : "Não") + "</td>" +
            "<tr>";
        });

        document.getElementById("tabela").style.display = "block";
        closeForm();
        
    })
    .catch(error => {
        console.log(error)
    });

}

//post
function postRequest(novaTarefa){   
    fetch(endereco, {
        method: "POST",
        headers: {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify (novaTarefa),
    })
    .then(res => res.json())
    .then(data => {
        alert('Tarefa cadastrada');
        console.log(data);
    })
    .catch(error => console.log(error));

}

//delete
function deleteRequest(novaVersaoDeTarefa){
    const idTarefaADeletear = prompt("Qual tarefa você está deletando?");

    fetch(endereco + idTarefaADeletear, {
        method: "DELETE",
        headers: {
            'Content-type' : 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("A tarefa foi removida");
    })
    .catch(error => console.log(error));
}

//put
function putRequest(novaVersaoDeTarefa){
    const idTarefaAAlterar = prompt("Qual tarefa você está alterando?");
    
    fetch(endereco + idTarefaAAlterar, {
        method: "PUT",
        headers: {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify (novaVersaoDeTarefa),
    })
    .then(res => res.json())
    .then(data => {
        alert('Tarefa alterada!');
        console.log(data);
    })
    .catch(error => console.log(error));
}