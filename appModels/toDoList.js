let Item = require('./item.js');

const ToDoList = function(title, description) {
  this.title = title;
  this.description = description;
  this.items = {};
  this.userItemId = 0;
};

ToDoList.prototype = {
  getTitle: function() {
    return this.title;
  },
  getDescription: function() {
    return this.description;
  },
  addItem: function(content) {
    this.items[this.userItemId] = new Item(content);
    this.userItemId++;
    return this.userItemId - 1;
  },
  deleteItem: function(itemNumber) {
    return delete this.items[itemNumber];
  }
};
module.exports = ToDoList;
