# JavaScript Tips & Tricks

<details>
<summary>Table of contents</summary>

- [Create multiple elements in vanilla JavaScript from an array with objects.](#create-multiple-elements-in-vanilla-javascript-from-an-array-with-objects)
</details>

### Create multiple elements in vanilla JavaScript from an array with objects.

Let say we have this array with objects in our application:

```js
const defaultTodos = [
  { author: "Niklas", text: "Clean the bathroom" },
  { author: "Niklas", text: "Do 15 push-ups" },
  { author: "Niklas", text: "Do the laundry" },
];
```

Instead of creating one html element for each element in the array in the index.html file, you could just create a function that creates html for you and use some sort of loop in the array to invoke this function on every element in the array. In the end you could just add that to the DOM via JavaScript.

Imagine having this in your html:

```html
<section class="todo-list">
  <article class="todo-item">
    <div class="content">
      <span class="text">Clean the bathroom</span>
      <span class="author">Niklas</span>
    </div>
    <div class="action-icons">
      <span>Delete</span>
      <span>Done</span>
    </div>
  </article>

  <article class="todo-item">
    <div class="content">
      <span class="text">Clean the bathroom</span>
      <span class="author">Niklas</span>
    </div>
    <div class="action-icons">
      <span>Delete</span>
      <span>Done</span>
    </div>
  </article>

  <article class="todo-item">
    <div class="content">
      <span class="text">Clean the bathroom</span>
      <span class="author">Niklas</span>
    </div>
    <div class="action-icons">
      <span>Delete</span>
      <span>Done</span>
    </div>
  </article>
</section>
```

This is a lot of html just for creating your default todos every time you refresh your browser.

Instead we want something like this:

```html
<section class="todo-list"></section>
```

This is very clean and gives us a anchor point to inject html dynamically.

First we could use some function that creates a todo item for us.

```js
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
```

This function takes a todo item as an argument and returns a html string to us.

This function can now be applied to our array with todo items. Instead of an array with todo items, we want an array with html elements as strings.

```js
const defaultTodos = [
  { author: "Niklas", text: "Clean the bathroom" },
  { author: "Niklas", text: "Do 15 push-ups" },
  { author: "Niklas", text: "Do the laundry" },
];

// I use the map function in order to modify each element in the array and returns that modified element into a new array.

const defaultTodosAsHtml = defaultTodos.map((todo) => {
  return createTodoItemAsHtml(todo);
});
```

Now that we have an array with html as strings we can just add that to the DOM with a couple of different methods. `insertAdjecentHTML`and `innerHTML` among others. I will use `innerHTML` in this case.

`innerHTML` sets the inner html of an element, but it also allowes the value to be html as a string. We don't have a strin yet, we just have an array of string. Which means, we need to convert to array to a string.

```js
const htmlString = defaultTodosAsHtml.join("");
```

Then we set the inner html on the todo list with this html tring

```js
const todoList = document.querySelector(".todo-list");
todoList.innerHTML = htmlString;
```
