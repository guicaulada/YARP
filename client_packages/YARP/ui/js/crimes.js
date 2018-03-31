function populateCrimesConfirmMenu(crimesJson) {
	// Obtenemos la lista de delitos a aplicar
	let crimesArray = JSON.parse(crimesJson);
	let content = document.getElementById('content');

	// Declaramos las variables de condena
	let money = 0;
	let jail = 0;

	for(let i = 0; i < crimesArray.length; i++) {
		// Obtenemos el elemento en curso
		let crime = crimesArray[i];

		let crimeDescription = document.createElement('li');
		crimeDescription.textContent = crime.crime;
		money += crime.fine;
		jail += crime.jail;

		// Añadimos el elemento a la jerarquía
		content.appendChild(crimeDescription);
	}

	// Creamos la información de condena
	document.getElementById('jail').innerHTML = '<b>Tiempo de condena: </b>' + jail + ' minutos';
	document.getElementById('fine').innerHTML = '<b>Multa a pagar: </b>' + money + '$';
}

function applyCrimesToPlayer() {
	// Aplicamos los delitos al jugador
	mp.trigger('executePlayerCrimes');
}

function showCrimesMenu() {
	// Mostramos el menú de delitos
	mp.trigger('backCrimesMenu');
}
