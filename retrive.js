const Item = require('./appModels/item.js');
const ToDo = require('./appModels/toDo.js');
const User = require('./appModels/user.js');

let retriveBehaviour = function(data){
  let users = Object.keys(data);
  users.forEach((user)=>{
    data[user]["__proto__"]= new User().__proto__;
    let toDos = Object.keys(user);
    toDos.forEach((todo)=>{
      user[todo]["__proto__"] = new ToDo();
      let items = Object.keys(toDos);
      items.forEach((item)=>{
        toDos[item]["__proto__"] = new Item().__proto__;
      })
    })
  })
}

exports.retriveBehaviour = retriveBehaviour;
