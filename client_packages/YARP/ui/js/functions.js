let bankSelectedOption = 0;
let vehicleArray = null;
let catalogSelectedOption = 0;

function loginAccount() {
    var password = document.getElementById('pass').value;
    mp.trigger('yarp_verifyLogin', password);
};

function selectName() {
    var name = capitalizeFirstLetter(document.getElementById('name').value);
    var surname = capitalizeFirstLetter(document.getElementById('surname').value);
    var realName = name + " " + surname;
    mp.trigger('yarp_createCharacter', realName);
}

function getPlayerList() {
    mp.trigger('yarp_getConnectedPlayers');
};

function populatePlayerList(playerJSON) {
    var playerArray = JSON.parse(playerJSON);
    var tableBody = document.getElementById('playersTableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    for (var i = 0; i < playerArray.length; i++) {
        if (playerArray[i].playerName != "") {
            var tableRow = document.createElement("TR");
            var playerIdColumn = document.createElement("TD");
            var playerNameColumn = document.createElement("TD");
            var playerPingColumn = document.createElement("TD");

            playerIdColumn.innerHTML = playerArray[i].playerId;
            playerNameColumn.innerHTML = playerArray[i].playerName;
            playerPingColumn.innerHTML = playerArray[i].playerPing + " ms";

            tableRow.appendChild(playerIdColumn);
            tableRow.appendChild(playerNameColumn);
            tableRow.appendChild(playerPingColumn);

            tableBody.appendChild(tableRow);
        }
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function withdrawMoney() {
    bankSelectedOption = 1;
    $('#bank-menu').addClass('hidden');
    $('#bank-withdraw').removeClass('hidden');
    $('#bank-accept').removeClass('hidden');
    $('#bank-exit').html('Cancel');
	mp.trigger('yarp_updateBankAccountMoney');
}

function depositMoney() {
    bankSelectedOption = 2;
    $('#bank-menu').addClass('hidden');
    $('#bank-deposit').removeClass('hidden');
    $('#bank-accept').removeClass('hidden');
    $('#bank-exit').html('Cancel');
	mp.trigger('yarp_updateBankAccountMoney');
}

function transferMoney() {
    bankSelectedOption = 3;
    $('#bank-menu').addClass('hidden');
    $('#bank-transfer').removeClass('hidden');
    $('#bank-accept').removeClass('hidden');
    $('#bank-exit').html('Cancel');
	mp.trigger('yarp_updateBankAccountMoney');
}

function updateAccountMoney(money) {
	// Actualizamos la etiqueta con el dinero
	switch(bankSelectedOption) {
		case 1:
			$('#bank-withdraw-balance').html(money + '$');
			break;
		case 2:
			$('#bank-deposit-balance').html(money + '$');
			break;
		case 3:
			$('#bank-transfer-balance').html(money + '$');
			break;
	}
}

function showBalance() {
    bankSelectedOption = 4;
    $('#bank-menu').addClass('hidden');
    $('#bank-balance').removeClass('hidden');
    $('#bank-exit').html('Cancel');
	mp.trigger("yarp_loadPlayerBankBalance");
}

function showBankOperations(bankOperationsJson, playerName) {
	var bankOperationsArray = JSON.parse(bankOperationsJson);
    var tableBody = document.getElementById('bankBalanceTableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    for (var i = 0; i < bankOperationsArray.length; i++) {
		// Creamos los elementos de fila
		var tableRow = document.createElement("TR");
		var dateColumn = document.createElement("TD");
		var operationColumn = document.createElement("TD");
		var involvedColumn = document.createElement("TD");
		var amountColumn = document.createElement("TD");

		// Añadimos los datos del array
		dateColumn.innerHTML = bankOperationsArray[i].date;
		operationColumn.innerHTML = bankOperationsArray[i].type;
		switch(bankOperationsArray[i].type) {
			case "Transfer":
				if(bankOperationsArray[i].source === playerName) {
					amountColumn.innerHTML = "-" + bankOperationsArray[i].amount + "$";
					involvedColumn.innerHTML = bankOperationsArray[i].target;
				} else {
					amountColumn.innerHTML = bankOperationsArray[i].amount + "$";
					involvedColumn.innerHTML = bankOperationsArray[i].source;
				}
				break;
			case "Withdraw":
				amountColumn.innerHTML = "-" + bankOperationsArray[i].amount + "$";
				break;
			case "Payment":
				amountColumn.innerHTML = "-" + bankOperationsArray[i].amount + "$";
				break;
			default:
				amountColumn.innerHTML = bankOperationsArray[i].amount + "$";
				break;
		}

		// Añadimos las columnas a la fila
		tableRow.appendChild(dateColumn);
		tableRow.appendChild(operationColumn);
		tableRow.appendChild(involvedColumn);
		tableRow.appendChild(amountColumn);

		// Insertamos la fila en la tabla
		tableBody.appendChild(tableRow);
    }
}

function showOperationError(message) {
    switch (bankSelectedOption) {
        case 1:
            $('#bank-withdraw-error').html(message);
            $('#bank-withdraw-error').removeClass('hidden');
            break;
        case 2:
            $('#bank-deposit-error').html(message);
            $('#bank-deposit-error').removeClass('hidden');
            break;
        case 3:
            $('#bank-transfer-error').html(message);
            $('#bank-transfer-error').removeClass('hidden');
            break;
    }
}

function bankBack() {
    switch (bankSelectedOption) {
        case 1:
            $('#bank-withdraw-amount').val('0');
            $('#bank-withdraw').addClass('hidden');
            $('#bank-withdraw-error').addClass('hidden');
            $('#bank-menu').removeClass('hidden');
            break;
        case 2:
            $('#bank-deposit-amount').val('0');
            $('#bank-deposit').addClass('hidden');
            $('#bank-deposit-error').addClass('hidden');
            $('#bank-menu').removeClass('hidden');
            break;
        case 3:
            $('#bank-transfer-person').val('');
            $('#bank-transfer-amount').val('0');
            $('#bank-transfer').addClass('hidden');
            $('#bank-transfer-error').addClass('hidden');
            $('#bank-menu').removeClass('hidden');
            break;
        case 4:
            $('#bank-balance').addClass('hidden');
            $('#bank-menu').removeClass('hidden');
            break;
        default:
            mp.trigger('yarp_closeATM');
            break;
    }
    $('#bank-accept').addClass('hidden');
    $('#bank-exit').html('Exit');
    bankSelectedOption = 0;
}

function catalogBack() {
    switch (catalogSelectedOption) {
        case 1:
            $('#vehicle-container').removeClass('hidden');
            break;
    }
    mp.trigger("yarp_closeCatalog");
    $('#catalog-exit').html('Exit');
    catalogSelectedOption = 0;
}

function bankAccept() {
    var target = " ";
    var amount = 0;

    switch (bankSelectedOption) {
        case 1:
            amount = $('#bank-withdraw-amount').val();
            break;
        case 2:
            amount = $('#bank-deposit-amount').val();
            break;
        case 3:
            target = $('#bank-transfer-person').val();
            amount = $('#bank-transfer-amount').val();
            break;
    }
    mp.trigger('yarp_executeBankOperation', bankSelectedOption, amount, target);
}

function getVehicleList() {
    mp.trigger('yarp_getCarShopVehicleList');
}

function populateVehicleList(dealership, vehicleJSON) {
    // Mostramos el menú de filtros en función del concesionario
    switch (dealership) {
        case 0:
            $('#vehicle-list-cars').removeClass('hidden');
            break;
        case 1:
            $('#vehicle-list-motorbikes').removeClass('hidden');
            break;
    }

    vehicleArray = JSON.parse(vehicleJSON);
    var mainContainer = document.getElementById('vehicle-container');
    for (var i = 0; i < vehicleArray.length; i++) {
        var container = document.createElement('div');
        var image = document.createElement('div');
        var model = document.createElement('div');
        var speed = document.createElement('div');
        var price = document.createElement('div');
        image.id = vehicleArray[i].model;
        image.className = vehicleArray[i].model + ' center-block';
        image.style.width = '120px';
        image.style.height = '90px';
        model.textContent = 'Modelo: ' + vehicleArray[i].model;
        speed.textContent = 'Velocidad: ' + vehicleArray[i].speed +'km/h';
        price.textContent = 'Precio: ' + vehicleArray[i].price +'$';
        container.className = 'col-lg-2';
        container.onclick = function () {
            mp.trigger('previewCarShopVehicle', this.firstChild.id);
        };
        container.appendChild(image);
        container.appendChild(model);
        container.appendChild(speed);
        container.appendChild(price);
        mainContainer.appendChild(container);
    }
}

$("input[type='checkbox']").change(function () {
    var vehicleTypes = [];
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            vehicleTypes.push(parseInt($(this).val()));
        }
    });

    for (var i = 0; i < vehicleArray.length; i++) {
        if (vehicleTypes.length == 0 || vehicleTypes.indexOf(vehicleArray[i].type) > -1) {
            $('#vehicle-container').children().eq(i).removeClass('hidden');
        } else {
            $('#vehicle-container').children().eq(i).addClass('hidden');
        }
    }
});

