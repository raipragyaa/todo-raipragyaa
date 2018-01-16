let assert = require('chai').assert;
let User = require('../appModels/user.js');
let ToDoList = require('../appModels/toDoList.js');

describe('testing User', () => {
  describe('User properties', () => {
    let pragya = new User('pragya');
    it('should have name', () => {
      let expected = 'pragya';
      assert.equal(pragya.name, 'pragya')
    })
    it('should have one toDoList', () => {
      pragya.addToDoList('todoforWork', 'Important');
      console.log(pragya);
      let expected = {
        0 : new ToDoList('todoforWork', 'Important')
      }
      assert.deepEqual(pragya.getToDo(), expected);
    })
    it('should have two todo lists', () => {
      let priya = new User('priya');
      priya.addToDoList('to', 'rtant');
      priya.addToDoList('todoforHome', 'veryImp');
      let expected = {
        0 : new ToDoList('to', 'rtant'),
        1 : new ToDoList('todoforHome', 'veryImp')
      }
      assert.deepEqual(priya.getToDo(), expected);
    })
  })
  describe('User behaviours', () => {
    it('should add toDoList', () => {
      let sayima = new User('Sayima');
      let title = 'todo';
      let description = 'for work';
      sayima.addToDoList(title, description);
      let expected = {
        0 : new ToDoList(title, description)
      }
      assert.deepInclude(sayima.getToDo(), expected);
    })
  })
  it('should delete toDoList', () => {
    let arvind = new User('arvind');
    let title = 'todo';
    let description = 'for work';
    arvind.addToDoList(title, description);
    let expected = {
      0 : new ToDoList(title, description)
    };
    assert.deepInclude(arvind.getToDo(), expected);
    arvind.deleteList(0);
    assert.deepInclude(arvind.todoLists, {});
  })
});
