//API: https://localhost:3000
let tabela = document.querySelector('.tarefas');
let progressaoID = 1;


//get
function getRequest(){

    const idTarefa = prompt("Qual tarefa você está buscando?");

    fetch('http://localhost:3000/tasks/' + idTarefa)
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
        progressaoID = minhasTarefas.length;

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
    fetch('http://localhost:3000/tasks', {
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

    progressaoID++;
}

//delete
function deleteRequest(novaVersaoDeTarefa){
    const idTarefaADeletear = prompt("Qual tarefa você está deletando?");

    fetch('http://localhost:3000/tasks/' + idTarefaADeletear, {
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

    progressaoID--;
}

//put
function putRequest(){
    const idTarefaAAlterar = prompt("Qual tarefa você está alterando?");
    
    fetch('http://localhost:3000/tasks/' + idTarefaAAlterar, {
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