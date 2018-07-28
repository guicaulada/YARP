'use strict';
/**
* @file Character events
* @namespace client.character
*/

// Credits to https://github.com/xabier1989/WiredPlayers-RP/blob/master/client_packages/WiredPlayers/character/character.js

let faceModel = {
  'firstHeadShape': 0, 'secondHeadShape': 0, 'firstSkinTone': 0, 'secondSkinTone': 0, 'headMix': 0.5, 'skinMix': 0.5, 'hairModel': 0, 'firstHairColor': 0, 'secondHairColor': 0,
  'beardModel': 0, 'beardColor': 0, 'chestModel': 0, 'chestColor': 0, 'blemishesModel': -1, 'ageingModel': -1, 'complexionModel': -1, 'sundamageModel': -1, 'frecklesModel': -1,
  'eyesColor': 0, 'eyebrowsModel': 0, 'eyebrowsColor': 0, 'makeupModel': -1, 'blushModel': -1, 'blushColor': 0, 'lipstickModel': -1, 'lipstickColor': 0, 'noseWidth': 0.0,
  'noseHeight': 0.0, 'noseLength': 0.0, 'noseBridge': 0.0, 'noseTip': 0.0, 'noseShift': 0.0, 'browHeight': 0.0, 'browWidth': 0.0, 'cheekboneHeight': 0.0, 'cheekboneWidth': 0.0,
  'cheeksWidth': 0.0, 'eyes': 0.0, 'lips': 0.0, 'jawWidth': 0.0, 'jawHeight': 0.0, 'chinLength': 0.0, 'chinPosition': 0.0, 'chinWidth': 0.0, 'chinShape': 0.0, 'neckWidth': 0.0,
};

let camera = null;
let characters = null;

/**
 * Show user characters on side menu.
 * @event showPlayerCharacters
 * @memberof client.character
 * @param {string} charactersJson - User characters JSON.
 * @fires createBrowser
 */
mp.events.add('showPlayerCharacters', (charactersJson) => {
  characters = charactersJson;
  mp.game.ui.displayRadar(false);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.events.call('createBrowser', 'character', ['package://YARP/ui/html/sideMenu.html', 'populateCharacterList', charactersJson], true, true);
});

/**
 * Load the caracter data.
 * @event loadCharacter
 * @memberof client.character
 * @param {string} id - Character name.
 * @fires loadCharacter
 */
mp.events.add('loadCharacter', (id) => {
  mp.events.call('destroyBrowser', 'character');
  mp.game.ui.displayRadar(true);
  mp.events.callRemote('loadCharacter', id);
  mp.game.invoke('0x95C0A5BBDC189AA1');
});

/**
 * Displays the character creation menu.
 * @event showCharacterCreationMenu
 * @memberof client.character
 * @fires createBrowser
 */
mp.events.add('showCharacterCreationMenu', () => {
  mp.game.ui.displayRadar(false);
  mp.events.callRemote('setCharacterIntoCreator');
  mp.game.invoke('0x95C0A5BBDC189AA1');
  initializeCharacterCreation(mp.players.local);
  camera = mp.cameras.new('default', new mp.Vector3(152.6008, -1003.25, -98), new mp.Vector3(-20.0, 0.0, 0.0), 90);
  camera.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
  mp.game.ui.displayHud(false);
  mp.gui.chat.activate(false);
  mp.gui.chat.show(false);
  mp.events.call('createBrowser', 'character', ['package://YARP/ui/html/characterCreator.html']);
});

/**
 * Changes the character model.
 * @event updatePlayerModel
 * @memberof client.character
 * @param {string} model - Ped model.
 * @fires changeCharacterModel
 */
mp.events.add('updatePlayerModel', (model) => {
  initializeCharacterCreation(mp.players.local);
  mp.events.callRemote('changeCharacterModel', model);
});

/**
 * Update character creation.
 * @event updatePlayerCreation
 * @memberof client.character
 * @param {string} partName - The part name.
 * @param {number} value - The part value.
 * @param {boolean} isPercentage - If the value is a parcentage or not.
 */
mp.events.add('updatePlayerCreation', (partName, value, isPercentage) => {
  if (isPercentage) {
    value = parseFloat(value / 100);
  }
  faceModel[`${partName}`] = value;
  updatePlayerFace(mp.players.local, faceModel);
});

/**
 * Switches focus between body and face.
 * @event cameraPointTo
 * @memberof client.character
 * @param {number} bodyPart - Body or face (0/1).
 */
mp.events.add('cameraPointTo', (bodyPart) => {
  if (bodyPart == 0) {
    camera.setCoord(152.6008, -1003.25, -98);
  } else {
    camera.setCoord(152.3708, -1001.75, -98.3);
  }
});

/**
 * Sets the character heading.
 * @event rotateCharacter
 * @memberof client.character
 * @param {number} rotation - Heading.
 */
mp.events.add('rotateCharacter', (rotation) => {
  mp.players.local.setHeading(rotation);
});

/**
 * Warns that the character name is a duplicate.
 * @event characterNameDuplicated
 * @memberof client.character
 * @fires browserExecute
 */
mp.events.add('characterNameDuplicated', () => {
  mp.events.call('browserExecute', 'character', ['showPlayerDuplicatedWarn']);
});

/**
 * Tries to create the character.
 * @event acceptCharacterCreation
 * @memberof client.character
 * @param {string} name - Character name.
 * @param {number} age - Character age.
 * @param {string} model - Character model (male/female).
 * @fires createCharacter
 */
