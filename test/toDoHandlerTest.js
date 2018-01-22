const ToDoHandler = require('../appModels/toDoHandler.js');
const assert = require('chai').assert;

describe('todo handler test', () => {
  describe('todo handler get users', () => {
    it('it gives user object in handler', () => {
      let toDoHandler = new ToDoHandler({
        pragya: "badGirl"
      });
      assert.deepEqual(toDoHandler.getUsers(), {
        pragya: "badGirl"
      })
    })
  })
  describe('todo handler does user exists check', () => {
    it('returns false on non existing user', () => {
      let toDoHandler = new ToDoHandler({
        pragya: "badGirl"
      });
      assert.isNotOk(toDoHandler.doesUserExsist('manindra'))
    })
  })
  describe('todo handler adds user', () => {
    it('adds user by username', () => {
      let toDoHandler = new ToDoHandler();
      assert.deepEqual(toDoHandler.getUsers(), {})
      let user = {
        name: 'pragya',
        getName: function() {
          return this.name
        }
      }
      toDoHandler.addUser(user);
      assert.deepEqual(toDoHandler.getUsers(), {
        pragya: user
      })
    })
  })
  describe('todo handler can add a todo for a specific user', () => {
    it('add a todo if user name is given', () => {
      let user = {
        name: 'pragya',
        toDo: '',
        getName: function() {
          return this.name
        },
        addToDo: function(toDo) {
          this.toDo = toDo
        }
      }
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addToDos('pragya', 'done')
      assert.equal(user.toDo, 'done')
    })
  })
  describe('todo handler can delete a todo', () => {
    it('can delete todo of a specific user', () => {
      let user = {
        name: 'pragya',
        toDo: '',
        getName: function() {
          return this.name
        },
        addToDo: function(toDo) {
          this.toDo = toDo
        },
        deleteToDo: function(toDoKey) {
          delete this.toDo;
        }
      }
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addToDos('pragya', 'done')
      assert.equal(user.toDo, 'done')
      toDoHandler.deleteToDo('pragya', 0)
      assert.equal(user.toDo, undefined)
    })
  })
  describe('todo handler can add a todo item', () => {
    it('can add todo item of a specific user', () => {
      let user = {
        userName: 'pragya',
        item: '',
        getName: function() {
          return this.userName
        },
        addItems: function(todoKey, contents) {
          this.item = contents;
        }
      };
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addItem('pragya', 0, 'done')
      assert.equal(user.item, 'done')
    })
  })
  describe('todo handler can add a todo item', () => {
    it('can add todo item of a specific user', () => {
      let user = {
        userName: 'pragya',
        item: '',
        getName: function() {
          return this.userName
        },
        addItems: function(todoKey, contents) {
          this.item = contents;
        },
        deleteItem: function(todoKey, itemKey) {
          delete this.item;
        }
      };
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addItem('pragya', 0, 'done')
      assert.equal(user.item, 'done')
      toDoHandler.deleteItem('pragya', 0, 0)
      assert.equal(user.item, undefined)
    })
  })
  describe('toDoHandler has the key of current todo', () => {
    it('get todo key gives todo key', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'pragya',
        getName: function() {
          return this.name;
        },
        toDoKey: 0,
        getToDoKey: function() {
          return this.toDoKey;
        }
      }
      toDoHandler.addUser(user);
      assert.equal(toDoHandler.getToDoKey('pragya'), 0)
    })
  })
  describe('toDoHandler can give todo', () => {
    it('get todo by todo key', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'pragya',
        getName: function() {
          return this.name;
        },
        getToDo: function(toDoKey) {
          return true;
        }
      };
      toDoHandler.addUser(user);
      assert.isOk(toDoHandler.getToDo('pragya', 0));
    })
  })
  describe('toDoHandler can edit title of given todo', () => {
    it('can edit title of given toDo', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'Aditi',
        toDoTitle: 'office work',
        getName: function() {
          return this.name;
        },
        editToDoTitle: function(toDoKey, newTitle) {
          this.toDoTitle = newTitle;
        }
      };
      toDoHandler.addUser(user);
      assert.equal(user.toDoTitle, 'office work');
      toDoHandler.editToDoTitle('Aditi', 0, 'home work');
      assert.equal(user.toDoTitle, 'home work');
    })
  })
  describe('toDoHandler can edit description of given todo', () => {
    it('can edit toDo description', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'Aditi',
        toDoDescription: 'office work',
        getName: function() {
          return this.name;
        },
        editToDoDescription: function(toDoKey, newDescription) {
          this.toDoDescription = newDescription;
        }
      };
      toDoHandler.addUser(user);
      assert.equal(user.toDoDescription, 'office work');
      toDoHandler.editToDoDescription('Aditi', 0, 'home work');
      assert.equal(user.toDoDescription, 'home work');
    })
  })
  describe('toDoHandler can mark a item done and not done of given todo', () => {
    it('can mark as done and not done', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'Aditi',
        itemStatus: false,
        getName: function() {
          return this.name;
        },
        markItemDone: function(){
          this.itemStatus= true;
        },
        markItemNotDone: function(){
          this.itemStatus = false;
        }
      };
      toDoHandler.addUser(user);
      toDoHandler.markItemAsDone('Aditi')
      assert.isOk(user.itemStatus);
      toDoHandler.markItemAsNotDone('Aditi')
      assert.isNotOk(user.itemStatus);
    })
  })
  describe('toDoHandler can mark a item done and not done of given todo', () => {
    it('can mark as done', () => {
      let toDoHandler = new ToDoHandler();
      let user = {
        name: 'Aditi',
        getName: function() {
          return this.name;
        },
        item : 'tv thik krana h',
        editItem: function(toDoKey,itemKey,newItem){
          this.item = newItem;
        }
      };
      toDoHandler.addUser(user);
      assert.equal(user.item,'tv thik krana h');
      toDoHandler.editItem('Aditi',0,0,'khana banana h')
      assert.equal(user.item,'khana banana h');
    })
  })
})
