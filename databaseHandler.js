let loadDatabase = function(fs,User,ToDo,Item){
  let data = readDatabase(fs)
  return applyBehaviour(data,User,ToDo,Item,fs)
};

let applyBehaviour = function(data,User,ToDo,Item,fs){
  let users = Object.keys(data);
  users.forEach((user)=>{
    data[user]["__proto__"]= new User().__proto__;
    let toDos = Object.keys(data[user]['toDos']);
    toDos.forEach((todo)=>{
      data[user]['toDos'][todo]["__proto__"] = new ToDo().__proto__;
      let items = Object.keys(data[user]['toDos'][todo]['items']);
      items.forEach((item)=>{
        data[user]['toDos'][todo]['items'][item]["__proto__"] = new Item().__proto__;
      })
    })
  })
  return data
}
const getRegisteredUsers = function(fs){
  return JSON.parse(fs.readFileSync('./database/userData.json', 'utf8'));
}

let readDatabase = function(fs) {
  let userData = '{}';
  if (fs.existsSync('./database/todo.json')) {
    userData = fs.readFileSync('./database/todo.json', 'utf8') || '{}'
  };
  userData = JSON.parse(userData);
  return userData;
};
exports.getRegisteredUsers=getRegisteredUsers;
exports.loadDatabase = loadDatabase;
