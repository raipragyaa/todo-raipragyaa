let ToDo = require('./toDo.js');
let Item = require('./item.js');

const User = function(name,toDos={}) {
  this.name = name;
  this.toDos = toDos;
  this.toDoKey = 0;
};

User.prototype = {
  getName: function() {
    return this.name;
  },
  getToDos: function(){
    return this.toDos;
  },
  getToDo: function(toDoKey) {
    return this.toDos[toDoKey];
  },
  getIdOfList: function(){
    return this.toDoKey;
  },
  addToDo: function(title, description) {
    this.toDos[this.toDoKey] = new ToDo(title, description);
    this.toDoKey++;
  },
  deleteList: function(toDoKey) {
    return delete this.toDos[toDoKey];
  },
  markAsDone: function(content) {
    let item = new Item(content);
    return item.done();
  },
  markAsNotDone: function(content) {
    let item = new Item(content)
    return item.notDone();
  },
  editToDoTitle: function(toDoKey,newTitle){
    return this.toDos[toDoKey].changeTitle(newTitle);
  },
  editToDoDescription: function(toDoKey,newDescription){
    return this.toDos[toDoKey].changeDescription(newDescription);
  }
};

module.exports = User;
