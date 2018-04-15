let predefinedColors = [
	{'id': 0, 'type': 0, 'desc': 'Negro'}, {'id': 1, 'type': 0, 'desc': 'Negro grafito'}, {'id': 2, 'type': 0, 'desc': 'Negro metalizado'}, {'id': 3, 'type': 0, 'desc': 'Plateado oscuro'},
	{'id': 4, 'type': 0, 'desc': 'Plateado'}, {'id': 5, 'type': 0, 'desc': 'Azul plateado'}, {'id': 6, 'type': 0, 'desc': 'Gris acero'}, {'id': 7, 'type': 0, 'desc': 'Plateado oscurecido'},
  {'id': 8, 'type': 0, 'desc': 'Plateado piedra'}, {'id': 9, 'type': 0, 'desc': 'Plateado medianoche'}, {'id': 10, 'type': 0, 'desc': 'Metalizado arma'}, {'id': 11, 'type': 0, 'desc': 'Gris antracita'},
  {'id': 12, 'type': 1, 'desc': 'Negro'}, {'id': 13, 'type': 1, 'desc': 'Gris'}, {'id': 14, 'type': 1, 'desc': 'Gris claro'}, {'id': 15, 'type': 2, 'desc': 'Negro'},
  {'id': 16, 'type': 2, 'desc': 'Negro polimero'}, {'id': 17, 'type': 2, 'desc': 'Plateado oscuro'}, {'id': 18, 'type': 2, 'desc': 'Plateado'}, {'id': 19, 'type': 2, 'desc': 'Metalizado arma'},
  {'id': 20, 'type': 2, 'desc': 'Plateado oscurecido'}, {'id': 21, 'type': 3, 'desc': 'Negro'}, {'id': 22, 'type': 3, 'desc': 'Grafito'}, {'id': 23, 'type': 3, 'desc': 'Gris plateado'},
  {'id': 24, 'type': 3, 'desc': 'Plateado'}, {'id': 25, 'type': 3, 'desc': 'Azul plateado'}, {'id': 26, 'type': 3, 'desc': 'Plateado oscurecido'}, {'id': 27, 'type': 0, 'desc': 'Rojo'},
  {'id': 28, 'type': 0, 'desc': 'Rojo torino'}, {'id': 29, 'type': 0, 'desc': 'Rojo formula'}, {'id': 30, 'type': 0, 'desc': 'Rojo llamarada'}, {'id': 31, 'type': 0, 'desc': 'Rojo elegante'},
  {'id': 32, 'type': 0, 'desc': 'Rojo granate'}, {'id': 33, 'type': 0, 'desc': 'Rojo desertico'}, {'id': 34, 'type': 0, 'desc': 'Rojo vino'}, {'id': 35, 'type': 0, 'desc': 'Rojo acaramelado'},
  {'id': 36, 'type': 0, 'desc': 'Naranja amanecer'}, {'id': 37, 'type': 0, 'desc': 'Oro clasico'}, {'id': 38, 'type': 0, 'desc': 'Naranja'}, {'id': 39, 'type': 1, 'desc': 'Rojo'},
  {'id': 40, 'type': 1, 'desc': 'Rojo oscuro'}, {'id': 41, 'type': 1, 'desc': 'Naranja'}, {'id': 42, 'type': 1, 'desc': 'Amarillo'}, {'id': 43, 'type': 2, 'desc': 'Rojo'},
  {'id': 44, 'type': 2, 'desc': 'Rojo brillante'}, {'id': 45, 'type': 2, 'desc': 'Rojo vino'}, {'id': 46, 'type': 3, 'desc': 'Rojo'}, {'id': 47, 'type': 3, 'desc': 'Rojo dorado'},
  {'id': 48, 'type': 3, 'desc': 'Rojo oscuro'}, {'id': 49, 'type': 0, 'desc': 'Verde oscuro'}, {'id': 50, 'type': 0, 'desc': 'Verde de carreras'}, {'id': 51, 'type': 0, 'desc': 'Verde mar'},
  {'id': 52, 'type': 0, 'desc': 'Verde oliva'}, {'id': 53, 'type': 0, 'desc': 'Verde'}, {'id': 54, 'type': 0, 'desc': 'Verde azulado'}, {'id': 55, 'type': 1, 'desc': 'Verde lima'},
  {'id': 56, 'type': 2, 'desc': 'Verde oscuro'}, {'id': 57, 'type': 2, 'desc': 'Verde'}, {'id': 58, 'type': 3, 'desc': 'Verde oscuro'}, {'id': 59, 'type': 3, 'desc': 'Verde'},
  {'id': 60, 'type': 3, 'desc': 'Mar limpio'}, {'id': 61, 'type': 0, 'desc': 'Azul medianoche'}, {'id': 62, 'type': 0, 'desc': 'Azul oscuro'}, {'id': 63, 'type': 0, 'desc': 'Azul sajon'},
  {'id': 64, 'type': 0, 'desc': 'Azul'}, {'id': 65, 'type': 0, 'desc': 'Azul marino'}, {'id': 66, 'type': 0, 'desc': 'Azul bahia'}, {'id': 67, 'type': 0, 'desc': 'Azul diamante'},
  {'id': 68, 'type': 0, 'desc': 'Azul surf'}, {'id': 69, 'type': 0, 'desc': 'Azul nautico'}, {'id': 70, 'type': 0, 'desc': 'Azul brillante'}, {'id': 71, 'type': 0, 'desc': 'Azul purpura'},
  {'id': 72, 'type': 0, 'desc': 'Azul barquito'}, {'id': 73, 'type': 0, 'desc': 'Azul ultra'}, {'id': 74, 'type': 0, 'desc': 'Azul brillante'}, {'id': 75, 'type': 2, 'desc': 'Azul oscuro'},
  {'id': 76, 'type': 2, 'desc': 'Azul medianoche'}, {'id': 77, 'type': 2, 'desc': 'Azul'}, {'id': 78, 'type': 2, 'desc': 'Azul espuma marina'}, {'id': 79, 'type': 2, 'desc': 'Azul relampago'},
  {'id': 80, 'type': 2, 'desc': 'Azul maui'}, {'id': 81, 'type': 2, 'desc': 'Azul brillante'}, {'id': 82, 'type': 1, 'desc': 'Azul oscuro'}, {'id': 83, 'type': 1, 'desc': 'Azul'},
  {'id': 84, 'type': 1, 'desc': 'Azul medianoche'}, {'id': 85, 'type': 3, 'desc': 'Azul oscuro'}, {'id': 86, 'type': 3, 'desc': 'Azul'}, {'id': 87, 'type': 3, 'desc': 'Azul claro'},
  {'id': 88, 'type': 0, 'desc': 'Amarillo taxi'}, {'id': 89, 'type': 0, 'desc': 'Amarillo de carreras'}, {'id': 90, 'type': 0, 'desc': 'Bronce'}, {'id': 91, 'type': 0, 'desc': 'Amarillo canario'},
  {'id': 92, 'type': 0, 'desc': 'Lima'}, {'id': 93, 'type': 0, 'desc': 'Champan'}, {'id': 94, 'type': 0, 'desc': 'Beige'}, {'id': 95, 'type': 0, 'desc': 'Marfil oscuro'},
  {'id': 96, 'type': 0, 'desc': 'Marron chocolate'}, {'id': 97, 'type': 0, 'desc': 'Marron dorado'}, {'id': 98, 'type': 0, 'desc': 'Marron claro'}, {'id': 99, 'type': 0, 'desc': 'Beige paja'},
  {'id': 100, 'type': 0, 'desc': 'Marron musgo'}, {'id': 101, 'type': 0, 'desc': 'Marron Boston'}, {'id': 102, 'type': 0, 'desc': 'Marron haya'}, {'id': 103, 'type': 0, 'desc': 'Marron haya oscuro'},
  {'id': 104, 'type': 0, 'desc': 'Naranja chocolateado'}, {'id': 105, 'type': 0, 'desc': 'Arena de playa'}, {'id': 106, 'type': 0, 'desc': 'Arena de playa soleada'}, {'id': 107, 'type': 0, 'desc': 'Crema'},
  {'id': 108, 'type': 2, 'desc': 'Marron'}, {'id': 109, 'type': 2, 'desc': 'Marron medio'}, {'id': 110, 'type': 2, 'desc': 'Marron claro'}, {'id': 111, 'type': 0, 'desc': 'Blanco'},
  {'id': 112, 'type': 0, 'desc': 'Blano escarcha'}, {'id': 113, 'type': 3, 'desc': 'Beig miel'}, {'id': 114, 'type': 2, 'desc': 'Marron'}, {'id': 115, 'type': 0, 'desc': 'Marron oscuro'},
  {'id': 116, 'type': 3, 'desc': 'Marron paja'}, {'id': 117, 'type': 4, 'desc': 'Acero'}, {'id': 118, 'type': 4, 'desc': 'Acero negro'}, {'id': 119, 'type': 4, 'desc': 'Aluminio'},
  {'id': 120, 'type': 5, 'desc': 'Cromado'}, {'id': 121, 'type': 3, 'desc': 'Blanquecino'}, {'id': 122, 'type': 2, 'desc': 'Blanquecino'}, {'id': 123, 'type': 3, 'desc': 'Naranja'},
  {'id': 124, 'type': 3, 'desc': 'Naranja claro'}, {'id': 125, 'type': 0, 'desc': 'Verde securicor'}, {'id': 126, 'type': 3, 'desc': 'Amarillo taxi'}, {'id': 127, 'type': 5, 'desc': 'Azul policial'},
  {'id': 128, 'type': 1, 'desc': 'Verde'}, {'id': 129, 'type': 1, 'desc': 'Marron'}, {'id': 130, 'type': 3, 'desc': 'Naranja'}, {'id': 131, 'type': 1, 'desc': 'Blanco'},
  {'id': 132, 'type': 3, 'desc': 'Blanco'}, {'id': 133, 'type': 3, 'desc': 'Verde oliva'}, {'id': 134, 'type': 5, 'desc': 'Blanco puro'}, {'id': 135, 'type': 5, 'desc': 'Rosa fuerte'},
  {'id': 136, 'type': 5, 'desc': 'Rosa salmon'}, {'id': 137, 'type': 0, 'desc': 'Rosa pfister'}, {'id': 138, 'type': 5, 'desc': 'Naranja'}, {'id': 139, 'type': 5, 'desc': 'Verde'},
  {'id': 140, 'type': 5, 'desc': 'Azul'}, {'id': 141, 'type': 0, 'desc': 'Azul ennegrecido'}, {'id': 142, 'type': 0, 'desc': 'Purpura ennegrecido'}, {'id': 143, 'type': 0, 'desc': 'Rojo ennegrecido'},
  {'id': 144, 'type': 5, 'desc': 'Verde cazador'}, {'id': 145, 'type': 0, 'desc': 'Purpura'}, {'id': 146, 'type': 0, 'desc': 'Azul ennegrecido V'}, {'id': 147, 'type': 5, 'desc': 'Negraco'},
  {'id': 148, 'type': 1, 'desc': 'Purpura'}, {'id': 149, 'type': 1, 'desc': 'Purpura oscuro'}, {'id': 150, 'type': 0, 'desc': 'Rojo lava'}, {'id': 151, 'type': 1, 'desc': 'Verde bosque'},
  {'id': 152, 'type': 1, 'desc': 'Gris pardo'}, {'id': 153, 'type': 1, 'desc': 'Marron desertico'}, {'id': 154, 'type': 0, 'desc': 'Bronceado desertico'}, {'id': 155, 'type': 1, 'desc': 'Verde follaje'},
  {'id': 156, 'type': 5, 'desc': 'Color de aleacion por defecto'}, {'id': 157, 'type': 5, 'desc': 'Azul epsilon'}, {'id': 158, 'type': 5, 'desc': 'Oro puro'}, {'id': 159, 'type': 4, 'desc': 'Dorado cepillado'}
];

