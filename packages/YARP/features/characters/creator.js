'use strict';

let creatorData = require('./data.js');
let creatorDimension = 0;

yarp.server.sendToCreator = (player) => {
  yarp.client.fromClouds(player);
  player.position = yarp.variables['Character Creator'].value;
  player.heading = yarp.variables['Creator Heading'].value;
  player.dimension = creatorDimension;

  creatorDimension++;
};

yarp.server.buildCharacterMenu = (player, existing) => {
  // START MAIN MENU
  let menu = new yarp.Menu({
    id: 'Character Creator',
    offset: [0.01, 0.25],
  });

  let renamed = player.character.id != 'Character Creator';

  menu.add({
    type: 'input',
    displayText: 'Name',
    caption: `Your character's first name.`,
    disabled: existing,
    inputText: renamed ? player.character.id.split(' ')[0] : '',
    data: {},
  });

  menu.add({
    type: 'input',
    displayText: 'Surname',
    caption: `Your character's last name.`,
    disabled: existing,
    inputText: renamed ? player.character.id.split(' ')[1] : '',
    data: {},
  });

  let genders = [];
  for (let gender of ['Male', 'Female']) {
    genders.push({
      displayText: gender,
    });
  }

  menu.add({
    type: 'list',
    displayText: 'Gender',
    caption: `Changing this will reset your customization.`,
    items: genders,
    defaultIndex: player.character.customization.gender,
    data: {existing: existing},
  });
  // FINISH MAIN MENU

  // START PARENTS MENU
  let parentsMenu = {
    type: 'submenu',
    id: 'Parents',
    displayText: `Parents`,
    caption: `Your character's parents.`,
    items: [],
  };

  parentsMenu.items.push({
    displayText: 'Back',
  });

  let fathers = [];
  for (let father in creatorData.fathers) {
    if (creatorData.fathers.hasOwnProperty(father)) {
      fathers.push({
        displayText: father,
        data: {fatherId: creatorData.fathers[father]},
      });
      if (player.character.customization.parents.father == creatorData.fathers[father]) {
        fathers.default = fathers.length-1;
      }
    }
  }

  let mothers = [];
  for (let mother in creatorData.mothers) {
    if (creatorData.mothers.hasOwnProperty(mother)) {
      mothers.push({
        displayText: mother,
        data: {motherId: creatorData.mothers[mother]},
      });
      if (player.character.customization.parents.mother == creatorData.mothers[mother]) {
        mothers.default = mothers.length - 1;
      }
    }
  }

  parentsMenu.items.push({
    type: 'list',
    displayText: 'Father',
    caption: `Your character's father.`,
    items: fathers,
    defaultIndex: fathers.default,
    data: {},
  });

  parentsMenu.items.push({
    type: 'list',
    displayText: 'Mother',
    caption: `Your character's mother.`,
    items: mothers,
    defaultIndex: mothers.default,
    data: {},
  });

  parentsMenu.items.push({
    type: 'slider',
    displayText: 'Similarity',
    caption: 'Similarity to parents.\n(lower = feminine, higher = masculine)',
    min: 0,
    start: player.character.customization.parents.similarity,
    max: 1,
    step: 0.1,
  });

  parentsMenu.items.push({
    type: 'slider',
    displayText: 'Skin Similarity',
    caption: 'Skin color similarity to parents.\n(lower = feminine, higher = masculine)',
    min: 0,
    start: player.character.customization.parents.skinSimilarity,
    max: 1,
    step: 0.1,
  });

  menu.add(parentsMenu);
  // FINISH PARENTS MENU

  // START APPEARENCE MENU
  let appMenu = {
    type: 'submenu',
    id: 'Appearance',
    displayText: `Appearance`,
    caption: `Your character's appearance.`,
    items: [],
  };

  appMenu.items.push({
    displayText: 'Back',
  });

  let appID = 0;
  for (let appearence in creatorData.appearances) {
    if (creatorData.appearances.hasOwnProperty(appearence)) {
      let apps = [];
      for (let app of creatorData.appearances[appearence]) {
        apps.push({
          displayText: app,
          data: {appearanceId: appID, appId: apps.length},
        });
      }
      appMenu.items.push({
        type: 'list',
        displayText: appearence,
        caption: `Your character's ${appearence.toLowerCase()}.`,
        items: apps,
        defaultIndex: player.character.customization.appearance[appID].value == 255 ? 0 : player.character.customization.appearance[appID].value - 1,
        data: {appearanceId: appID},
      });
      appMenu.items.push({
        type: 'slider',
        displayText: 'Opacity',
        min: 0,
        start: player.character.customization.appearance[appID].opacity,
        max: 1,
        step: 0.1,
        data: {appearanceId: appID},
      });
      appID++;
    }
  }

  menu.add(appMenu);
  // FINISH APPEARENCE MENU


  // START FEATURES MENU
  let featMenu = {
    type: 'submenu',
    id: 'Features Main',
    displayText: `Features`,
    caption: `Your character's features.`,
    items: [],
  };

  featMenu.items.push({
    displayText: 'Back',
  });

  let featID = 0;
  for (let feature in creatorData.features) {
    if (creatorData.features.hasOwnProperty(feature)) {
      let feats = [];
      feats.push({
        displayText: 'Back',
      });

      for (let feat of creatorData.features[feature]) {
        feats.push({
          type: 'slider',
          displayText: feat,
          min: -1,
          start: player.character.customization.features[featID],
          max: 1,
          step: 0.1,
          data: {featId: featID},
        });
        featID++;
      }

      featMenu.items.push({
        type: 'submenu',
        id: 'Features',
        displayText: feature,
        caption: `Your character's ${feature.toLowerCase()}.`,
        items: feats,
      });
    }
  }

  menu.add(featMenu);
  // FINISH FEATURES MENU

  // START HAIR MENU
  let hairMenu = {
    type: 'submenu',
    id: 'Hair and Colors',
    displayText: `Hair & Colors`,
    caption: `Your character's hair and colors.`,
    items: [],
  };

  hairMenu.items.push({
    displayText: 'Back',
  });

  let hairs = [];
  for (let hair of creatorData.hairs[player.character.customization.gender]) {
    hairs.push({
      displayText: hair.Name,
      data: {hairId: hair.ID, hairCollection: hair.Collection, hairOverlay: hair.Overlay},
    });
  }

  let hair = creatorData.hairs[player.character.customization.gender].find((h) => h.ID == player.character.customization.hair.hair);
  hairs.default = creatorData.hairs[player.character.customization.gender].indexOf(hair);

  hairMenu.items.push({
    type: 'list',
    displayText: 'Hair',
    caption: `Your character's hair.`,
    items: hairs,
    defaultIndex: hairs.default,
    data: {},
  });

  let hairColors = [];
  for (let color of creatorData.hairColors) {
    hairColors.push({
      displayText: color,
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Hair Color',
    caption: `Your character's hair color.`,
    items: hairColors,
    defaultIndex: player.character.customization.hair.color,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Hair Highlight Color',
    caption: `Your character's hair highlight color.`,
    items: hairColors,
    defaultIndex: player.character.customization.hair.highlightColor,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Eyebrow Color',
    caption: `Your character's eyebrow color.`,
    defaultIndex: player.character.customization.eyebrowColor,
    items: hairColors,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Facial Hair Color',
    caption: `Your character's facial hair color.`,
    defaultIndex: player.character.customization.beardColor,
    items: hairColors,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Chest Hair Color',
    caption: `Your character's chest hair color.`,
    defaultIndex: player.character.customization.chestHairColor,
    items: hairColors,
    data: {},
  });

  let eyeColors = [];
  for (let color of creatorData.eyeColors) {
    eyeColors.push({
      displayText: color,
      data: {eyeId: eyeColors.length},
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Eye Color',
    caption: `Your character's eye color.`,
    defaultIndex: player.character.customization.eyeColor,
    items: eyeColors,
    data: {},
  });

  let blushColors = [];
  for (let color of creatorData.blushColors) {
    blushColors.push({
      displayText: color,
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Blush Color',
    caption: `Your character's blush color.`,
    defaultIndex: player.character.customization.blushColor,
    items: blushColors,
    data: {},
  });

  let lipstickColors = [];
  for (let color of creatorData.lipstickColors) {
    lipstickColors.push({
      displayText: color,
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Lipstick Color',
    caption: `Your character's lipstick color.`,
    defaultIndex: player.character.customization.lipstickColor,
    items: lipstickColors,
    data: {},
  });

  menu.add(hairMenu);
  // FINISH HAIR MENU

  menu.add({
    type: 'slider',
    displayText: 'Rotation',
    min: -180,
    max: 180,
    step: 10,
  });

  for (let close of ['Save', 'Cancel']) {
    menu.add({
      type: 'close',
      displayText: close,
      data: {existing: existing},
    });
  }
  return menu;
};

yarp.server.showCharacterCreationMenu = (player) => {
  yarp.server.sendToCreator(player);
  yarp.client.createCamera(player, 'Character Creator', {
    position: yarp.variables['Creator Camera Pos'].value,
    look: yarp.variables['Creator Camera Look'].value,
  });

  let existing = !!player.character;
  if (!player.character) {
    player.character = new yarp.Character({id: 'Character Creator', socialClub: player.socialClub});
    player.character.player = player;
  }
  player.character.oldCustomization = player.character.customization;
  player.character.lock();
  player.character.applyCustomization();
  let menu = yarp.server.buildCharacterMenu(player, existing);

  menu.create(player);
  menu.open(player);
};

yarp.server.add.menuItemChanged = (player, data) => {
  let menuI = ['Character Creator', 'Parents', 'Appearance', 'Features', 'Hair and Colors'].indexOf(data._menuId);
  switch (menuI) {
    case 0:
      switch (data._index) {
        case 2:
          let gender = data.item.displayText == 'Male' ? 0 : 1;
          player.model = creatorData.gender[gender];
          player.character.customization = yarp.Character.defaultCustomization;
          player.character.customization.gender = gender;
          let menu = yarp.server.buildCharacterMenu(player, data.existing);
          menu.create(player);
          menu.open(player);
          player.character.applyCustomization();
          break;
        case 7:
          player.heading = yarp.variables['Creator Heading'].value + data.value;
          player.character.applyCustomization();
          break;
      }
      break;
    case 1:
      switch (data._index) {
        case 1:
          player.character.customization.parents.father = Number(data.item.data.fatherId);
          break;
        case 2:
          player.character.customization.parents.mother = Number(data.item.data.motherId);
          break;
        case 3:
          player.character.customization.parents.similarity = Number(data.value);
          break;
        case 4:
          player.character.customization.parents.skinSimilarity = Number(data.value);
          break;
      }
      player.character.applyCustomization();
      break;
    case 2:
      if (data._index % 2 == 0) {
        player.character.customization.appearance[data.appearanceId].opacity = data.value;
      } else {
        player.character.customization.appearance[data.appearanceId].value = data.item.data.appId;
      }
      player.character.applyCustomization();
      break;
    case 3:
      player.character.customization.features[data.featId] = data.value;
      player.character.applyCustomization();
      break;
    case 4:
      switch (data._index) {
        case 1:
          player.character.customization.hair.hair = Number(data.item.data.hairId);
          break;
        case 2:
          player.character.customization.hair.color = Number(data.item.displayText);
          break;
        case 3:
          player.character.customization.hair.highlightColor = Number(data.item.displayText);
          break;
        case 4:
          player.character.customization.eyebrowColor = Number(data.item.displayText);
          break;
        case 5:
          player.character.customization.beardColor = Number(data.item.displayText);
          break;
        case 6:
          player.character.customization.chestHairColor = Number(data.item.displayText);
          break;
        case 7:
          player.character.customization.eyeColor = Number(data.item.data.eyeId);
          break;
        case 8:
          player.character.customization.blushColor = Number(data.item.displayText);
          break;
        case 9:
          player.character.customization.lipstickColor = Number(data.item.displayText);
          break;
      }
      player.character.applyCustomization();
      break;
  }
};

yarp.server.add.menuItemClicked = async (player, data) => {
  if (data._menuId == 'Character Creator') {
    switch (data._index) {
      case 8:
        if (data.existing) {
          player.character.unlock();
          player.character.save();
          yarp.menus['Character Creator'].close(player);
          yarp.client.destroyCamera(player, 'Character Creator');
          yarp.server.showPlayerCharacters(player);
        } else {
          let inputs = await yarp.menus['Character Creator'].getItemsByIndex(player, [0, 1]);
          let regx = /[^a-z]/i;
          if (!regx.test(inputs[0].inputText) && !regx.test(inputs[1].inputText)) {
            let id = yarp.utils.server.capitalize(inputs[0].inputText) + ' ' + yarp.utils.server.capitalize(inputs[1].inputText);
            let character = yarp.characters[id];
            if (!character) {
              player.character.id = id;
              player.character.unlock();
              player.character.save();
              yarp.menus['Character Creator'].close(player);
              yarp.client.destroyCamera(player, 'Character Creator');
              yarp.server.showPlayerCharacters(player);
            } else {
              let menu = yarp.server.buildCharacterMenu(player, false);
              for (let i = 0; i <= 1; i++) {
                menu.items[i].caption += '\nA character with that name already exists.';
                menu.items[i].backgroundColor = [255, 35, 35, 50];
              }
              menu.create(player);
              menu.open(player);
            }
          } else {
            let menu = yarp.server.buildCharacterMenu(player, false);
            for (let i = 0; i <= 1; i++) {
              menu.items[i].caption += '\nNo spaces or symbols allowed, one word only.';
              menu.items[i].backgroundColor = [255, 35, 35, 50];
            }
            menu.create(player);
            menu.open(player);
          }
        }
        break;
      case 9:
        if (data.existing) {
          player.character.customization = player.character.oldCustomization;
        } else {
          player.character.remove();
        }
        yarp.menus['Character Creator'].close(player);
        yarp.client.destroyCamera(player, 'Character Creator');
        yarp.server.showPlayerCharacters(player);
        break;
    }
  }
};

yarp.server.loadCharacter = (player, id) => {
  let character = yarp.characters[id];
  player.character = character;
  character.player = player;
  character.user = player.user;
  player.user.character = character;
  let lastLogin = character.lastLogin.split(' ');
  if (lastLogin[2]) {
    player.notify(`Last connection from ~g~${lastLogin[0]}~w~ at ~g~${lastLogin[1]} ${lastLogin[2]}`);
  }
  character.updateLastLogin(player.ip);
  character.save();
  player.outputChatBox('!{green}Welcome to Sighmir\'s YARP ');
  player.model = character.model;
  player.name = character._id;
  player.position = character.position;
  player.heading = character.heading;
  player.health = character.health;
  player.armour = character.armour;
  for (let id in character.weapons) {
    if (character.weapons.hasOwnProperty(id)) {
      player.giveWeapon(mp.joaat(id), character.weapons[id]);
      yarp.client.equipWeapon(player, yarp.weapons[id]);
    }
  }
  character.user.enter();
  character.enter();
  player.setVariable('PLAYER_HUNGER', character.hunger);
  player.setVariable('PLAYER_THIRST', character.thirst);
  player.setVariable('PLAYER_WALLET', character.wallet);
  player.setVariable('PLAYER_BANK', character.bank);
  player.setVariable('PLAYER_XP', character.xp);
  character.applyCustomization();

  yarp.hotkeys['Inventory'].bind(player);

  if (character.user.hasPermission('menu.testmenu')) {
    yarp.hotkeys['Toggle Menu'].bind(player, ['Test Menu']);
    yarp.hotkeys['Test Proxy'].bind(player);
  }

  yarp.menus.forEach((menu) => {
    menu.create(player);
  });
};

yarp.server.characterJoinedGroup = (player, character, group) => { };
yarp.server.characterLeftGroup = (player, character, group) => { };
yarp.server.userLeftGroup = (player, character, group) => { };
yarp.server.userJoinedGroup = (player, character, group) => { };
