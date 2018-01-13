let assert = require('chai').assert;
let User = require('../modelWork/user.js');
let ToDoList = require('../modelWork/toDoList.js');

describe('testing User', () => {
  describe('User behaviours', () => {
    it('should add toDoList', () => {
      let pragya = new User('prgya');
      let title = 'todo';
      let description = 'for work';
      pragya.addToDoList(title,description);
      let expected = {
        todo : new ToDoList(title,description)
      }
      assert.deepInclude(pragya.toDoLists, expected);
    })
  })
});
