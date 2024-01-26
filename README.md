# JavaScript Tips & Tricks

<details>
<summary>Table of contents</summary>

- [Create multiple elements in vanilla JavaScript from an array with objects.](#create-multiple-elements-in-vanilla-javascript-from-an-array-with-objects)

- [Local Storage](#local-storage)

  - [Breakdown of Local Storage](#breakdown-of-local-storage)
  - [Interacting with Local Storage using JavaScript](#interacting-with-local-storage-using-javascript)
  - [Setting data](#setting-data)
  - [Getting data](#getting-data)
  - [Removing data](#removing-data)
  - [Clearing all data](#clearing-all-data)
  - [Handling errors](#handling-errors)
  - [Events](#events)
  - [Conclusion](#conclusion)

- [Ternary Operation](#ternary-operation)

</details>

---

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

// I use the map function in order to modify each element in the array and return that modified element into a new array.

const defaultTodosAsHtml = defaultTodos.map((todo) => {
  return createTodoItemAsHtml(todo);
});
```

Now that we have an array with html as strings we can just add that to the DOM with a couple of different methods. `insertAdjecentHTML`and `innerHTML` among others. I will use `innerHTML` in this case.

`innerHTML` sets the inner html of an element, but it also allowes the value to be html as a string. We don't have a string yet, we just have an array of string. Which means, we need to convert to array to a string.

```js
const htmlString = defaultTodosAsHtml.join("");
```

Then we set the inner html on the todo list with this html string

```js
const todoList = document.querySelector(".todo-list");
todoList.innerHTML = htmlString;
```

[Back to top](#javascript-tips--tricks)

---

### Local Storage

Local Storage is a web storage solution provided by web browsers to allow websites to store data persistently on a user's device. It provides a simple key-value store and is a part of the Web Storage API along with sessionStorage.

You can manually see what's in the `localStorage` by going to the inspector tools in your browser, click on the 'application' tab and then click on the Local storage option in the list.

#### Breakdown of Local Storage

1. **Persistence**:
   Local Storage is persistent, meaning the data stored in it remains even when the user closes the browser window or navigates away from the page. It is not limited by session duration.

2. **Capacity**:
   Local Storage provides more storage capacity (typically 5-10 MB) compared to sessionStorage, which is limited to the current session.

3. **Scope**:
   The stored data is associated with the origin (protocol, host, and port) of the website. This means that data stored by one website cannot be accessed by another, preserving user privacy.

4. **Key-Value Storage**:
   Data is stored in a key-value pair format. You can store strings as values, but if you need to store complex data structures, you should serialize them to JSON before storing.

#### Serializing to JSON

Since the `localStorage` only accepts strings as value it is necessary to convert more complex values, such as objects, to strings before trying to save it to `localStorage`. There exists two methods in JavaScript that helps us out with this challenge.

`JSON.stringify(value) => string`

and

`JSON.parse(string) => value`

```js
const person = {
  name: "Niklas Fähnrich",
  profession: "Developer",
  level: "100",
};

const personAsString = JSON.stringify(person);
console.log(personAsString);

/* Output:
  '{"name":"Niklas Fähnrich","profession":"Developer","level":"100"}'
*/

const personObject = JSON.parse(personAsString);
console.log(personObject):

/* Output:
  {
    name:"Niklas Fähnrich",
    profession:"Developer",
    level:"100"
  }
*/
```

As you can see, when you stringify something it will be converted to a string, and that string we can easily save in local storage. If we want to get it back, we just get it and parse it back and it will be converted back to the object as it was before.

[Back to top](#javascript-tips--tricks)

#### Interacting with Local Storage using JavaScript

The `localStorage` objects is actually located on the `window` object but because of that you don't need to explicitly type that out. Just `localStorage` is sufficient.

#### Setting Data

To store data in Local Storage, you use the setItem method, providing a key-value pair.

```js
localStorage.setItem("username", "JohnDoe");
```

#### Getting Data

To retrieve data, you use the getItem method, specifying the key.

```js
const username = localStorage.getItem("username");
console.log(username); // Outputs: JohnDoe
```

#### Removing Data

You can remove a specific item using the removeItem method.

```js
localStorage.removeItem("username");
```

#### Clearing All Data

To remove all items stored in Local Storage for the current origin, you use the clear method.

```js
localStorage.clear();
```

#### Handling Errors

It's good practice to handle errors, especially if the user's browser has disabled Local Storage or if the quota is exceeded.

```js
try {
  localStorage.setItem("key", "value");
} catch (e) {
  // Handle the exception
  console.error("Local Storage is not available or the quota is exceeded.");
}
```

#### Events

You can also listen for storage events to react when Local Storage changes from another window or tab.

```js
window.addEventListener("storage", function (event) {
  // Handle the storage event
  console.log(`Storage event: ${event.key} has been changed from another window/tab.`);
});
```

#### Conclusion

Remember, while Local Storage is a convenient way to store small amounts of data on the client-side, it's not suitable for sensitive information due to its accessibility from client-side scripts. For more secure storage, consider using server-side solutions or technologies like HTTP cookies with proper security measures.

[Back to top](#javascript-tips--tricks)

---

### Ternary Operation

A ternary operation is a shorthand way of writing an `if-else` statement. It's a concise way to express a conditional statement with a single line of code. The syntax of a ternary operation looks like this:

```js
condition ? expression_if_true : expression_if_false;
```

#### Breakdown of each part

- `condition`: This is the test or condition that you want to evaluate. If the condition is true, the expression before the `:` (colon) is executed; otherwise, the expression after the `:` is executed.

- `expression`: It's simply a piece of code that evaluates to a value. An expression can be as simple as a single variable, a literal value or a more complex computation that results in a value.

- `expression_if_true`: This is the value or code that is executed if the condition is true.

- `expression_if_false`: This is the value or code that is executed if the condition is false.

Here is a simple example:

```js
let isRaining = true;

// Ternary operation
let weather = isRaining ? "Bring an umbrella" : "Enjoy the sunshine";

console.log(weather); // Bring an umbrella
```

Ternary operations are useful when you want to write a concise and short piece of code to handle conditional expressions. They are often used in situations where the `if-else` statement is too much for a simple condition.

Ternary operations are important to use in order to maintain code readability. While they can make code concise, overly complex or nested ternary operations can make code hard to understand. Simplicity is the key here.

[Back to top](#javascript-tips--tricks)
