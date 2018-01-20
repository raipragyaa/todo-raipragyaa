const createButton =function(innerText,onclickOperator,buttonId){
  let button = document.createElement('button');
  button.innerText = innerText;
  button.id = buttonId;
  button.setAttribute('onclick',onclickOperator);
  return button;
};

const createDisplayElements = function(div,count,title,btnId){
  let para = document.createElement('p');
  para.innerText = `${count}.${title}`;
  let viewBtn = createButton('view','viewToDo()',btnId);
  let deleteBtn= createButton('delete','deleteToDo()',btnId);
  para.appendChild(viewBtn)
  para.appendChild(deleteBtn)
  div.appendChild(para)
};

const showTodos = function() {
  let todoTitlesWithId = JSON.parse(this.responseText);
  let todosDiv = document.getElementById("todos");
  let counter = 0;
  let toDoIds = Object.keys(todoTitlesWithId);
  toDoIds.forEach((id) => {
    counter++;
    title = todoTitlesWithId[id];
    createDisplayElements(todosDiv,counter,title,id);
  })
};

let displayTitles = function() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", showTodos);
  req.open("GET", "/todoLists");
  req.send();
};

const deleteToDo = function(){
  let req = new XMLHttpRequest();
  req.open('POST',"/deleteTodo");
  req.send(`toDoKey=${event.target.id}`)
  window.location.reload();
};

const viewToDo = function(){
  let req = new XMLHttpRequest();
  req.open("POST",'/viewTodo');
  req.send(`toDoKey=${event.target.id}`);
  location.href = '/toDoLists';
};


window.onload = displayTitles;
