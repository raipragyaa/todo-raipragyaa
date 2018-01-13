let ToDoList = require('./toDoList.js');

const User = function(name){
  this.name = name;
  this.toDoLists = {};
};

User.prototype = {
  addToDoList: function(title,description){
    return this.toDoLists[title] = new ToDoList(title,description) ;
  },
  deleteList: function(title){
    return delete this.toDoLists[title];
  }
};

module.exports = User;
