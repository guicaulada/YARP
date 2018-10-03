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

yarp.server.showCharacterCreationMenu = (player) => {
  yarp.server.sendToCreator(player);
  let gender = 0; // Yes, I am assuming your gender.
  if (player.character) gender = player.character.costumization;
  yarp.client.createCamera(player, 'Character Creator', {
    position: yarp.variables['Creator Camera Pos'].value,
    look: yarp.variables['Creator Camera Look'].value,
  });

  // START MAIN MENU
  let menu = new yarp.Menu({
    id: 'Character Creator',
    offset: [0.01, 0.25],
  });

  for (let name of ['Name', 'Surname']) {
    menu.add({
      type: 'input',
      displayText: name,
      caption: name == 'Name' ? `Your character's first name.` : `Your character's last name.`,
      data: {},
    });
  }

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
    data: {},
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
    }
  }

  let mothers = [];
  for (let mother in creatorData.mothers) {
    if (creatorData.mothers.hasOwnProperty(mother)) {
      mothers.push({
        displayText: mother,
        data: {motherId: creatorData.mothers[mother]},
      });
    }
  }

  parentsMenu.items.push({
    type: 'list',
    displayText: 'Father',
    caption: `Your character's father.`,
    items: fathers,
    data: {},
  });

  parentsMenu.items.push({
    type: 'list',
    displayText: 'Mother',
    caption: `Your character's mother.`,
    items: mothers,
    data: {},
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

  for (let appearence in creatorData.appearances) {
    if (creatorData.appearances.hasOwnProperty(appearence)) {
      let apps = [];
      for (let app of creatorData.appearances[appearence]) {
        apps.push({
          displayText: app,
        });
      }
      appMenu.items.push({
        type: 'list',
        displayText: appearence,
        caption: `Your character's ${appearence.toLowerCase()}.`,
        items: apps,
      });
    }
  }

  menu.add(appMenu);
  // FINISH APPEARENCE MENU


  // START FEATURES MENU
  let featMenu = {
    type: 'submenu',
    id: 'Features',
    displayText: `Features`,
    caption: `Your character's features.`,
    items: [],
  };

  featMenu.items.push({
    displayText: 'Back',
  });

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
          max: 1,
          step: 0.01,
        });
      }

      featMenu.items.push({
        type: 'submenu',
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
  for (let hair of creatorData.hairs[gender]) {
    hairs.push({
      displayText: hair.Name,
      data: {hairId: hair.ID, hairCollection: hair.Collection, hairOverlay: hair.Overlay},
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Hair',
    caption: `Your character's hair.`,
    items: hairs,
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
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Hair Highlight Color',
    caption: `Your character's hair highlight color.`,
    items: hairColors,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Facial Hair Color',
    caption: `Your character's facial hair color.`,
    items: hairColors,
    data: {},
  });

  hairMenu.items.push({
    type: 'list',
    displayText: 'Chest Hair Color',
    caption: `Your character's chest hair color.`,
    items: hairColors,
    data: {},
  });

  let eyeColors = [];
  for (let color of creatorData.eyeColors) {
    eyeColors.push({
      displayText: color,
    });
  }

  hairMenu.items.push({
    type: 'list',
    displayText: 'Eye Color',
    caption: `Your character's eye color.`,
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
    step: 5,
  });

  for (let close of ['Save', 'Cancel']) {
    menu.add({
      type: 'close',
      displayText: close,
    });
  }

  menu.create(player);
  menu.open(player);
};

yarp.server.add.menuItemChanged = (player, data) => {
  let menus = ['Character Creator', 'Parents', 'Appearance', 'Features', 'Hair and Colors'];
  if (menus.indexOf(data._menuId) >= 0) {
    console.log(data);
  }
};

yarp.server.add.menuItemClicked = (player, data) => {
  let menus = ['Character Creator', 'Parents', 'Appearance', 'Features', 'Hair and Colors'];
  if (menus.indexOf(data._menuId) >= 0) {
    console.log(data);
  }
};

/**
 * Create character event.
 * @function createCharacter
 * @memberof yarp.server
 * @param {Object} player The player that called the event.
 * @param {String} id Character id.
 * @param {Number} age Character age.
 * @param {String} model Character model.
 * @param {String} face Character face.
 */
yarp.server.createCharacter = (player, id, age, model, face) => {
  let character = yarp.characters[id];
  if (character == null) {
    character = new yarp.Character({id: id, socialClub: player.socialClub, age: age, model: model, face: face});
    character.save();
    yarp.client.characterCreatedSuccessfully(player);
    yarp.server.showPlayerCharacters(player);
  } else {
    yarp.client.characterNameDuplicated(player);
  }
};

yarp.server.changeCharacterModel = (player, model) => {
  player.model = mp.joaat(model);
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
  // character.loadCustomization();

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
