const form = document.querySelector("form");
const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const TODOS = "todos";
let todos;

const rawTodos = localStorage.getItem(TODOS);

if (!rawTodos) {
  todos = 
  console.log("No saved todos");
} else {
  todos = JSON.parse(rawTodos);
  const todosHTML = todos.map((todo) => createTodo(todo)).join("");
  todoList.innerHTML = todosHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = input.value;

  todos.unshift(newTodo);
  localStorage.setItem(TODOS, JSON.stringify(todos));

  const newTodoHTML = createTodo(newTodo);
  todoList.insertAdjacentHTML("afterbegin", newTodoHTML);
  input.value = "";
});

function createTodo(todo) {
  return /*html*/ `
  <article>
    <span>${todo}</span>
  </article>
  `;
}
