//Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/character/character.js
let faceModel = {
	'firstHeadShape': 0, 'secondHeadShape': 0, 'firstSkinTone': 0, 'secondSkinTone': 0, 'headMix': 0.5, 'skinMix': 0.5, 'hairModel': 0, 'firstHairColor': 0, 'secondHairColor': 0,
	'beardModel': 0, 'beardColor': 0, 'chestModel': 0, 'chestColor': 0, 'blemishesModel': -1, 'ageingModel': -1, 'complexionModel': -1, 'sundamageModel': -1, 'frecklesModel': -1,
	'eyesColor': 0, 'eyebrowsModel': 0, 'eyebrowsColor': 0, 'makeupModel': -1, 'blushModel': -1, 'blushColor': 0, 'lipstickModel': -1, 'lipstickColor': 0, 'noseWidth': 0.0,
	'noseHeight': 0.0, 'noseLength': 0.0, 'noseBridge': 0.0, 'noseTip': 0.0, 'noseShift': 0.0, 'browHeight': 0.0, 'browWidth': 0.0, 'cheekboneHeight': 0.0, 'cheekboneWidth': 0.0,
	'cheeksWidth': 0.0, 'eyes': 0.0, 'lips': 0.0, 'jawWidth': 0.0, 'jawHeight': 0.0, 'chinLength': 0.0, 'chinPosition': 0.0, 'chinWidth': 0.0, 'chinShape': 0.0, 'neckWidth': 0.0
};

let camera = null;
let characters = null;

mp.events.add('yarp_showPlayerCharacters', (charactersJson) => {
	characters = charactersJson;
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
	mp.events.call('createBrowser', ['package://YARP/ui/html/sideMenu.html', 'populateCharacterList', charactersJson]);
});

mp.events.add('yarp_loadCharacter', (characterJson) => {
	mp.events.call('destroyBrowser');
	mp.events.callRemote('yarp_loadCharacter', characterJson);
	mp.game.invoke('0xB0C54402D009BA38');
});

mp.events.add('yarp_showCharacterCreationMenu', () => {
	mp.events.call('destroyBrowser');
	mp.events.callRemote('yarp_setCharacterIntoCreator');
	mp.game.invoke('0xB0C54402D009BA38');
	initializeCharacterCreation(mp.players.local);
	camera = mp.cameras.new('default', new mp.Vector3(152.6008, -1003.25, -98), new mp.Vector3(-20.0, 0.0, 0.0), 90);
  camera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	mp.game.ui.displayHud(false);
	mp.gui.chat.activate(false);
	mp.gui.chat.show(false);
	mp.events.call('createBrowser', ['package://YARP/ui/html/characterCreator.html']);
});

mp.events.add('yarp_updatePlayerSex', (sex) => {
	initializeCharacterCreation(mp.players.local);
	mp.events.callRemote('yarp_changeCharacterSex', sex);
});

mp.events.add('yarp_updatePlayerCreation', (partName, value, isPercentage) => {
	if(isPercentage) {
		value = parseFloat(value / 100);
	}
	faceModel[`${partName}`] = value;
	updatePlayerFace(mp.players.local, faceModel);
});

mp.events.add('yarp_cameraPointTo', (bodyPart) => {
	if(bodyPart == 0) {
		camera.setCoord(152.6008, -1003.25, -98);
	} else {
		camera.setCoord(152.3708, -1001.75, -98.3);
	}
});

mp.events.add('yarp_rotateCharacter', (rotation) => {
	mp.players.local.setHeading(rotation);
});

mp.events.add('yarp_characterNameDuplicated', () => {
	mp.events.call('executeFunction', ['showPlayerDuplicatedWarn']);
});

mp.events.add('yarp_acceptCharacterCreation', (name, age, model) => {
	let faceJson = JSON.stringify(faceModel);
	mp.events.callRemote('yarp_createCharacter', name, age, model, faceJson);
});

mp.events.add('yarp_cancelCharacterCreation', () => {
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
	camera.destroy();
	camera = null;
	mp.game.ui.displayHud(true);
	mp.gui.chat.activate(true);
	mp.gui.chat.show(true);
	mp.events.call('destroyBrowser');
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
	mp.events.call('createBrowser', ['package://YARP/ui/html/sideMenu.html', 'populateCharacterList', characters]);
});

mp.events.add('yarp_characterCreatedSuccessfully', () => {
	mp.game.cam.renderScriptCams(false, false, 0, true, false);
	camera.destroy();
	camera = null;
	mp.game.ui.displayHud(true);
	mp.gui.chat.activate(true);
	mp.gui.chat.show(true);
	mp.events.call('destroyBrowser');
});

