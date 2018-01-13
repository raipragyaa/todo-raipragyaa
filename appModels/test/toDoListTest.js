const assert = require('chai').assert;
let ToDoList = require('../models/toDoList.js');
let Item = require('../models/item.js');

describe('testing toDoList', () => {
  describe('todo list Properties', () => {
    it('should give title', () => {
      let toDoList = new ToDoList('To Do for work', undefined, undefined);
      let expected = 'To Do for work';
      assert.equal(toDoList.getTitle(), expected);
    })
    it('should give description', () => {
      let toDoList = new ToDoList(undefined, 'this is a ToDo', undefined);
      let expected = 'this is a ToDo';
      assert.equal(toDoList.getDescription(), expected);
    })
  })
  describe('todo list behaviour', () => {
    it('should add item', () => {
      let toDoList = new ToDoList('To Do for work', undefined);
      toDoList.addItem('1', 'goodBye');
      let expected = {
        1: new Item('goodBye')
      };
      assert.deepInclude(toDoList.items, expected);
    })
    it('should delet item',()=>{
      let toDoList = new ToDoList('To Do for work', 'good');
      toDoList.addItem('1', 'goodBye');
      let expected = {
        1: new Item('goodBye')
      };
      assert.deepInclude(toDoList.items, expected);
      toDoList.deleteItem('1');
      assert.deepInclude(toDoList.items,{});
    })
  })
});
