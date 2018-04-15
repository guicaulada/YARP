let currentFatherFace = 0;
let currentMotherFace = 0;
let currentFatherSkin = 0;
let currentMotherSkin = 0;
let currentHairModel = 0;
let currentHairFirstColor = 0;
let currentHairSecondColor = 0;
let currentBeardModel = -1;
let currentBeardColor = 0;
let currentChestModel = -1;
let currentChestColor = 0;
let currentBlemishesModel = -1;
let currentAgeingModel = -1;
let currentComplexionModel = -1;
let currentSundamageModel = -1;
let currentFrecklesModel = -1;
let currentEyesColor = 0;
let currentEyebrowsModel = 0;
let currentEyebrowsColor = 0;
let currentMakeupModel = -1;
let currentMakeupColor = 0;
let currentBlushModel = -1;
let currentBlushColor = 0;
let currentLipstickModel = -1;
let currentLipstickColor = 0;
let currentModel = 'mp_m_freemode_01';

function hideError() {
	$('#error').addClass('no-display');
}

function toggleMenu() {
	$('#slider').slideToggle('slow');
}

function toggleCharacterInfo() {
	if($('#character-customize').is(':hidden') == false) {
		$('#character-customize').fadeOut('slow');
	}
	$('#basic-info').slideToggle('slow');
}

function toggleCharacterCustomize() {
	if($('#basic-info').is(':hidden') == false) {
		$('#basic-info').fadeOut('slow');
	}
	$('#character-customize').slideToggle('slow');
}

$('div#sex').on('click', 'img', function() {
	if($(this).hasClass('enabled') == false) {
		currentModel = 'mp_m_freemode_01';
		if($('#sex-male').hasClass('enabled') == true) {
			$('#sex-male').attr('src', '../img/character/male-disabled.png');
			$('#sex-female').attr('src', '../img/character/female-enabled.png');
			$('#sex-male').removeClass('enabled');
			$('#sex-female').addClass('enabled');
			currentModel = 'mp_f_freemode_01';
		} else {
			$('#sex-male').attr('src', '../img/character/male-enabled.png');
			$('#sex-female').attr('src', '../img/character/female-disabled.png');
			$('#sex-female').removeClass('enabled');
			$('#sex-male').addClass('enabled');
		}
		mp.trigger('updatePlayerModel', currentModel);
	}
});

$('nav#slider ul').on('click', 'li', function() {
	// Miramos qué indice tiene la opción pulsada
	let position = $(this).index();
	let text = $(this).text();

	// Ocultamos el menú
	$('#slider').slideToggle('fast');

	// Miramos qué opción se ha pulsado
	$.each($('#option-panels > div'), function(index, value) {
		if(index == position) {
			$(this).removeClass('no-display');
			$('#current-option').text(text);
		} else {
			$(this).addClass('no-display');
		}
	});
});

function createCharacter() {
	if($.trim($('#character-name').val()).length == 0) {
		$('#error-message').html('Your character needs a name');
		$('#error').removeClass('no-display');
	} else if($.trim($('#character-surname').val()).length == 0) {
		$('#error-message').html('Your character needs a surname');
		$('#error').removeClass('no-display');
	} else {
		let characterAge = $('#age').val();
		let characterName = $('#character-name').val()[0].toUpperCase() + $('#character-name').val().substr(1);
		let characterSurname = $('#character-surname').val()[0].toUpperCase() + $('#character-surname').val().substr(1);
		mp.trigger('acceptCharacterCreation', characterName.trim() + ' ' + characterSurname.trim(), characterAge, currentModel);
	}
}

function cancelCreation() {
	// Cancelamos la creación del personaje
	mp.trigger('cancelCharacterCreation');
}

function showPlayerDuplicatedWarn() {
	$('#error-message').html('There already is a character with this name');
	$('#error').removeClass('no-display');
}

function cameraPointTo(part) {
	// Cambiamos la zona a la que apunta la cámara
	mp.trigger('cameraPointTo', part);
}

function rotateCharacter() {
    var rotation = parseFloat(document.getElementById('character-slider').value);
	mp.trigger('rotateCharacter', rotation);
}

function showPrevFatherFace() {
	if(currentFatherFace == 0) {
		currentFatherFace = 41;
	} else {
		currentFatherFace--;
	}
	$('#face-father-shape').text('Type ' + (currentFatherFace + 1));
	mp.trigger('updatePlayerCreation', 'firstHeadShape', currentFatherFace, false);
}

