class ToDoHandler {
  constructor(users = {}) {
    this.users = users;
  }
  getUsers() {
    return this.users;
  }
  doesUserExsist(userName) {
    return userName in this.users;
  }
  addUser(user) {
    this.users[user.getName()] = user;
  }
  addToDos(userName, toDo) {
    this.users[userName].addToDo(toDo);
  }
  getToDo(userName, toDoKey) {
    return this.users[userName].getToDo(toDoKey);
  }
  editToDoTitle(userName, toDoKey, newTitle) {
    this.users[userName].editToDoTitle(toDoKey, newTitle);
  }
  editToDoDescription(userName, toDoKey, newDescription) {
    this.users[userName].editToDoDescription(toDoKey, newDescription);
  }
  deleteToDo(userName, toDoKey) {
    this.users[userName].deleteToDo(toDoKey);
  }
  addItem(userName, toDoKey, contents) {
    this.users[userName].addItems(toDoKey, contents);
  }
  editItem(userName,toDoKey, itemKey, newContent){
    this.users[userName].editItem(toDoKey, itemKey, newContent);
  }
  deleteItem(userName, toDoKey, itemKey) {
    this.users[userName].deleteItem(toDoKey, itemKey);
  }
  markItemAsDone(userName, toDoKey, itemKey) {
    this.users[userName].markItemDone(toDoKey, itemKey);
  }
  markItemAsNotDone(userName, toDoKey, itemKey) {
    this.users[userName].markItemNotDone(toDoKey, itemKey);
  }
  getToDoKey(userName) {
    return this.users[userName].getToDoKey();
  }
};

module.exports = ToDoHandler;
