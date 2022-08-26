// selecao de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const serachInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterBtn = document.querySelector('#filter-select');

let oldInputValue;

// funcoes
const saveTodo = (text) => {

    // montar o estrutura html da elemento da lista de tarefas 

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text; // passar o texto do input
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // adicionar icone ao botao
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

const toggleForm = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

        }
    });
}

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector('h3').innerText.toLowerCase();
        todo.style.display = 'flex';

        console.log(todoTitle);

        if (!todoTitle.includes(search)){
            todo.style.display = "none";
        }
    });
}


const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll('.todo');

    switch (filterValue) {
        case 'all':
            todos.forEach((todo) => {
                todo.style.display = 'flex';
            });
            break;
        
        case 'done':
            todos.forEach((todo) => {
                todo.classList.contains('done') ? (todo.style.display = 'flex') : (todo.style.display = 'none');
            });
            break;
        
        case 'todo':
            todos.forEach((todo) => {
                !todo.classList.contains('done') ? (todo.style.display = 'flex') : (todo.style.display = 'none');
            });
            break;

        default:
            break;
    }
}

// eventos
todoForm.addEventListener("submit", (e) => {
    // para nao enviar o formulario(pois nao ha backend)
    e.preventDefault();

    const inputValue = todoInput.value; // valor do input

    if (inputValue) { // !isEmpty()?
        // save tudo
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target; // identificar origem do evento
    const parentEl = targetEl.parentElement; //elemento pai
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if(targetEl.classList.contains('finish-todo')) {
        // adicionar/remover classe para tarefa concluida
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove();
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForm();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForm();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForm();
});

serachInput.addEventListener('keyup', (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    serachInput.value = "";
    serachInput.dispatchEvent(new Event("keyup")); // forca evento
});

filterBtn.addEventListener('change', (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});