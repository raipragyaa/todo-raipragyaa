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
  addItem: function(itemNumber,content){
    return this.items[itemNumber] = new Item(content);
  },
  deleteItem: function(itemNumber){
    return delete this.items[itemNumber];
  }
};
module.exports = ToDoList;
