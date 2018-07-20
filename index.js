'use strict';

const STORE = [
	{name: 'apples',checked:false},
	{name:'oranges',checked:false},
	{name:'milk',checked:true},
	{name:'bread',checked:true}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>
    `;
}


function generateListHtml(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join("");
}


function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateListHtml(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}


function newItemSubmit(){
	console.log('Submit');
}

function itemCheckClicked(){

	console.log('checking');
}

function itemDeleteClicked(){

	console.log('delete');
}

function handleShoppingList(){
	renderShoppingList();
	newItemSubmit();
	itemCheckClicked();
	itemDeleteClicked();
}

$(handleShoppingList);
