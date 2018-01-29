const deleteItem = function(){
  let id =event.target.id;
  let parent = document.getElementById('list')
  let child = document.getElementById(`${id}_${id}`);
  parent.removeChild(child);
  let req = new XMLHttpRequest();
  req.open('POST',"/deleteItem");
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(`itemKey=${id}`)
}

const viewToDo = function(){
  let req = new XMLHttpRequest();
  req.open("POST",'/viewSelectedTodo');
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(`toDoKey=${event.target.id}`);
  location.href = '/displayToDo';
};
