class ToDoHandler{
  constructor(users={}){
    this.users = users;
  }
  getUsers(){
    return this.users;
  }
  doesUserExsist(userName){
    return userName in this.users;
  }
  addUser(user){
    this.users[user.getName()] = user;
  }
  addToDos(userName,toDo){
    this.users[userName].addToDo(toDo);
  }
  deleteToDo(userName,toDoKey){
    this.users[userName].deleteToDo(toDoKey);
  }
  addItem(userName,toDoKey,contents){
    this.users[userName].addItems(toDoKey,contents);
  }
  deleteItem(userName,toDoKey,itemKey){
    this.users[userName].deleteItem(toDoKey,itemKey)
  }
  getToDoKey(userName){
    return this.users[userName].getToDoKey();
  }
};

module.exports = ToDoHandler;
