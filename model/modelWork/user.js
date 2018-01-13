let ToDoList = require('./toDoList.js');

const User = function(name){
  this.name = name;
  this.toDoLists = {};
};

User.prototype = {
  getName: function(){
    return this.name;
  },
  getToDo: function(){
    return this.toDoLists;
  },
  addToDoList: function(title,description){
    return this.toDoLists[title] = new ToDoList(title,description) ;
  },
  deleteList: function(title){
    return delete this.toDoLists[title];
  },
};

module.exports = User;
