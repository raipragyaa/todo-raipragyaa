const Item = function(content = '') {
  this.content = content;
  this.status = true;
};

Item.prototype = {
  getContent: function() {
    return this.content;
  },
  done: function() {
    return this.status ;
  },
  notDone: function(){
    return this.status = false;
  }
};

module.exports = Item;
