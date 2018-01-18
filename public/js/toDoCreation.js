const createInputField = function(){
  let ol = document.getElementById('itemsBlock');
  let li = document.createElement('li');
  let itemField = document.createElement('input');
  itemField.type = 'text';
  itemField.name = 'item';
  let br = document.createElement('br');
  ol.appendChild(li);
  li.appendChild(itemField);
  li.appendChild(br);
};
