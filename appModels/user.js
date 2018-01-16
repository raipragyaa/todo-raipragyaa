let ToDoList = require('./toDoList.js');
let Item = require('./item.js');

const User = function(name) {
  this.name = name;
  this.toDoLists = {};
  this.listId = 0;
};

User.prototype = {
  getName: function() {
    return this.name;
  },
  getToDo: function() {
    return this.toDoLists;
  },
  addToDoList: function(title, description) {
    this.toDoLists[this.listId] = new ToDoList(title, description);
    console.log(this.listId,'========');
    this.listId++;
  },
  deleteList: function(listId) {
    return delete this.toDoLists[listId];
  },
  markAsDone: function(content) {
    let item = new Item(content);
    return item.done();
  },
  markAsNotDone: function(content) {
    let item = new Item(content)
    return item.notDone();
  }
};

module.exports = User;
