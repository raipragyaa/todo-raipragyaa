let Item = require('./item.js');

const ToDo = function(title, description,items={}) {
  this.title = title;
  this.description = description;
  this.items = items;
  this.itemKey = 0;
};

ToDo.prototype = {
  getTitle: function() {
    return this.title;
  },
  getDescription: function() {
    return this.description;
  },
  addItem: function(content) {
    this.items[this.itemKey] = new Item(content);
    this.itemKey++;
  },
  deleteItem: function(itemNumber) {
    return delete this.items[itemNumber];
  },
  getItem: function(itemId) {
    return this.items[itemId];
  },
  markDone: function(itemId) {
    let item = this.items[itemId];
    return item.done();
  },
  markAsNotDone: function(itemId) {
    let item = this.items[itemId];
    return item.notDone();
  },
  editItem: function(itemId, newContent) {
    this.items[itemId] = newContent;
    return this.items;
  },
  changeTitle: function(newTitle) {
    this.title = newTitle;
  },
  changeDescription: function(newDescription) {
    this.description = newDescription;
  }
};
module.exports = ToDo;
