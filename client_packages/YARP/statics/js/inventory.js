let selected = null;
let selected_id = null;

function populateInventory(inventoryJson, title) {
	// Inicializamos la selección
	selected = null;

	// Obtenemos el array de objetos
	let inventory = JSON.parse(inventoryJson);

	// Obtenemos los contenedores de elementos
	let titleContainer = document.getElementById('identifier');
	let inventoryContainer = document.getElementById('inventory');
	let closeImage = document.createElement('img');

	titleContainer.textContent = title;
	closeImage.src = '../img/close.png';
	closeImage.onclick = (function(){
		mp.trigger('destroyBrowser');
	});
	titleContainer.appendChild(closeImage);

	for(let i = 0; i < inventory.length; i++) {
		// Obtenemos el objeto del inventario
		let item = inventory[i];

		// Creamos los elementos para mostrar cada objeto
		let itemContainer = document.createElement('div');
		let amountContainer = document.createElement('div');
		let itemImage = document.createElement('img');

		// Añadimos las clases a cada elemento
		itemContainer.classList.add('inventory-item');
		amountContainer.classList.add('inventory-amount');

		// Añadimos el contenido de cada elemento
		itemImage.src = '../img/inventory/' + item.img + '.png';
		amountContainer.textContent = item.amount;

		// Añadimos la función de click sobre el elemento
		itemContainer.onclick = (function() {
			// Comprobamos que se ha pulsado en un elemento no seleccionado
			if(selected !== i) {
				// Miramos si había algún elemento seleccionado
				if(selected != null) {
					let previousSelected = document.getElementsByClassName('inventory-item')[selected];
					previousSelected.classList.remove('active-item');
				}

				// Seleccionamos el elemento pulsado
				let currentSelected = document.getElementsByClassName('inventory-item')[i];
				currentSelected.classList.add('active-item');

				// Guardamos el nuevo índice seleccionado
				selected = i;
				selected_id = item.id;

				// Obtenemos las opciones a mostrar
				mp.trigger('getInventoryOptions');
			}
		});

		// Ordenamos la jerarquía de elementos
		inventoryContainer.appendChild(itemContainer);
		itemContainer.appendChild(amountContainer);
		itemContainer.appendChild(itemImage);
	}
}

function showInventoryOptions(optionsArray) {
	// Añadimos las opciones
	let options = optionsArray.split(",");
	let inventoryOptions = document.getElementById('options');
	while (inventoryOptions.firstChild) {
	    inventoryOptions.removeChild(inventoryOptions.firstChild);
	}
	for(let i = 0; i < options.length; i++) {
		let itemOption = document.createElement('div');

		// Añadimos las clases a cada elemento
		itemOption.classList.add('inventory-option');
		itemOption.textContent = options[i];
		itemOption.onclick = (function(){
			mp.trigger('executeInventoryAction', selected_id, options[i]);
		});
		inventoryOptions.appendChild(itemOption);
	}
}
