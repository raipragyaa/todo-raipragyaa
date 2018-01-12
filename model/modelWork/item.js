const Item = function(text=''){
  this.text = text;
};

Item.prototype = {
  getText: function(){
    return this.text;
  },
  addText : function(word){
    return this.text+=' '+word;
  }
};

module.exports = Item;
