let assert = require('chai').assert;
let User = require('../appModels/user.js');
let ToDo = require('../appModels/toDo.js');
let Item = require('../appModels/item.js')

describe('testing User', () => {
  describe('User properties', () => {
    let pragya = new User('pragya');
    it('should have name', () => {
      let expected = 'pragya';
      assert.equal(pragya.getName(), 'pragya')
    })
    it('should have one toDoList', () => {
      pragya.addToDo(new ToDo('todoforWork', 'Important'));
      let expected = {
        0: new ToDo('todoforWork','Important')
      }
      assert.deepEqual(pragya.getToDos(), expected);
    })
    it('should have todo lists', () => {
      let priya = new User('priya');
      priya.addToDo(new ToDo('to', 'rtant'));
      priya.addToDo(new ToDo('todoforHome', 'veryImp'));
      let expected = {
        0: new ToDo('to', 'rtant'),
        1: new ToDo('todoforHome', 'veryImp')
      }
      assert.deepEqual(priya.getToDos(), expected);
      assert.equal(priya.getToDoKey(),1)
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
      sayima.addToDo(new ToDo(title, description));
      let expected = {
        0: new ToDo(title, description)
      }
      assert.deepEqual(sayima.getToDos(), expected);
    })
  })
  it('should delete toDoList', () => {
    let arvind = new User('arvind');
    let title = 'todo';
    let description = 'for work';
    arvind.addToDo(new ToDo(title, description));
    let expected = {
      0: new ToDo(title, description)
    };
    assert.deepEqual(arvind.getToDos(), expected);
    arvind.deleteToDo(0);
    assert.deepEqual(arvind.getToDos(), {});
  })
  describe('user can edit', () => {
    let joy = new User('joy');
    let title = 'home';
    let description = 'many works to do';
    let todoId = 0
    joy.addToDo(new ToDo(title, description));
    it('user can edit title of a todo', () => {
      assert.equal(joy.getToDo(todoId).title, 'home');
      joy.editToDoTitle(todoId, 'homeStuff');
      assert.equal(joy.getToDo(todoId).title, 'homeStuff');
    })
    it('user can edit description of todo', () => {
      assert.equal(joy.getToDo(0).description, 'many works to do');
      joy.editToDoDescription(0, 'some works done');
      assert.equal(joy.getToDo(0).description, 'some works done');
    })
  })
  describe('user can add item', () => {
    it('user can add a item in a todo', () => {
      let sulagna = new User('sulagna');
      let title = 'home';
      let description = 'many works to do';
      sulagna.addToDo(new ToDo(title, description));
      sulagna.addItems(0, new Item('first write your thoughts on paper'))
      assert.equal(sulagna.getItem(0, 0).content, 'first write your thoughts on paper');
    })
  })
  describe('user can edit item', () => {
    it('user can edit a item in a todo', () => {
      let sulagna = new User('sulagna');
      let title = 'home';
      let description = 'many works to do';
      sulagna.addToDo(new ToDo(title, description));
      sulagna.addItems(0, new Item('first write your thoughts on paper'));
      assert.equal(sulagna.getItem(0, 0).content, 'first write your thoughts on paper');
      sulagna.editItem(0, 0, 'I have completed some features');
      assert.equal(sulagna.getItem(0, 0), 'I have completed some features');
    })
  })
  describe('user can mark items', () => {
    it('user can mark a item as done', () => {
      let sulagna = new User('sulagna');
      let title = 'home';
      let description = 'many works to do';
      sulagna.addToDo(new ToDo(title, description));
      sulagna.addItems(0, new Item('first write your thoughts on paper'));
      sulagna.markItemDone(0, 0);
      assert.isOk(sulagna.getItem(0, 0).status);
    })
    it('user can mark a item as not done', () => {
      let sulagna = new User('sulagna');
      let title = 'home';
      let description = 'many works to do';
      sulagna.addToDo(new ToDo(title, description));
      sulagna.addItems(0,new Item('first write your thoughts on paper'));
      sulagna.markItemNotDone(0, 0);
      assert.isNotOk(sulagna.getItem(0, 0).status);
    })
  })
  describe('user can delete item of a todo',()=>{
    it('can delete a item of given todo',()=>{
      let user = new User('bahu');
      let toDo = {
        item: 'jalebi',
        deleteItem: function(){
          delete this.item;
        }
      };
      user.addToDo(toDo);
      user.deleteItem(0);
      assert.equal(toDo.item,undefined);
    })
  })
});
