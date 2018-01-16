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
  done: function() {
    this.status = true;
  },
  notDone: function(){
    this.status = false;
  }
};

module.exports = Item;
