let assert = require('chai').assert;
let User = require('../appModels/user.js');
let ToDo  = require('../appModels/toDo.js');

describe('testing User', () => {
  describe('User properties', () => {
    let pragya = new User('pragya');
    it('should have name', () => {
      let expected = 'pragya';
      assert.equal(pragya.name, 'pragya')
    })
    it('should have one toDoList', () => {
      pragya.addToDo('todoforWork', 'Important');
      let expected = {
        0: new ToDo('todoforWork', 'Important')
      }
      assert.deepEqual(pragya.getToDos(), expected);
    })
    it('should have todo lists', () => {
      let priya = new User('priya');
      priya.addToDo('to', 'rtant');
      priya.addToDo('todoforHome', 'veryImp');
      let expected = {
        0: new ToDo('to', 'rtant'),
        1: new ToDo('todoforHome', 'veryImp')
      }
      assert.deepEqual(priya.getToDos(), expected);
    })
    it('all lists have unique id', () => {
      let ravindar = new User('ravindar');
    })
  })
  describe('User behaviours', () => {
    it('should add toDoList', () => {
      let sayima = new User('Sayima');
      let title = 'todo';
      let description = 'for work';
      sayima.addToDo(title, description);
      let expected = {
        0: new ToDo(title, description)
      }
      assert.deepInclude(sayima.getToDos(), expected);
    })
  })
  it('should delete toDoList', () => {
    let arvind = new User('arvind');
    let title = 'todo';
    let description = 'for work';
    arvind.addToDo(title, description);
    let expected = {
      0: new ToDo(title, description)
    };
    assert.deepInclude(arvind.getToDos(), expected);
    arvind.deleteList(0);
    assert.deepInclude(arvind.todoLists, {});
  })
  describe('user can edit',()=>{
    let joy = new User('joy');
    let title = 'home';
    let description = 'many works to do';
    joy.addToDo(title,description);
    it('user can edit title of a todo',()=>{
      assert.equal(joy.getToDo(0).title, 'home');
      joy.editToDoTitle(0,'homeStuff');
      assert.equal(joy.getToDo(0).title, 'homeStuff');
    })
    it('user can edit description of todo',()=>{
      assert.equal(joy.getToDo(0).description,'many works to do');
      joy.editToDoDescription(0,'some works done');
      assert.equal(joy.getToDo(0).description,'some works done');
    })
  })
});
