const tarefa = document.getElementById('taskInput');
const adicionar = document.getElementById('addTaskButton');
const area_de_tarefas = document.getElementById('taskList');

// Função para adicionar a tarefa à lista
function adicionarTarefa(tarefaTexto) {
    const novoItem = document.createElement('li');
    novoItem.textContent = tarefaTexto;

    const remove_button = document.createElement('button');
    remove_button.textContent = "remover";

    novoItem.appendChild(remove_button);
    area_de_tarefas.appendChild(novoItem);

    remove_button.addEventListener('click', () => {
        area_de_tarefas.removeChild(novoItem);
        salvarTarefas(); // Atualiza o localStorage após remover
    });
}

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('#taskList li').forEach(tarefa => {
        tarefas.push(tarefa.firstChild.textContent); // Salva apenas o texto da tarefa
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        const listaDeTarefas = JSON.parse(tarefasSalvas);
        listaDeTarefas.forEach(tarefaTexto => adicionarTarefa(tarefaTexto));
    }
}

adicionar.addEventListener('click', () => {
    if (tarefa.value.trim() !== '') {
        adicionarTarefa(tarefa.value);
        tarefa.value = ''; // Limpa o campo de entrada
        salvarTarefas(); // Salva no localStorage após adicionar
    }
});

// Carrega as tarefas salvas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarTarefas);
