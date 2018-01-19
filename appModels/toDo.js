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
  addItem: function(item) {
    this.items[this.itemKey] = item;
    this.itemKey++;
  },
  deleteItem: function(itemKey) {
    return delete this.items[itemKey];
  },
  getItem: function(itemKey) {
    return this.items[itemKey];
  },
  markDone: function(itemKey) {
    let item = this.items[itemKey];
    return item.done();
  },
  markAsNotDone: function(itemKey) {
    let item = this.items[itemKey];
    return item.notDone();
  },
  editItem: function(itemKey, newContent) {
    this.items[itemKey] = newContent;
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
