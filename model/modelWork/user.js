const User = function(todoList){
  this.toDoList = todoList;
  this.toDoLists = {};
};

User.prototype = {
  addToDoList: function(listTitle){
    return this.toDoLists[listTitle] = this.toDoList;
  },
  deleteList: function(listTitle){
    return delete this.toDoLists[listTitle];
  }
};

module.exports = User;