mp.events.add('yarp_updatePlayerCustomSkin', (player, faceJson, tattooJson) => {
	let face = JSON.parse(faceJson);
	let tattoo = JSON.parse(tattooJson);
	updatePlayerFace(player, face);
	updatePlayerTattoos(player, tattoo);
});

function initializeCharacterCreation(player) {
	faceModel.firstHeadShape = player === 'undefined' ? 0 : player.getVariable('FIRST_HEAD_SHAPE');
	faceModel.secondHeadShape = player === 'undefined' ? 0 : player.getVariable('SECOND_HEAD_SHAPE');
	faceModel.firstSkinTone = player === 'undefined' ? 0 : player.getVariable('FIRST_SKIN_TONE');
	faceModel.secondSkinTone = player === 'undefined' ? 0 : player.getVariable('SECOND_SKIN_TONE');
	faceModel.headMix = player === 'undefined' ? 0.5 : player.getVariable('HEAD_MIX');
	faceModel.skinMix = player === 'undefined' ? 0.5 : player.getVariable('SKIN_MIX');
	faceModel.hairModel = player === 'undefined' ? 0 : player.getVariable('HAIR_MODEL');
	faceModel.firstHairColor = player === 'undefined' ? 0 : player.getVariable('FIRST_HAIR_COLOR');
	faceModel.secondHairColor = player === 'undefined' ? 0 : player.getVariable('SECOND_HAIR_COLOR');
	faceModel.beardModel = player === 'undefined' ? 0 : player.getVariable('BEARD_MODEL');
	faceModel.beardColor = player === 'undefined' ? 0 : player.getVariable('BEARD_COLOR');
	faceModel.chestModel = player === 'undefined' ? 0 : player.getVariable('CHEST_MODEL');
	faceModel.chestColor = player === 'undefined' ? 0 : player.getVariable('CHEST_COLOR');
	faceModel.blemishesModel = player === 'undefined' ? -1 : player.getVariable('BLEMISHES_MODEL');
	faceModel.ageingModel = player === 'undefined' ? -1 : player.getVariable('AGEING_MODEL');
	faceModel.complexionModel = player === 'undefined' ? -1 : player.getVariable('COMPLEXION_MODEL');
	faceModel.sundamageModel = player === 'undefined' ? -1 : player.getVariable('SUNDAMAGE_MODEL');
	faceModel.frecklesModel = player === 'undefined' ? -1 : player.getVariable('FRECKLES_MODEL');
	faceModel.eyesColor = player === 'undefined' ? 0 : player.getVariable('EYES_COLOR');
	faceModel.eyebrowsModel = player === 'undefined' ? 0 : player.getVariable('EYEBROWS_MODEL');
	faceModel.eyebrowsColor = player === 'undefined' ? 0 : player.getVariable('EYEBROWS_COLOR');
	faceModel.makeupModel = player === 'undefined' ? -1 : player.getVariable('MAKEUP_MODEL');
	faceModel.blushModel = player === 'undefined' ? -1 : player.getVariable('BLUSH_MODEL');
	faceModel.blushColor = player === 'undefined' ? 0 : player.getVariable('BLUSH_COLOR');
	faceModel.lipstickModel = player === 'undefined' ? -1 : player.getVariable('LIPSTICK_MODEL');
	faceModel.lipstickColor = player === 'undefined' ? 0 : player.getVariable('LIPSTICK_COLOR');
	faceModel.noseWidth = player === 'undefined' ? 0.0 : player.getVariable('NOSE_WIDTH');
	faceModel.noseHeight = player === 'undefined' ? 0.0 : player.getVariable('NOSE_HEIGHT');
	faceModel.noseLength = player === 'undefined' ? 0.0 : player.getVariable('NOSE_LENGTH');
	faceModel.noseBridge = player === 'undefined' ? 0.0 : player.getVariable('NOSE_BRIDGE');
	faceModel.noseTip = player === 'undefined' ? 0.0 : player.getVariable('NOSE_TIP');
	faceModel.noseShift = player === 'undefined' ? 0.0 : player.getVariable('NOSE_SHIFT');
	faceModel.browHeight = player === 'undefined' ? 0.0 : player.getVariable('BROW_HEIGHT');
	faceModel.browWidth = player === 'undefined' ? 0.0 : player.getVariable('BROW_WIDTH');
	faceModel.cheekboneHeight = player === 'undefined' ? 0.0 : player.getVariable('CHEEKBONE_HEIGHT');
	faceModel.cheekboneWidth = player === 'undefined' ? 0.0 : player.getVariable('CHEEKBONE_WIDTH');
	faceModel.cheeksWidth = player === 'undefined' ? 0.0 : player.getVariable('CHEEKS_WIDTH');
	faceModel.eyes = player === 'undefined' ? 0.0 : player.getVariable('EYES');
	faceModel.lips = player === 'undefined' ? 0.0 : player.getVariable('LIPS');
	faceModel.jawWidth = player === 'undefined' ? 0.0 : player.getVariable('JAW_WIDTH');
	faceModel.jawHeight = player === 'undefined' ? 0.0 : player.getVariable('JAW_HEIGHT');
	faceModel.chinLength = player === 'undefined' ? 0.0 : player.getVariable('CHIN_LENGTH');
	faceModel.chinPosition = player === 'undefined' ? 0.0 : player.getVariable('CHIN_POSITION');
	faceModel.chinWidth = player === 'undefined' ? 0.0 : player.getVariable('CHIN_WIDTH');
	faceModel.chinShape = player === 'undefined' ? 0.0 : player.getVariable('CHIN_SHAPE');
	faceModel.neckWidth = player === 'undefined' ? 0.0 : player.getVariable('NECK_WIDTH');

	return faceModel;
}