let predefinedTypes = [
	{'id': 0, type: 'Metalizado'}, {'id': 1, type: 'Mate'}, {'id': 2, type:'Utilidad'}, {'id': 3, type: 'Desgastado'}, {'id': 4, type: 'Cepillado'}, {'id': 5, type: 'Otros'}
];

let selectedColorType = 0;
let selectedFirstColor = 0;
let selectedSecondColor = 0;
let selectedPearlescentColor = 0;
let selectedFirstCustomColor = '0,0,0';
let selectedSecondCustomColor = '0,0,0';

$(document).ready(function () {
    $('#first-custom-color').farbtastic(function(color) {
		// Cambiamos el color primario del vehículo
		selectedFirstCustomColor = hexToRgb(color).r + ',' + hexToRgb(color).g + ',' + hexToRgb(color).b;
		resourceCall('repaintVehicle', selectedColorType, selectedFirstCustomColor, selectedSecondCustomColor, -1, 0);
    });

    $('#second-custom-color').farbtastic(function(color) {
		// Cambiamos el color secundario del vehículo
		selectedSecondCustomColor = hexToRgb(color).r + ',' + hexToRgb(color).g + ',' + hexToRgb(color).b;
		resourceCall('repaintVehicle', selectedColorType, selectedFirstCustomColor, selectedSecondCustomColor, -1, 0);
    });
});


