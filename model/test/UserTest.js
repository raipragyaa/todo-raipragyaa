let assert = require('chai').assert;
let User = require('../modelWork/user.js');
let ToDoList = require('../modelWork/toDoList.js');

describe('testing User', () => {
  let pragya = new User('pragya');
  describe('User behaviours', () => {
    it('should add toDoList', () => {
      let title = 'todo';
      let description = 'for work';
      pragya.addToDoList(title,description);
      let expected = {
        todo : new ToDoList(title,description)
      }
      assert.deepInclude(pragya.toDoLists, expected);
    })
  })
  it.only('should delete toDoList',()=>{
    let title = 'todo';
    let description = 'for work';
    pragya.addToDoList(title,description);
    let expected = {
      todo : new ToDoList(title,description)
    };
    assert.deepInclude(pragya.toDoLists, expected);
    pragya.deleteList(title);
    assert.deepInclude(pragya.todoLists,{});
  })
});
