const assert = require('chai').assert;
let Item = require('../modelWork/item.js');

describe('testing Item',()=>{
  let item = new Item('this is a')
  describe('item behaviour',()=>{
    it('should add text',()=>{
      let expected = 'this is a item';
      assert.equal(item.addText('item'),expected);
    })
  })
  it('should getText',()=>{
    let expected = 'this is a';
    assert.equal(item.getText(),expected);
  })
});
