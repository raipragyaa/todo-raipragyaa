const Item = function(content = '') {
  this.content = content;
  this.status = false;
};

Item.prototype = {
  getContent: function() {
    return this.content;
  },
  done: function() {
    return this.status = true ;
  },
  notDone: function(){
    return this.status;
  }
};

module.exports = Item;
