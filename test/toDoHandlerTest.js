const ToDoHandler = require('../appModels/toDoHandler.js');
const assert = require('chai').assert;

describe('todo handler test',()=>{
  describe('todo handler get users',()=>{
    it('it gives user object in handler',()=>{
      let toDoHandler = new ToDoHandler({pragya:"badGirl"});
      assert.deepEqual(toDoHandler.getUsers(),{pragya:"badGirl"})
    })
  })
  describe('todo handler does user exists check',()=>{
    it('returns false on non existing user',()=>{
      let toDoHandler = new ToDoHandler({pragya:"badGirl"});
      assert.isNotOk(toDoHandler.doesUserExsist('manindra'))
    })
  })
  describe('todo handler adds user',()=>{
    it('adds user by username',()=>{
      let toDoHandler = new ToDoHandler();
      assert.deepEqual(toDoHandler.getUsers(),{})
      let user = {
        name:'pragya',
        getName:function(){
          return this.name
        }
      }
      toDoHandler.addUser(user);
      assert.deepEqual(toDoHandler.getUsers(),{pragya:user})
    })
  })
  describe('todo handler can add a todo for a specific user',()=>{
    it('add a todo if user name is given',()=>{
      let user = {
        name:'pragya',
        toDo :'',
        getName:function(){
          return this.name
        },
        addToDo:function(toDo){
          this.toDo = toDo
        }
      }
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addToDos('pragya','done')
      assert.equal(user.toDo,'done')
    })
  })
  describe('todo handler can delete a todo',()=>{
    it('can delete todo of a specific user',()=>{
      let user = {
        name:'pragya',
        toDo :'',
        getName:function(){
          return this.name
        },
        addToDo:function(toDo){
          this.toDo = toDo
        },
        deleteToDo: function(toDoKey) {
          delete this.toDo;
        }
      }
      let toDoHandler = new ToDoHandler();
      toDoHandler.addUser(user);
      toDoHandler.addToDos('pragya','done')
      assert.equal(user.toDo,'done')
      toDoHandler.deleteToDo('pragya',0)
      assert.equal(user.toDo,undefined)
    })
  })
})
