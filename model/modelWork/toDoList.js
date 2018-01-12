
const ToDoList = function(title,description,item){
  this.title = title;
  this.description = description;
  this.item = item;
  this.items = {};
};

ToDoList.prototype = {
  getTitle: function(){
    return this.title;
  },
  getDescription: function(){
    return this.description;
  },
  addItem: function(itemCounter){
    return this.items[itemCounter] = this.item;
  },
};
module.exports = ToDoList;
