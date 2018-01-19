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
  getToDoKey: function() {
    return this.toDoKey - 1;
  },
  getItem: function(toDoKey, itemKey) {
    return this.toDos[toDoKey].getItem(itemKey);
  },
  addItems: function(toDoKey, content) {
    this.toDos[toDoKey].addItem(content);
  },
  addToDo: function(toDo) {
    this.toDos[this.toDoKey] = toDo;
    this.toDoKey++;
  },
  deleteToDo: function(toDoKey) {
    delete this.toDos[toDoKey];
  },
  markItemDone: function(toDoKey, itemKey) {
    this.toDos[toDoKey].markDone(itemKey);
  },
  markItemNotDone: function(toDoKey, itemKey) {
    this.toDos[toDoKey].markAsNotDone(itemKey);
  },
  editToDoTitle: function(toDoKey, newTitle) {
    this.toDos[toDoKey].changeTitle(newTitle);
  },
  editToDoDescription: function(toDoKey, newDescription) {
    this.toDos[toDoKey].changeDescription(newDescription);
  },
  editItem: function(toDoKey, itemKey, newContent) {
    this.toDos[toDoKey].editItem(itemKey, newContent);
  },
  deleteItem: function(toDoKey, itemKey) {
    this.toDos[toDoKey].deleteItem(itemKey);
  }
};

module.exports = User;
