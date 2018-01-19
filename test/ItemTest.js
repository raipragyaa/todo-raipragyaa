const assert = require('chai').assert;
let Item = require('../appModels/item.js');

describe('testing Item', () => {
  let item = new Item('this is a')
  describe('item behaviour', () => {
    it('should get Contents', () => {
      let expected = 'this is a';
      assert.equal(item.getContent(), expected);
    })
    it('should mark as notdone', () => {
      item.notDone();
      assert.isNotOk(item.status);
    })
    it('should mark as done', () => {
      item.done();
      assert.isOk(item.status);
    })
  })
});