$(document).ready(function () {
    $('#colorpicker').farbtastic(function (color) {
        var colorMain = document.getElementById('color-main').checked;
        mp.trigger("yarp_previewVehicleChangeColor", color, colorMain);
    });
});

function checkVehiclePayable() {
	// Comprobamos si el jugador tiene el dinero para el vehículo
	mp.trigger('yarp_checkVehiclePayable');
}

function showVehiclePurchaseButton() {
	// Activamos el botón de compra
	$('#catalog-purchase').removeClass('hidden');
}

function rotatePreviewVehicle() {
    var rotation = parseFloat(document.getElementById('vehicle-slider').value);
    mp.trigger("yarp_rotatePreviewVehicle", rotation);
}

function goBackToCatalog() {
    mp.trigger('yarp_showCatalog');
}

function purchaseVehicle() {
    mp.trigger('yarp_purchaseVehicle');
}

function testVehicle() {
	mp.trigger('yarp_testVehicle');
}

function namePoliceControl() {
    var name = document.getElementById('name').value;
    mp.trigger('yarp_policeControlSelectedName', name);
    mp.trigger('destroyBrowser');
}

function preloadContact() {
	// Cargamos los datos del contacto seleccionado
    mp.trigger('yarp_preloadContactData');
}

function populateContactData(number, name) {
	document.getElementById('number').value = number;
	document.getElementById('name').value = name;
}

