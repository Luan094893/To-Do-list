const tarefa = document.getElementById('taskInput');
const adicionar = document.getElementById('addTaskButton');
const area_de_tarefas = document.getElementById('taskList');

adicionar.addEventListener('click', () => {
    // Verifica se o campo de entrada não está vazio
    if (tarefa.value.trim() !== '') {
        // Cria um novo item de lista
        const novoItem = document.createElement('li');
        novoItem.textContent = tarefa.value;

        // Cria um botão de remover
        const remove_button = document.createElement('button');
        remove_button.textContent = "remover";

        // Adiciona o novo item à lista de tarefas
        area_de_tarefas.appendChild(novoItem);

        // Adiciona o botão ao novo item
        novoItem.appendChild(remove_button);

        // Limpa o campo de entrada após adicionar a tarefa
        tarefa.value = '';

        // Adiciona a lógica do botão de remover
        remove_button.addEventListener('click', () => {
            area_de_tarefas.removeChild(novoItem);
        });
    }
});

// O "trim()" serve para remover so espaços em branco no começo e no final de ums string
