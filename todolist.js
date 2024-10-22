const tarefa = document.getElementById('taskInput');
const adicionar = document.getElementById('addTaskButton');
const area_de_tarefas = document.getElementById('taskList');
const experiencia = document.getElementById('experiência');
const nivel = document.getElementById('nível');

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
        aumentarExperiencia();
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

// Função para aumentar a experiência
function aumentarExperiencia() {
    let experienciaAtual = parseInt(localStorage.getItem('experiencia')) || 0; // Pega o valor salvo ou começa com 0
    const experienciaRecebida = 10;
    experienciaAtual += experienciaRecebida; // Adiciona a nova experiência

    if (experienciaAtual >= 100) {
        subirNivel(); // Chama a função de subir nível
        experienciaAtual = 0; // Reseta a experiência
    }

    localStorage.setItem('experiencia', experienciaAtual); // Salva a nova experiência
    experiencia.textContent = 'Experiência: ' + experienciaAtual; // Atualiza na tela
}

// Função para subir de nível
function subirNivel() {
    let nivelAtual = parseInt(localStorage.getItem('nível')) || 0; // Pega o nível atual ou começa com 0
    const nivelRecebido = 1;
    nivelAtual += nivelRecebido; // Incrementa o nível

    localStorage.setItem('nível', nivelAtual); // Salva o novo nível
    nivel.textContent = 'Nível: ' + nivelAtual; // Atualiza na tela
}