$('.tabs-menu').on('click', 'div', function() {
	// Miramos si está ya activa
	if($(this).hasClass('active-tab') == false) {
		// Obtenemos el número de pestaña
		let index = $('.tabs-menu > div').index(this);

		// Quitamos todas las clases activas
		$('.tabs-menu > div').removeClass('active-tab');

		switch(index) {
			case 0:
				// Cargamos la pestaña de colores predefinidos
				selectedColorType = index;

				// Activamos el panel
				$('#custom').addClass('no-display');
				$('#predefined').removeClass('no-display');

				// Repintamos el vehículo
				resourceCall('repaintVehicle', index, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);
				break;
			case 1:
				// Cargamos la pestaña de colores personalizados
				selectedColorType = index;

				// Activamos el panel
				$('#predefined').addClass('no-display');
				$('#custom').removeClass('no-display');

				// Repintamos el vehículo
				resourceCall('repaintVehicle', index, selectedFirstCustomColor, selectedSecondCustomColor, -1, 0);
				break;
		}

		// Añadimos la pestaña actual como activa
		$(this).addClass('active-tab');
	}
});

function getColorTypeIdentifier(typeDesc) {
	// Declaramos el identificador
	let identifier = 0;

	for(let i = 0; i < predefinedTypes.length; i++) {
		// Miramos si es del tipo seleccionado
		if(predefinedTypes[i].type == typeDesc) {
			// Devolvemos el identificador
			identifier = predefinedTypes[i].id;
			break;
		}
	}

	return identifier;
}

