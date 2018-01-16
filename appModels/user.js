let ToDoList = require('./toDoList.js');
let Item = require('./item.js');

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
  markAsDone: function(content){
    let item = new Item(content);
    item.done();
  },
  markAsNotDone: function(content){
    let item = new Item(content)
    item.notDone();
  }
};

module.exports = User;
