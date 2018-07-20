'use strict';

const STORE = [
	{name: 'apples',checked:false},
	{name:'oranges',checked:false},
	{name:'milk',checked:true},
	{name:'bread',checked:true}
];

function renderShoppingList(){
//DOM render
	console.log('render');

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
