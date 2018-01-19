const showTodos = function() {
  let todoTitles = JSON.parse(this.responseText);
  let todosDiv = document.getElementById("todos");
  let counter = 0;
  todoTitles.forEach((title) => {
    counter++;
    let para = document.createElement('p');
    let viewBtn = document.createElement('button');
    viewBtn.innerHTML = 'view';
    viewBtn.setAttribute('onclick','viewToDo()')
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'delete';
    deleteBtn.setAttribute('onclick','deleteToDo()')
    para.innerText = `${counter}.${title}`
    para.appendChild(viewBtn)
    para.appendChild(deleteBtn)
    todosDiv.appendChild(para)
  })
};

let displayTitles = function() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", showTodos);
  req.open("GET", "/todoLists");
  req.send();
};

window.onload = displayTitles;
