let assert = require('chai').assert;
let User = require('../modelWork/user.js');
let ToDoList = require('../modelWork/toDoList.js');

describe('testing User', () => {
  describe.skip('User behaviours', () => {
    it('should add toDoList', () => {
      let toDoList = new ToDoList('todo', 'for Work', 'go to get milk');
      let user = new User(toDoList);
      user.addToDoList("firstList");
      let expected = {
        "firstList": {
          "title": 'todo',
          "description": 'for Work',
          "item": 'go to get milk',
          "items": {}
        }
      }
      assert.ownInclude(user.toDoLists, expected);
    })
  })
});
