const defaultTodos = [{
    title: 'Call friend',
    dueDate: '2021-10-04',
    id: "id1"
}, {
    title: 'Wash car',
    dueDate: '2021-12-04',
    id: "id2"
}, {
    title: 'Make homework',
    dueDate: '2021-11-04',
    id: "id3"
}];

const savedTodos = JSON.parse(localStorage.getItem("todos"));

const state = {
    todos: savedTodos.length ? savedTodos : defaultTodos
}

const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const render = (todos) => {
    document.getElementById("todo-list").innerHTML = "";

    todos.forEach((todo) => {
        const element = document.createElement("div");
        element.classList.add('todo-content');

        if (todo.isEditing === true) {

            const textBox = document.createElement("input");
            textBox.classList.add('textInp');
            textBox.type = "text";
            textBox.id = 'title' + todo.id;
            element.appendChild(textBox);

            const datePicker = document.createElement("input");
            datePicker.classList.add('date');
            datePicker.type = "date";
            datePicker.id = "date" + todo.id;
            element.appendChild(datePicker);

            const updateBtn = document.createElement("button");
            updateBtn.classList.add('btn');
            updateBtn.dataset.todoId = todo.id;
            updateBtn.innerText = "Update";
            updateBtn.onclick = onUpdate;
            element.appendChild(updateBtn);


        } else {
            const todoText = document.createElement('p');
            todoText.innerText = todo.title + " " + todo.dueDate;
            todoText.classList.add('todoText')
            element.append(todoText);
            let editBtn = document.createElement("button");
            editBtn.classList.add('btn');
            editBtn.innerText = "Edit";
            editBtn.style = "margin-left: 12px"
            editBtn.onclick = onEdit;
            editBtn.dataset.todoId = todo.id;
            element.appendChild(editBtn)

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add('btn');
            deleteBtn.innerText = "Delete";
            deleteBtn.style = "margin-left: 12px"
            deleteBtn.onclick = onDelete(todo);
            element.appendChild(deleteBtn);

        }

        const todoList = document.getElementById("todo-list");
        todoList.appendChild(element);
    })
}

const createTodo = (title, dueDate) => {
    if (!title) return;
    let id = "" + new Date().getTime();

    state.todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos(state.todos)
    render(state.todos);
}

const removeTodo = (idToDelete) => {
    state.todos = state.todos.filter(todo => todo.id !== idToDelete.id);
    saveTodos(state.todos)
    render(state.todos);
}



const setEditing = (todoId) => {
    state.todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.isEditing = true;
        }
    });
    saveTodos(state.todos);
    render(state.todos);
}

const updateTodo = (todoId, newTitle, newDate) => {
    state.todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
        }
    });

    saveTodos(state.todos)
    render(state.todos);
}


const addTodo = () => {
    const textbox = document.getElementById("txt");
    const title = textbox.value;
    const datePicker = document.getElementById("datePicker")
    const dueDate = datePicker.value;

    createTodo(title, dueDate);
}



const onDelete = (todoToDelete) => {
    return () => removeTodo(todoToDelete);
}



const onEdit = (event) => {
    const updateButton = event.target;
    const todoId = updateButton.dataset.todoId;

    setEditing(todoId);
}

const onUpdate = (event) => {
    const updateButton = event.target;
    const todoId = updateButton.dataset.todoId;

    const textbox = document.getElementById("title" + todoId);
    const newTitle = textbox.value;

    const datePicker = document.getElementById("date" + todoId);
    const newDate = datePicker.value;


    updateTodo(todoId, newTitle, newDate);
}

document.querySelector(".add-todo").addEventListener("click", addTodo)
render(state.todos);