function getColorSublist(typeId) {
	// Declaramos la lista
	let colorSublist = [];

	for(let i = 0; i < predefinedColors.length; i++) {
		// Miramos si es del tipo seleccionado
		if(predefinedColors[i].type == typeId) {
			// Añadimos el color a la lista
			colorSublist.push(predefinedColors[i]);
		}
	}

	return colorSublist;
}

function getSelectedColorObject(colorId) {
	// Declaramos el color
	let color = {};

	for(let i = 0; predefinedColors.length; i++) {
		// Miramos si el identificador coincide
		if(predefinedColors[i].id == colorId) {
			color = predefinedColors[i];
			break;
		}
	}

	return color;
}

function showPrevColorType(colorOrder) {
	// Obtenemos la descripción del tipo
	let colorType = colorOrder == 0 ? $('#first-color-type').text() : $('#second-color-type').text();

	// Miramos el índice del color seleccionado
	for(let i = 0; i < predefinedTypes.length; i++) {
		if(predefinedTypes[i].type === colorType) {
			// Seleccionamos el índice anterior
			let index = i == 0 ? predefinedTypes.length - 1 : i - 1;

			// Elegimos el primer color de la lista
			let color = getColorSublist(index)[0];

			if(colorOrder == 0) {
				// Cambiamos el color primario
				$('#first-color-type').text(predefinedTypes[index].type);
				$('#first-color-desc').text(color.desc);
				$('#first-color-id').val(color.id);
				selectedFirstColor = color.id;
			} else {
				// Cambiamos el color secundario
				$('#second-color-type').text(predefinedTypes[index].type);
				$('#second-color-desc').text(color.desc);
				$('#second-color-id').val(color.id);
				selectedSecondColor = color.id;
			}

			// Cambiamos el color del vehículo
			resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);

			break;
		}
	}
}

