const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete Elements
function deleteToDo(event) {
    const deleteLi = event.target.parentElement;       //remove on HTML
    deleteLi.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(deleteLi.id)); //remove on Local storage
    saveTodos();
} 

// make Elements
function paintToDo(myToDo) {
    const addLi = document.createElement("li");
    addLi.id = myToDo.id;
    const addSpan = document.createElement("span");
    addSpan.innerText = myToDo.text;
    const addButton = document.createElement("button");
    addButton.innerText = "X";
    addButton.addEventListener("click", deleteToDo);
    addLi.appendChild(addSpan);
    addLi.appendChild(addButton);
    toDoList.appendChild(addLi);
}

// get, print, save value
function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);   //not array

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);     //array
    toDos = parsedToDos;                            //prevent reset
    parsedToDos.forEach(paintToDo);
}