function setContactData() {
	// Cogemos el número y nombre
    let number = document.getElementById('number').value;
    let name = document.getElementById('name').value;

	// Llamamos al cliente para que dé de alta
    mp.trigger('yarp_setContactData', number, name);
}

function sendPhoneMessage() {
	// Recogemos y enviamos el mensaje
	let message = document.getElementById('message').value;
    mp.trigger('yarp_sendPhoneMessage', message);
}

function cancelMessage() {
	// Cancelamos el envío del SMS
    mp.trigger('yarp_cancelPhoneMessage');
}

function getFirstTestQuestion() {
	// Cogemos la primera pregunta y sus respuestas
	mp.trigger('yarp_getNextTestQuestion');
}

function populateQuestionAnswers(question, answersJSON) {
	// Obtenemos el array del objeto JSON
	let answers = JSON.parse(answersJSON);

	// Ponemos el texto de la pregunta en la cabecera
	$('#license-question').text(question);

	// Eliminamos las opciones anteriores
	$('#license-answers').empty();

	// Rellenamos la lista de respuestas
	for(let i = 0; i < answers.length; i++) {
		// Creamos los objetos a dibujar
		let div = document.createElement("div");
		let label = document.createElement("label");
		let radio = document.createElement("input");

		// Añadimos las propiedades
		radio.type = "radio";
		radio.name = "answer";
		radio.value = answers[i].id;

		// Ponemos el texto de la respuesta
		label.innerHTML = answers[i].text;

		// Insertamos los elementos en el div
		div.appendChild(radio);
		div.appendChild(label);

		// Añadimos el radio a la lista
		document.getElementById('license-answers').appendChild(div);
	}
}

function setAccountName(sclub){
  document.getElementById('acct').value = `${sclub}`;
}

function submitAnswer() {
	// Recogemos la respuesta y la enviamos
	let answer = $('input[name=answer]:checked', '#testForm').val();
	mp.trigger('yarp_submitAnswer', answer);
}
