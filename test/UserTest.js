let assert = require('chai').assert;
let User = require('../appModels/user.js');
let ToDoList = require('../appModels/toDoList.js');

describe('testing User', () => {
  let pragya = new User('pragya');
  describe('User properties', () => {
    it('should have name', () => {
      let expected = 'pragya';
      assert.equal(pragya.name, 'pragya')
    })
    it('should have toDoList', () => {
      pragya.addToDoList('todoforWork', 'Important');
      let expected = {
        todoforWork: new ToDoList('todoforWork', 'Important')
      }
      assert.deepInclude(pragya.getToDo(), expected);
    })
    it('should have todo list', () => {
      pragya.addToDoList('todoforWork', 'Important');
      pragya.addToDoList('todoforHome', 'veryImp');
      let expected = {
        todoforWork: new ToDoList('todoforWork', 'Important'),
        todoforHome: new ToDoList('todoforHome', 'veryImp')
      }
      assert.deepInclude(pragya.getToDo(), expected);
    })
  })
  describe('User behaviours', () => {
    it('should add toDoList', () => {
      let title = 'todo';
      let description = 'for work';
      pragya.addToDoList(title, description);
      let expected = {
        todo: new ToDoList(title, description)
      }
      assert.deepInclude(pragya.toDoLists, expected);
    })
  })
  it('should delete toDoList', () => {
    let title = 'todo';
    let description = 'for work';
    pragya.addToDoList(title, description);
    let expected = {
      todo: new ToDoList(title, description)
    };
    assert.deepInclude(pragya.toDoLists, expected);
    pragya.deleteList(title);
    assert.deepInclude(pragya.todoLists, {});
  })
});