mp.events.add('acceptCharacterCreation', (name, age, model) => {
  let faceJson = JSON.stringify(faceModel);
  mp.events.callRemote('createCharacter', name, age, model, faceJson);
});

/**
 * Cancels and exits character creation.
 * @event cancelCharacterCreation
 * @memberof client.character
 * @fires createBrowser
 */
mp.events.add('cancelCharacterCreation', () => {
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
  camera.destroy();
  camera = null;
  mp.game.ui.displayHud(true);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.events.call('createBrowser', 'character', ['package://YARP/ui/html/sideMenu.html', 'populateCharacterList', characters], true, true);
});

/**
 * Cancels and exits character creation.
 * @event characterCreatedSuccessfully
 * @memberof client.character
 * @fires destroyBrowser
 */
mp.events.add('characterCreatedSuccessfully', () => {
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
  camera.destroy();
  camera = null;
  mp.game.ui.displayHud(true);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.events.call('destroyBrowser', 'character');
});

/**
 * Updates player features.
 * @event updatePlayerCustomSkin
 * @memberof client.character
 * @param {object} player - The player to be updated.
 * @param {string} faceJson - The face data in JSON.
 * @param {string} tattooJson - The tattoo data in JSON.
 */
mp.events.add('updatePlayerCustomSkin', (player, faceJson, tattooJson) => {
  let face = JSON.parse(faceJson);
  let tattoo = JSON.parse(tattooJson);
  updatePlayerFace(player, face);
  updatePlayerTattoos(player, tattoo);
});

/**
 * Initializes player features.
 * @function initializeCharacterCreation
 * @memberof client.character
 * @param {object} player - The player to initialize.
 * @return {object} - The face model.
 */
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

/**
 * Updates player features.
 * @function updatePlayerFace
 * @memberof client.character
 * @param {object} player - The player to update.
 * @param {object} face - The face object.
 */
function updatePlayerFace(player, face) {
  player.setHeadBlendData(Number(face.firstHeadShape), Number(face.secondHeadShape), 0,
    Number(face.firstSkinTone), Number(face.secondSkinTone), 0, Number(face.headMix),
    Number(face.skinMix), 0, false);
  player.setComponentVariation(2, Number(face.hairModel), 0, 0);
  player.setHairColor(Number(face.firstHairColor), Number(face.secondHairColor));
  player.setEyeColor(Number(face.eyesColor));
  player.setHeadOverlay(1, Number(face.beardModel), 0.99, Number(face.beardColor), 0);
  player.setHeadOverlay(10, Number(face.chestModel), 0.99, Number(face.chestColor), 0);
  player.setHeadOverlay(2, Number(face.eyebrowsModel), 0.99, Number(face.eyebrowsColor), 0);
  player.setHeadOverlay(5, Number(face.blushModel), 0.99, Number(face.blushColor), 0);
  player.setHeadOverlay(8, Number(face.lipstickModel), 0.99, Number(face.lipstickColor), 0);
  player.setHeadOverlay(0, Number(face.blemishesModel), 0.99, 0, 0);
  player.setHeadOverlay(3, Number(face.ageingModel), 0.99, 0, 0);
  player.setHeadOverlay(6, Number(face.complexionModel), 0.99, 0, 0);
  player.setHeadOverlay(7, Number(face.sundamageModel), 0.99, 0, 0);
  player.setHeadOverlay(9, Number(face.frecklesModel), 0.99, 0, 0);
  player.setHeadOverlay(4, Number(face.makeupModel), 0.99, 0, 0);
  player.setFaceFeature(0, Number(face.noseWidth));
  player.setFaceFeature(1, Number(face.noseHeight));
  player.setFaceFeature(2, Number(face.noseLength));
  player.setFaceFeature(3, Number(face.noseBridge));
  player.setFaceFeature(4, Number(face.noseTip));
  player.setFaceFeature(5, Number(face.noseShift));
  player.setFaceFeature(6, Number(face.browHeight));
  player.setFaceFeature(7, Number(face.browWidth));
  player.setFaceFeature(8, Number(face.cheekboneHeight));
  player.setFaceFeature(9, Number(face.cheekboneWidth));
  player.setFaceFeature(10, Number(face.cheeksWidth));
  player.setFaceFeature(11, Number(face.eyes));
  player.setFaceFeature(12, Number(face.lips));
  player.setFaceFeature(13, Number(face.jawWidth));
  player.setFaceFeature(14, Number(face.jawHeight));
  player.setFaceFeature(15, Number(face.chinLength));
  player.setFaceFeature(16, Number(face.chinPosition));
  player.setFaceFeature(17, Number(face.chinWidth));
  player.setFaceFeature(18, Number(face.chinShape));
  player.setFaceFeature(19, Number(face.neckWidth));
}

/**
 * Updates player features.
 * @function updatePlayerTattoos
 * @memberof client.character
 * @param {object} player - The player to update.
 * @param {Array<object>} tattooArray - Object tattoo with hash and library.
 */
function updatePlayerTattoos(player, tattooArray) {
  for (let i = 0; i < tattooArray.length; i++) {
    let library = mp.game.joaat(tattooArray[i].library);
    let hash = mp.game.joaat(tattooArray[i].hash);
    player.setDecoration(library, hash);
  }
}
