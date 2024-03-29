const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);






function addTodo(event) {
    event.preventDefault()

    //Create To-Do Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-Item');
    todoDiv.appendChild(newTodo);

    //ADD todo TO LOCALSTORGE
    saveLocalTodos(todoInput.value)
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //CLER INPUT VALUE
    todoInput.value = ''; 
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('deleting')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove()
        });
    }

    //Check Mark;
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if(! todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    });
}


function saveLocalTodos(todo) {
    //Check há todo no local storge?
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    //Check há todo no local storge?
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        //Create To-Do Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-Item');
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //Check há todo no local storge?
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos))
}



/*
    Selecionamos todos os elemntos, criamos outros,
    adicionamoes classes e pegamos o valo do input.
    Agora, precisamo que, quando ele pegar o valor do input,
    o campo com o texto seja apagado

    => Para limpa-lo, apenas deixamos o valor como vazio:

    todoInput.value = '';
*/