let Item = require('./item.js');

const ToDoList = function(title,description){
  this.title = title;
  this.description = description;
  this.items = {};
};

ToDoList.prototype = {
  getTitle: function(){
    return this.title;
  },
  getDescription: function(){
    return this.description;
  },
  addItem: function(itemCounter,content){
    return this.items[itemCounter] = new Item(content);
  },
};
module.exports = ToDoList;
