const assert = require('chai').assert;
let ToDo = require('../appModels/toDo.js');
let Item = require('../appModels/item.js');

describe('testing toDoList', () => {
  describe('todo list Properties', () => {
    it('should give title', () => {
      let toDoList = new ToDo('To Do for work', undefined, undefined);
      let expected = 'To Do for work';
      assert.equal(toDoList.getTitle(), expected);
    })
    it('should give description', () => {
      let toDoList = new ToDo(undefined, 'this is a ToDo', undefined);
      let expected = 'this is a ToDo';
      assert.equal(toDoList.getDescription(), expected);
    })
  })
  describe('todo list behaviour', () => {
    it('should add item', () => {
      let toDoList = new ToDo('To Do for work', undefined);
      toDoList.addItem(new Item('goodBye'));
      let expected = {
        0: new Item('goodBye')
      };
      assert.deepInclude(toDoList.items, expected);
    })
    it('should delet item', () => {
      let toDoList = new ToDo('To Do for work', 'good');
      toDoList.addItem(new Item('goodBye'));
      let expected = {
        0: new Item('goodBye')
      };
      assert.deepInclude(toDoList.items, expected);
      toDoList.deleteItem('1');
      assert.deepInclude(toDoList.items, {});
    })
  })
  it('can mark a item done', () => {
    let toDoList = new ToDo('To Do for work', 'good');
    toDoList.addItem(new Item('This is important'));
    toDoList.markDone(0);
    assert(toDoList.items[0].status);
  })
  it('can mark a item as not done', () => {
    let toDoList = new ToDo('To Do for work', 'good');
    toDoList.addItem(new Item('This is important'));
    toDoList.markAsNotDone(0);
    assert.isNotOk(toDoList.items[0].status);
  })
  it('item can be edited', () => {
    let myToDo = new ToDo('To Do for work', 'good');
    myToDo.addItem(new Item('I have to complete toDo App'));
    let expected = new Item('I have to complete toDo App');
    assert.deepEqual(myToDo.getItem(0), expected);
    myToDo.editItem(0, 'I have completed login feature');
    expected = new Item('I have completed login feature');
    assert.deepEqual(myToDo.items[0], expected.content);
  })
});
