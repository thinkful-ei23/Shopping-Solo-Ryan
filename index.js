'use strict';
const STORE = [
	{name: 'apples',checked:false, visible: true},
	{name:'oranges',checked:false, visible: true},
	{name:'milk',checked:true, visible: true},
	{name:'bread',checked:true,visible: true}
];
//--------------------------------------------------------
//start Render
//--------------------------------------------------------

function generateItemElement(item, itemIndex, template) {
  if(item.visible === true)
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
	<form id="js-name-change-form">
            <input type="text" name="name-change-entry" class="js-name-change-entry">
            <button type="change name">Change Entry</button>
        </form>      
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
//-----------------------------------------------------------------------------------
//end render, start submit
//-----------------------------------------------------------------------------------

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, visible: true});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
//---------------------------------------------------
//end submit, start check
//---------------------------------------------------

function toggleCheckedForListItem(itemIndex){STORE[itemIndex].checked = !STORE[itemIndex].checked;}

function getItemIndexFromElement(item){
	const itemIndexString=$(item)
			       .closest('.js-item-index-element')
			       .attr('data-item-index');
	return parseInt(itemIndexString,10);
}

function itemCheckClicked(){
	console.log('checking');
	$('.js-shopping-list').on('click','.js-item-toggle', event => {
		const itemIndex=getItemIndexFromElement(event.currentTarget);
		toggleCheckedForListItem(itemIndex);
		renderShoppingList();
	});
}
//-------------------------
//end check, start delete
//-------------------------

function removeFromList(x){
	STORE.splice(x,1);
}

function itemDeleteClicked(){
	console.log('delete');
	$('.js-shopping-list').on('click','.js-item-delete', event => {
		const x = getItemIndexFromElement(event.currentTarget);
		removeFromList(x);
		renderShoppingList();
	});
}
/*==================================
        end delete, start change
==================================*/

function changeItemName(){
	$('#js-name-change-form').submit(function(event){
		event.preventDefault();
		const itemChangeIndex = getItemIndexFromElement(event.currentTarget);
		const newItemChange = $('.js-name-change-entry').val();
		STORE[itemChangeIndex].name = newItemChange;
		renderShoppingList();
	});
}

/*===================================
	end change, start search 
====================================*/

function searchItem(){
	$('#js-search-form').submit(function(event){
		event.preventDefault();
		
      const query = $('.js-search-entry').val();
            $('.js-search-entry').val('');
    	STORE.forEach(function(element){
			  if(element.name != query){
			    element.visible = false;
        }
      });

      renderShoppingList();
	});

}

function reset(){
  $('#js-reset').submit(function(event){
    event.preventDefault();
      STORE.forEach(function(element){
          element.visible=true;
      });
    renderShoppingList();
  });
}
/*
function generateListHtml(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join("");
}


function renderShoppingListSearch() {
  const shoppingListItemsString = generateListHtml(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}
*/
/*===================================
	end search, start display checked
====================================*/

function displayUnchecked(){
	$('#js-display-unchecked').change(function(event){
		STORE.forEach(function(element){
			if(element.checked === true){
				element.visible = false;
			}
		});
		console.log(STORE);
		renderShoppingList();
	});

}

function displayAll(){
	$('#js-display-all').change(function(event){
		STORE.forEach(function(element){
			if(element.checked === true){
				element.visible = true;
			}
		});
		console.log(STORE);
		renderShoppingList();
	});

}

/*-=======================
	end display checked
========================*/
function handleShoppingList(){
	renderShoppingList();
	handleNewItemSubmit();
	itemCheckClicked();
	itemDeleteClicked();
	changeItemName();
//	searchItem();
//	renderShoppingListSearch();
   displayUnchecked();
   displayAll();
   searchItem();
   reset();
}

/*---------------------------------
end
---------------------------------*/
$(handleShoppingList);
