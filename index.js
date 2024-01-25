const defaultTodos = [
  { author: "Niklas", text: "Clean the bathroom" },
  { author: "Niklas", text: "Do 15 push-ups" },
  { author: "Niklas", text: "Do the laundry" },
];

// Function to convert todo item to html
function createTodoItemAsHtml(todoItem) {
  return `
    <article class="todo-item">
      <div class="content">
        <span class="text">${todoItem.text}</span>
        <span class="author">${todoItem.author}</span>
      </div>
      <div class="action-icons">
        <span>Delete</span>
        <span>Done</span>
      </div>
    </article>
`;
}

// Create an array of html strings from an array with objects
const defaultTodosAsHtml = defaultTodos.map((todo) => {
  return createTodoItemAsHtml(todo);
});

// Convert the array to a string and then add it to the dom.
const htmlString = defaultTodosAsHtml.join("");
const todoList = document.querySelector(".todo-list");
todoList.innerHTML = htmlString;