function showNextFatherFace() {
	if(currentFatherFace == 41) {
		currentFatherFace = 0;
	} else {
		currentFatherFace++;
	}
	$('#face-father-shape').text('Type ' + (currentFatherFace + 1));
	mp.trigger('updatePlayerCreation', 'firstHeadShape', currentFatherFace, false);
}

function showPrevMotherFace() {
	if(currentMotherFace == 0) {
		currentMotherFace = 41;
	} else {
		currentMotherFace--;
	}
	$('#face-mother-shape').text('Type ' + (currentMotherFace - 1));
	mp.trigger('updatePlayerCreation', 'secondHeadShape', currentMotherFace, false);
}

function showNextMotherFace() {
	if(currentMotherFace == 41) {
		currentMotherFace = 0;
	} else {
		currentMotherFace++;
	}
	$('#face-mother-shape').text('Type ' + (currentMotherFace - 1));
	mp.trigger('updatePlayerCreation', 'secondHeadShape', currentMotherFace, false);
}

function showPrevFatherSkin() {
	if(currentFatherSkin == 0) {
		currentFatherSkin = 45;
	} else {
		currentFatherSkin--;
	}
	$('#father-skin').text('Type ' + (currentFatherSkin + 1));
	mp.trigger('updatePlayerCreation', 'firstSkinTone', currentFatherSkin, false);
}

function showNextFatherSkin() {
	if(currentFatherSkin == 45) {
		currentFatherSkin = 0;
	} else {
		currentFatherSkin++;
	}
	$('#father-skin').text('Type ' + (currentFatherSkin + 1));
	mp.trigger('updatePlayerCreation', 'firstSkinTone', currentFatherSkin, false);
}

function showPrevMotherSkin() {
	if(currentMotherSkin == 0) {
		currentMotherSkin = 45;
	} else {
		currentMotherSkin--;
	}
	$('#mother-skin').text('Type ' + (currentMotherSkin + 1));
	mp.trigger('updatePlayerCreation', 'secondSkinTone', currentMotherSkin, false);
}

function showNextMotherSkin() {
	if(currentMotherSkin == 45) {
		currentMotherSkin = 0;
	} else {
		currentMotherSkin++;
	}
	$('#mother-skin').text('Type ' + (currentMotherSkin + 1));
	mp.trigger('updatePlayerCreation', 'secondSkinTone', currentMotherSkin, false);
}

function updateFaceMix() {
	let faceMixValue = document.getElementById('headMix').value;
	mp.trigger('updatePlayerCreation', 'headMix', faceMixValue, true);
}

function updateSkinMix() {
	let skinMixValue = document.getElementById('skinMix').value;
	mp.trigger('updatePlayerCreation', 'skinMix', skinMixValue, true);
}

function showPrevHairModel() {
	if(currentHairModel == 0) {
		currentHairModel = 38;
	} else if(currentHairModel == 24) {
		currentHairModel = currentHairModel - 2;
	} else {
	    currentHairModel--;
    }
	$('#hair-model').text('Type ' + (currentHairModel + 1));
	mp.trigger('updatePlayerCreation', 'hairModel', currentHairModel, false);
}

function showNextHairModel() {
	if(currentHairModel == 38) {
		currentHairModel = 0;
	} else if (currentHairModel == 22) {
	    currentHairModel = currentHairModel + 2;
	} else {
		currentHairModel++;
	}
	$('#hair-model').text('Type ' + (currentHairModel + 1));

	mp.trigger('updatePlayerCreation', 'hairModel', currentHairModel, false);
}

function showPrevHairFirstColor() {
	if(currentHairFirstColor == 0) {
		currentHairFirstColor = 63;
	} else {
		currentHairFirstColor--;
	}
	$('#hair-first-color').text('Type ' + (currentHairFirstColor + 1));
	mp.trigger('updatePlayerCreation', 'firstHairColor', currentHairFirstColor, false);
}

function showNextHairFirstColor() {
	if(currentHairFirstColor == 63) {
		currentHairFirstColor = 0;
	} else {
		currentHairFirstColor++;
	}
	$('#hair-first-color').text('Type ' + (currentHairFirstColor + 1));
	mp.trigger('updatePlayerCreation', 'firstHairColor', currentHairFirstColor, false);
}