function updatePlayerFace(player, face) {
	player.setHeadBlendData(parseInt(face.firstHeadShape), parseInt(face.secondHeadShape), 0, parseInt(face.firstSkinTone), parseInt(face.secondSkinTone), 0, parseInt(face.headMix), parseInt(face.skinMix), 0, false);
	player.setComponentVariation(2, parseInt(face.hairModel), 0, 0);
	player.setHairColor(parseInt(face.firstHairColor), parseInt(face.secondHairColor));
	player.setEyeColor(parseInt(face.eyesColor));
	player.setHeadOverlay(1, parseInt(face.beardModel), 0.99, parseInt(face.beardColor), 0);
	player.setHeadOverlay(10, parseInt(face.chestModel), 0.99, parseInt(face.chestColor), 0);
	player.setHeadOverlay(2, parseInt(face.eyebrowsModel), 0.99, parseInt(face.eyebrowsColor), 0);
	player.setHeadOverlay(5, parseInt(face.blushModel), 0.99, parseInt(face.blushColor), 0);
	player.setHeadOverlay(8, parseInt(face.lipstickModel), 0.99, parseInt(face.lipstickColor), 0);
	player.setHeadOverlay(0, parseInt(face.blemishesModel), 0.99, 0, 0);
	player.setHeadOverlay(3, parseInt(face.ageingModel), 0.99, 0, 0);
	player.setHeadOverlay(6, parseInt(face.complexionModel), 0.99, 0, 0);
	player.setHeadOverlay(7, parseInt(face.sundamageModel), 0.99, 0, 0);
	player.setHeadOverlay(9, parseInt(face.frecklesModel), 0.99, 0, 0);
	player.setHeadOverlay(4, parseInt(face.makeupModel), 0.99, 0, 0);
	player.setFaceFeature(0, parseInt(face.noseWidth));
	player.setFaceFeature(1, parseInt(face.noseHeight));
	player.setFaceFeature(2, parseInt(face.noseLength));
	player.setFaceFeature(3, parseInt(face.noseBridge));
	player.setFaceFeature(4, parseInt(face.noseTip));
	player.setFaceFeature(5, parseInt(face.noseShift));
	player.setFaceFeature(6, parseInt(face.browHeight));
	player.setFaceFeature(7, parseInt(face.browWidth));
	player.setFaceFeature(8, parseInt(face.cheekboneHeight));
	player.setFaceFeature(9, parseInt(face.cheekboneWidth));
	player.setFaceFeature(10, parseInt(face.cheeksWidth));
	player.setFaceFeature(11, parseInt(face.eyes));
	player.setFaceFeature(12, parseInt(face.lips));
	player.setFaceFeature(13, parseInt(face.jawWidth));
	player.setFaceFeature(14, parseInt(face.jawHeight));
	player.setFaceFeature(15, parseInt(face.chinLength));
	player.setFaceFeature(16, parseInt(face.chinPosition));
	player.setFaceFeature(17, parseInt(face.chinWidth));
	player.setFaceFeature(18, parseInt(face.chinShape));
	player.setFaceFeature(19, parseInt(face.neckWidth));
}

function updatePlayerTattoos(player, tattooArray) {
	for (let i = 0; i < tattooArray.length; i++) {
		let library = mp.game.joaat(tattooArray[i].library);
		let hash = mp.game.joaat(tattooArray[i].hash);
		player.setDecoration(library, hash);
	}
}
