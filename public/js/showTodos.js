const showTodos = function() {
  let todoTitles = JSON.parse(this.responseText);
  let todosDiv = document.getElementById("todos");
  let titles = "";
  let counter = 0;
  todoTitles.forEach((title) => {
    counter++;
    titles += `${counter}.${title}<br>`;
  })
  todosDiv.innerHTML = titles;
};

let displayTitles = function() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", showTodos);
  req.open("GET", "/todoLists");
  req.send();
};

window.onload = displayTitles;
