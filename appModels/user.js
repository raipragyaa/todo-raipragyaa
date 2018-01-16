let ToDo = require('./toDo.js');
let Item = require('./item.js');

const User = function(name, toDos = {}) {
  this.name = name;
  this.toDos = toDos;
  this.toDoKey = 0;
};

User.prototype = {
  getName: function() {
    return this.name;
  },
  getToDos: function() {
    return this.toDos;
  },
  getToDo: function(toDoKey) {
    return this.toDos[toDoKey];
  },
  getIdOfList: function() {
    return this.toDoKey;
  },
  getItem: function(toDoKey, itemKey) {
    return this.toDos[toDoKey].getItem(itemKey);
  },
  addItems: function(toDoKey, content) {
    return this.toDos[toDoKey].addItem(content);
  },
  addToDo: function(title, description) {
    this.toDos[this.toDoKey] = new ToDo(title, description);
    this.toDoKey++;
  },
  deleteList: function(toDoKey) {
    return delete this.toDos[toDoKey];
  },
  markItemDone: function(toDoKey, itemKey) {
    return this.toDos[toDoKey].markDone(itemKey);
  },
  markItemNotDone: function(toDoKey, itemKey) {
    return this.toDos[toDoKey].markAsNotDone(itemKey);
  },
  editToDoTitle: function(toDoKey, newTitle) {
    return this.toDos[toDoKey].changeTitle(newTitle);
  },
  editToDoDescription: function(toDoKey, newDescription) {
    return this.toDos[toDoKey].changeDescription(newDescription);
  },
  editItem: function(toDoKey, itemKey, newContent) {
    return this.toDos[toDoKey].editItem(itemKey, newContent);
  },
  deleteItem: function(toDoKey, itemKey) {
    return this.toDos[toDoKey].deleteItem(itemKey);
  }
};

module.exports = User;