function showPrevHairSecondColor() {
	if(currentHairSecondColor == 0) {
		currentHairSecondColor = 63;
	} else {
		currentHairSecondColor--;
	}
	$('#hair-second-color').text('Type ' + (currentHairSecondColor + 1));
	mp.trigger('updatePlayerCreation', 'secondHairColor', currentHairSecondColor, false);
}

function showNextHairSecondColor() {
	if(currentHairSecondColor == 63) {
		currentHairSecondColor = 0;
	} else {
		currentHairSecondColor++;
	}
	$('#hair-second-color').text('Type ' + (currentHairSecondColor + 1));
	mp.trigger('updatePlayerCreation', 'secondHairColor', currentHairSecondColor, false);
}

function showPrevBeardModel() {
	if(currentBeardModel == -1) {
		currentBeardModel = 29;
	} else {
		currentBeardModel--;
	}
	if(currentBeardModel == -1) {
		$('#beard-model').text('No beard');
	} else {
		$('#beard-model').text('Type ' + (currentBeardModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'beardModel', currentBeardModel, false);
}

function showNextBeardModel() {
	if(currentBeardModel == 29) {
		currentBeardModel = -1;
	} else {
		currentBeardModel++;
	}
	if(currentBeardModel == -1) {
		$('#beard-model').text('No beard');
	} else {
		$('#beard-model').text('Type ' + (currentBeardModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'beardModel', currentBeardModel, false);
}

function showPrevBeardColor() {
	if(currentBeardColor == 0) {
		currentBeardColor = 63;
	} else {
		currentBeardColor--;
	}
	$('#beard-color').text('Type ' + (currentBeardColor + 1));
	mp.trigger('updatePlayerCreation', 'beardColor', currentBeardColor, false);
}

function showNextBeardColor() {
	if(currentBeardColor == 63) {
		currentBeardColor = 0;
	} else {
		currentBeardColor++;
	}
	$('#beard-color').text('Type ' + (currentBeardColor + 1));
	mp.trigger('updatePlayerCreation', 'beardColor', currentBeardColor, false);
}

function showPrevChestModel() {
	if(currentChestModel == -1) {
		currentChestModel = 17;
	} else {
		currentChestModel--;
	}
	if(currentChestModel == -1) {
		$('#chest-model').text('No hair');
	} else {
		$('#chest-model').text('Type ' + (currentChestModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'chestModel', currentChestModel, false);
}

function showNextChestModel() {
	if(currentChestModel == 17) {
		currentChestModel = -1;
	} else {
		currentChestModel++;
	}
	if(currentChestModel == -1) {
		$('#chest-model').text('No hair');
	} else {
		$('#chest-model').text('Type ' + (currentChestModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'chestModel', currentChestModel, false);
}

function showPrevChestColor() {
	if(currentChestColor == 0) {
		currentChestColor = 63;
	} else {
		currentChestColor--;
	}
	$('#chest-color').text('Type ' + (currentChestColor + 1));
	mp.trigger('updatePlayerCreation', 'chestColor', currentChestColor, false);
}

function showNextChestColor() {
	if(currentChestColor == 63) {
		currentChestColor = 0;
	} else {
		currentChestColor++;
	}
	$('#chest-color').text('Type ' + (currentChestColor + 1));
	mp.trigger('updatePlayerCreation', 'chestColor', currentChestColor, false);
}

function showPrevBlemishesModel() {
	if(currentBlemishesModel == -1) {
		currentBlemishesModel = 24;
	} else {
		currentBlemishesModel--;
	}
	if(currentBlemishesModel == -1) {
		$('#blemishes-model').text('No blemishes');
	} else {
		$('#blemishes-model').text('Type ' + (currentBlemishesModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'blemishesModel', currentBlemishesModel, false);
}

function showNextBlemishesModel() {
	if(currentBlemishesModel == 24) {
		currentBlemishesModel = -1;
	} else {
		currentBlemishesModel++;
	}
	if(currentBlemishesModel == -1) {
		$('#blemishes-model').text('No blemishes');
	} else {
		$('#blemishes-model').text('Type ' + (currentBlemishesModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'blemishesModel', currentBlemishesModel, false);
}

function showPrevAgeingModel() {
	if(currentAgeingModel == -1) {
		currentAgeingModel = 15;
	} else {
		currentAgeingModel--;
	}
	if(currentAgeingModel == -1) {
		$('#ageing-model').text('No ageing');
	} else {
		$('#ageing-model').text('Type ' + (currentAgeingModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'ageingModel', currentAgeingModel, false);
}

function showNextAgeingModel() {
	if(currentAgeingModel == 15) {
		currentAgeingModel = -1;
	} else {
		currentAgeingModel++;
	}
	if(currentAgeingModel == -1) {
		$('#ageing-model').text('No ageing');
	} else {
		$('#ageing-model').text('Type ' + (currentAgeingModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'ageingModel', currentAgeingModel, false);
}

function showPrevComplexionModel() {
	if(currentComplexionModel == -1) {
		currentComplexionModel = 12;
	} else {
		currentComplexionModel--;
	}
	if(currentComplexionModel == -1) {
		$('#complexion-model').text('No complexion');
	} else {
		$('#complexion-model').text('Type ' + (currentComplexionModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'complexionModel', currentComplexionModel, false);
}

function showNextComplexionModel() {
	if(currentComplexionModel == 12) {
		currentComplexionModel = -1;
	} else {
		currentComplexionModel++;
	}
	if(currentComplexionModel == -1) {
		$('#complexion-model').text('No complexion');
	} else {
		$('#complexion-model').text('Type ' + (currentComplexionModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'complexionModel', currentComplexionModel, false);
}

function showPrevSundamageModel() {
	if(currentSundamageModel == -1) {
		currentSundamageModel = 11;
	} else {
		currentSundamageModel--;
	}
	if(currentSundamageModel == -1) {
		$('#sundamage-model').text('No sunburn');
	} else {
		$('#sundamage-model').text('Type ' + (currentSundamageModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'sundamageModel', currentSundamageModel, false);
}

function showNextSundamageModel() {
	if(currentSundamageModel == 11) {
		currentSundamageModel = -1;
	} else {
		currentSundamageModel++;
	}
	if(currentSundamageModel == -1) {
		$('#sundamage-model').text('No sunburn');
	} else {
		$('#sundamage-model').text('Type ' + (currentSundamageModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'sundamageModel', currentSundamageModel, false);
}

function showPrevFrecklesModel() {
	if(currentFrecklesModel == -1) {
		currentFrecklesModel = 18;
	} else {
		currentFrecklesModel--;
	}
	if(currentFrecklesModel == -1) {
		$('#freckles-model').text('No freckles');
	} else {
		$('#freckles-model').text('Type ' + (currentFrecklesModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'frecklesModel', currentFrecklesModel, false);
}

function showNextFrecklesModel() {
	if(currentFrecklesModel == 18) {
		currentFrecklesModel = -1;
	} else {
		currentFrecklesModel++;
	}
	if(currentFrecklesModel == -1) {
		$('#freckles-model').text('No freckles');
	} else {
		$('#freckles-model').text('Type ' + (currentFrecklesModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'frecklesModel', currentFrecklesModel, false);
}

function showPrevEyesColor() {
	if(currentEyesColor == 0) {
		currentEyesColor = 31;
	} else {
		currentEyesColor--;
	}
	$('#eyes-color').text('Type ' + (currentEyesColor + 1));
	mp.trigger('updatePlayerCreation', 'eyesColor', currentEyesColor, false);
}

function showNextEyesColor() {
	if(currentEyesColor == 31) {
		currentEyesColor = 0;
	} else {
		currentEyesColor++;
	}
	$('#eyes-color').text('Type ' + (currentEyesColor + 1));
	mp.trigger('updatePlayerCreation', 'eyesColor', currentEyesColor, false);
}

function showPrevEyebrowsModel() {
	if(currentEyebrowsModel == 0) {
		currentEyebrowsModel = 33;
	} else {
		currentEyebrowsModel--;
	}
	$('#eyebrows-model').text('Type ' + (currentEyebrowsModel + 1));
	mp.trigger('updatePlayerCreation', 'eyebrowsModel', currentEyebrowsModel, false);
}

function showNextEyebrowsModel() {
	if(currentEyebrowsModel == 33) {
		currentEyebrowsModel = 0;
	} else {
		currentEyebrowsModel++;
	}
	$('#eyebrows-model').text('Type ' + (currentEyebrowsModel + 1));
	mp.trigger('updatePlayerCreation', 'eyebrowsModel', currentEyebrowsModel, false);
}

function showPrevEyebrowsColor() {
	if(currentEyebrowsColor == 0) {
		currentEyebrowsColor = 63;
	} else {
		currentEyebrowsColor--;
	}
	$('#eyebrows-color').text('Type ' + (currentEyebrowsColor + 1));
	mp.trigger('updatePlayerCreation', 'eyebrowsColor', currentEyebrowsColor, false);
}

function showNextEyebrowsColor() {
	if(currentEyebrowsColor == 63) {
		currentEyebrowsColor = 0;
	} else {
		currentEyebrowsColor++;
	}
	$('#eyebrows-color').text('Type ' + (currentEyebrowsColor + 1));
	mp.trigger('updatePlayerCreation', 'eyebrowsColor', currentEyebrowsColor, false);
}

function updateA() {
	let aValue = document.getElementById('a').value;
	mp.trigger('updatePlayerCreation', 'noseWidth', aValue, true);
}

function updateB() {
	let bValue = document.getElementById('b').value;
	mp.trigger('updatePlayerCreation', 'noseHeight', bValue, true);
}

function updateC() {
	let bValue = document.getElementById('c').value;
	mp.trigger('updatePlayerCreation', 'noseLength', bValue, true);
}

function updateD() {
	let bValue = document.getElementById('d').value;
	mp.trigger('updatePlayerCreation', 'noseBridge', bValue, true);
}

function updateE() {
	let bValue = document.getElementById('e').value;
	mp.trigger('updatePlayerCreation', 'noseTip', bValue, true);
}

function updateF() {
	let bValue = document.getElementById('f').value;
	mp.trigger('updatePlayerCreation', 'noseShift', bValue, true);
}

function updateG() {
	let bValue = document.getElementById('g').value;
	mp.trigger('updatePlayerCreation', 'browHeight', bValue, true);
}

function updateH() {
	let bValue = document.getElementById('h').value;
	mp.trigger('updatePlayerCreation', 'browWidth', bValue, true);
}

function updateI() {
	let bValue = document.getElementById('i').value;
	mp.trigger('updatePlayerCreation', 'cheekboneHeight', bValue, true);
}

function updateJ() {
	let bValue = document.getElementById('j').value;
	mp.trigger('updatePlayerCreation', 'cheekboneWidth', bValue, true);
}

function updateK() {
	let bValue = document.getElementById('k').value;
	mp.trigger('updatePlayerCreation', 'cheeksWidth', bValue, true);
}

function updateL() {
	let bValue = document.getElementById('l').value;
	mp.trigger('updatePlayerCreation', 'eyes', bValue, true);
}

function updateM() {
	let bValue = document.getElementById('m').value;
	mp.trigger('updatePlayerCreation', 'lips', bValue, true);
}

function updateN() {
	let bValue = document.getElementById('n').value;
	mp.trigger('updatePlayerCreation', 'jawWidth', bValue, true);
}

function updateO() {
	let bValue = document.getElementById('o').value;
	mp.trigger('updatePlayerCreation', 'jawHeight', bValue, true);
}

function updateP() {
	let bValue = document.getElementById('p').value;
	mp.trigger('updatePlayerCreation', 'chinLength', bValue, true);
}

function updateQ() {
	let bValue = document.getElementById('q').value;
	mp.trigger('updatePlayerCreation', 'chinPosition', bValue, true);
}

function updateR() {
	let bValue = document.getElementById('r').value;
	mp.trigger('updatePlayerCreation', 'chinWidth', bValue, true);
}

function updateS() {
	let bValue = document.getElementById('s').value;
	mp.trigger('updatePlayerCreation', 'chinShape', bValue, true);
}

function updateT() {
	let bValue = document.getElementById('t').value;
	mp.trigger('updatePlayerCreation', 'neckWidth', bValue, true);
}

function showPrevMakeupModel() {
	if(currentMakeupModel == -1) {
		currentMakeupModel = 75;
	} else {
		currentMakeupModel--;
	}
	if(currentMakeupModel == -1) {
		$('#makeup-model').text('No makeup');
	} else {
		$('#makeup-model').text('Type ' + (currentMakeupModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'makeupModel', currentMakeupModel, false);
}

function showNextMakeupModel() {
	if(currentMakeupModel == 75) {
		currentMakeupModel = -1;
	} else {
		currentMakeupModel++;
	}
	if(currentMakeupModel == -1) {
		$('#makeup-model').text('No makeup');
	} else {
		$('#makeup-model').text('Type ' + (currentMakeupModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'makeupModel', currentMakeupModel, false);
}

function showPrevBlushModel() {
	if(currentBlushModel == -1) {
		currentBlushModel = 7;
	} else {
		currentBlushModel--;
	}
	if(currentBlushModel == -1) {
		$('#blush-model').text('No blush');
	} else {
		$('#blush-model').text('Type ' + (currentBlushModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'blushModel', currentBlushModel, false);
}

function showNextBlushModel() {
	if(currentBlushModel == 7) {
		currentBlushModel = -1;
	} else {
		currentBlushModel++;
	}
	if(currentBlushModel == -1) {
		$('#blush-model').text('No blush');
	} else {
		$('#blush-model').text('Type ' + (currentBlushModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'blushModel', currentBlushModel, false);
}

function showPrevBlushColor() {
	if(currentBlushColor == 0) {
		currentBlushColor = 63;
	} else {
		currentBlushColor--;
	}
	$('#blush-color').text('Type ' + (currentBlushColor + 1));
	mp.trigger('updatePlayerCreation', 'blushColor', currentBlushColor, false);
}

function showNextBlushColor() {
	if(currentBlushColor == 63) {
		currentBlushColor = 0;
	} else {
		currentBlushColor++;
	}
	$('#blush-color').text('Type ' + (currentBlushColor + 1));
	mp.trigger('updatePlayerCreation', 'blushColor', currentBlushColor, false);
}

function showPrevLipstickModel() {
	if(currentLipstickModel == -1) {
		currentLipstickModel = 10;
	} else {
		currentLipstickModel--;
	}
	if(currentLipstickModel == -1) {
		$('#lipstick-model').text('No lipstick');
	} else {
		$('#lipstick-model').text('Type ' + (currentLipstickModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'lipstickModel', currentLipstickModel, false);
}

function showNextLipstickModel() {
	if(currentLipstickModel == 10) {
		currentLipstickModel = -1;
	} else {
		currentLipstickModel++;
	}
	if(currentLipstickModel == -1) {
		$('#lipstick-model').text('No lipstick');
	} else {
		$('#lipstick-model').text('Type ' + (currentLipstickModel + 1));
	}
	mp.trigger('updatePlayerCreation', 'lipstickModel', currentLipstickModel, false);
}

function showPrevLipstickColor() {
	if(currentLipstickColor == 0) {
		currentLipstickColor = 63;
	} else {
		currentLipstickColor--;
	}
	$('#lipstick-color').text('Type ' + (currentLipstickColor + 1));
	mp.trigger('updatePlayerCreation', 'lipstickColor', currentLipstickColor, false);
}

function showNextLipstickColor() {
	if(currentLipstickColor == 63) {
		currentLipstickColor = 0;
	} else {
		currentLipstickColor++;
	}
	$('#lipstick-color').text('Type ' + (currentLipstickColor + 1));
	mp.trigger('updatePlayerCreation', 'lipstickColor', currentLipstickColor, false);
}

$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $('input[name=\''+fieldName+'\']');
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $('.btn-number[data-type=\'minus\'][data-field=\''+name+'\']').removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $('.btn-number[data-type=\'plus\'][data-field=\''+name+'\']').removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$('.input-number').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	});


/* Composure/Psycho */

$('.btn-age').on('click', function() {
	var $button = $(this);

	if ($button.attr('data-dir') == 'minus') {
		if ($('#age').val() > 12) {
			$('#age').val(parseInt($('#age').val()) - 1);
			if($('#age').val() < 90) {
				$('#btn-age-plus').attr('disabled', false);
			}
		} else {
			$button.attr('disabled', true);
		}
	} else if ($button.attr('data-dir') == 'plus') {
		if ($('#age').val() < 90) {
			$('#age').val(parseInt($('#age').val()) + 1);
			if($('#age').val() > 12) {
				$('#btn-age-minus').attr('disabled', false);
			}
		} else {
			$button.attr('disabled', true);
		}
	}
});