function showNextColorType(colorOrder) {
	// Obtenemos la descripción del tipo
	let colorType = colorOrder == 0 ? $('#first-color-type').text() : $('#second-color-type').text();

	// Miramos el índice del color seleccionado
	for(let i = 0; i < predefinedTypes.length; i++) {
		if(predefinedTypes[i].type === colorType) {
			// Seleccionamos el índice siguiente
			let index = i == predefinedTypes.length - 1 ? 0 : i + 1;

			// Elegimos el primer color de la lista
			let color = getColorSublist(index)[0];

			if(colorOrder == 0) {
				// Cambiamos el color primario
				$('#first-color-type').text(predefinedTypes[index].type);
				$('#first-color-desc').text(color.desc);
				$('#first-color-id').val(color.id);
				selectedFirstColor = color.id;
			} else {
				// Cambiamos el color secundario
				$('#second-color-type').text(predefinedTypes[index].type);
				$('#second-color-desc').text(color.desc);
				$('#second-color-id').val(color.id);
				selectedSecondColor = color.id;
			}

			// Cambiamos el color del vehículo
			resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);

			break;
		}
	}
}

function showPrevColorDesc(colorOrder) {
	// Obtenemos la descripción del tipo
	let colorType = colorOrder == 0 ? $('#first-color-type').text() : $('#second-color-type').text();

	// Obtenemos el identificador del tipo
	let colorTypeId = getColorTypeIdentifier(colorType);

	// Obtenemos la sublista de colores
	let colorSublist = getColorSublist(colorTypeId);

	// Miramos el índice del color seleccionado
	for(let i = 0; i < colorSublist.length; i++) {
		if((colorSublist[i].id == selectedFirstColor && colorOrder == 0) || (colorSublist[i].id == selectedSecondColor && colorOrder == 1)) {
			// Seleccionamos el índice anterior
			let index = i == 0 ? colorSublist.length - 1 : i - 1;

			if(colorOrder == 0) {
				// Cambiamos el color primario
				$('#first-color-desc').text(colorSublist[index].desc);
				$('#first-color-id').val(colorSublist[index].id);
				selectedFirstColor = colorSublist[index].id;
			} else {
				// Cambiamos el color secundario
				$('#second-color-desc').text(colorSublist[index].desc);
				$('#second-color-id').val(colorSublist[index].id);
				selectedSecondColor = colorSublist[index].id;
			}

			// Cambiamos el color del vehículo
			resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);

			break;
		}
	}
}

function showNextColorDesc(colorOrder) {
	// Obtenemos la descripción del tipo
	let colorType = colorOrder == 0 ? $('#first-color-type').text() : $('#second-color-type').text();

	// Obtenemos el identificador del tipo
	let colorTypeId = getColorTypeIdentifier(colorType);

	// Obtenemos la sublista de colores
	let colorSublist = getColorSublist(colorTypeId);

	// Miramos el índice del color seleccionado
	for(let i = 0; i < colorSublist.length; i++) {
		if((colorSublist[i].id == selectedFirstColor && colorOrder == 0) || (colorSublist[i].id == selectedSecondColor && colorOrder == 1)) {
			// Seleccionamos el índice siguiente
			let index = i == colorSublist.length - 1 ? 0 : i + 1;

			if(colorOrder == 0) {
				// Cambiamos el color primario
				$('#first-color-desc').text(colorSublist[index].desc);
				$('#first-color-id').val(colorSublist[index].id);
				selectedFirstColor = colorSublist[index].id;
			} else {
				// Cambiamos el color secundario
				$('#second-color-desc').text(colorSublist[index].desc);
				$('#second-color-id').val(colorSublist[index].id);
				selectedSecondColor = colorSublist[index].id;
			}

			// Cambiamos el color del vehículo
			resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);

			break;
		}
	}
}

function selectPearlescentColor() {
	// Obtenemos el color
	selectedPearlescentColor = $('#pearlescent-color').val();

	// Cambiamos el color del vehículo
	resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, 0);
}

function acceptRepaint() {
	// Obtenemos el precio
	let price = $('#price').val();

	if(price > 0) {
		// Cambiamos el color del vehículo y cobramos
		resourceCall('repaintVehicle', selectedColorType, selectedFirstColor, selectedSecondColor, selectedPearlescentColor, price);
	}
}

function cancelRepaint() {
	resourceCall('cancelVehicleRepaint');
}

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
