const Item = function(content = '') {
  this.content = content;
  this.status = true;
};

Item.prototype = {
  getContent: function() {
    return this.content;
  },
  addText: function(word) {
    return this.content += ' ' + word;
  },
  markAsDone: function() {
    this.status = true;
  },
  markAsNotDone: function(){
    this.status = false;
  }
};

module.exports = Item;
