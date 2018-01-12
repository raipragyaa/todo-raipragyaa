const Item = function(text){
  this.text = text;
};

Item.prototype = {
  addText : function(text){
    return this.text+=' '+text;
  }
};

module.exports = Item;
