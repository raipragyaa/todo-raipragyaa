const assert = require('chai').assert;
let ToDoList = require('../modelWork/toDoList.js');
let Item = require('../modelWork/item.js');

describe('testing toDoList', () => {
  describe('todo list Properties', () => {
    it('should give title', () => {
      let toDoList = new ToDoList('To Do for work', undefined,undefined);
      let expected = 'To Do for work';
      assert.equal(toDoList.getTitle(), expected);
    })
    it('should give description', () => {
      let toDoList = new ToDoList(undefined, 'this is a ToDo',undefined);
      let expected = 'this is a ToDo';
      assert.equal(toDoList.getDescription(), expected);
    })
  })
  describe('todo list behaviour', () => {
    it('should add item', () => {
      let item = new Item('this is a nice item');
      let itemOne = item.getText();
      let toDoList = new ToDoList('To Do for work', undefined,itemOne);
      toDoList.addItem('firstItem');
      let expected = {
        'firstItem':'this is a nice item'
      };
      assert.deepEqual(toDoList.items,expected);
    })
  })
});
