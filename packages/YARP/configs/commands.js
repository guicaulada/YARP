'use strict';

let config = {
  'code': {
    category: 'superadmin',
    hint: 'Write code to be executed from inside the game. A very powerful command.',
    permissions: ['cmd.code'],
    call: (player, args) => {
      yarp.client.createBrowser(player, 'editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor'], true, false);
      yarp.hotkeys['ToggleChat'].bind(player);
    },
  },
  'givegroup': {
    category: 'superadmin',
    hint: 'Give a group to an user or character.',
    permissions: ['cmd.givegroup'],
    call: (player, args) => {
      args = yarp.utils.server.getSubstrings(args.join(' '), '\'');
      let user = yarp.users[args[0]];
      let character = yarp.characters[args[0]];
      let group = yarp.groups[args[1]];
      if (group) {
        if (user) {
          user.giveGroup(group.id);
          user.save();
        } else if (character) {
          character.giveGroup(group.id);
          character.save();
        }
      }
    },
  },
  'takegroup': {
    category: 'superadmin',
    hint: 'Take a group from an user or character.',
    permissions: ['cmd.takegroup'],
    call: (player, args) => {
      args = yarp.utils.server.getSubstrings(args.join(' '), '\'');
      let user = yarp.users[args[0]];
      let character = yarp.characters[args[0]];
      let group = yarp.groups[args[1]];
      if (group) {
        if (user) {
          user.takeGroup(group.id);
          user.save();
        } else if (character) {
          character.takeGroup(group.id);
          character.save();
        }
      }
    },
  },
  'creator': {
    category: 'admin',
    hint: 'Opens the character creator.',
    permissions: ['cmd.creator'],
    call: (player, args) => {
      const freemodeCharacters = [mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01')];
      if (freemodeCharacters.indexOf(player.model) == -1) {
        player.outputChatBox('/creator command is restricted to freemode characters.');
      } else if (player.vehicle) {
        player.outputChatBox('You can\'t use this command inside a vehicle.');
      } else {
        if (player.usingCreator) {
          player.sendToWorld();
        } else {
          player.sendToCreator();
        }
      }
    },
  },
  'tick': {
    category: 'admin',
    hint: 'Show the server tick.',
    permissions: ['cmd.tick'],
    call: (player, args) => {
      player.outputChatBox(`Tick: ${yarp.tick}`);
    },
  },
  'kill': {
    category: 'admin',
    hint: 'Kill yourself.',
    permissions: ['cmd.kill'],
    call: (player, args) => {
      player.health = 0;
    },
  },
  'givemoney': {
    category: 'admin',
    hint: 'Give yourself money.',
    permissions: ['cmd.givemoney'],
    call: (player, args) => {
      player.character.wallet += Number(args[0]);
      player.notify('Received ~g~$' + args[0]);
    },
  },
  'hp': {
    category: 'admin',
    hint: 'Regenerates player health.',
    permissions: ['cmd.hp'],
    call: (player, args) => {
      player.health = 100;
    },
  },
  'armour': {
    category: 'admin',
    hint: 'Regenerates player armour.',
    permissions: ['cmd.armour'],
    call: (player, args) => {
      player.armour = 100;
    },
  },
  'weapon': {
    category: 'admin',
    hint: 'Gives specified weapon and ammo.',
    permissions: ['cmd.weapon'],
    call: (player, args) => {
      let ammo = Number(args[1]) || 10000;
      let id = 'weapon_'+args[0];
      player.character.giveWeapon(yarp.weapons[id.toUpperCase()], ammo);
      player.character.save();
    },
  },
  'veh': {
    category: 'admin',
    hint: 'Spawns specified vehicle model.',
    permissions: ['cmd.veh'],
    call: (player, args) => {
      let veh = mp.vehicles.new(mp.joaat(args[0]), player.position);
      player.putIntoVehicle(veh, -1);
    },
  },
  'noclip': {
    category: 'admin',
    hint: 'Toggle No-clip.',
    permissions: ['cmd.noclip'],
    call: (player, args) => {
      yarp.client.toggleNoclip(player);
    },
  },
  'charpos': {
    category: 'admin',
    hint: 'Toggle character position display.',
    permissions: ['cmd.charpos'],
    call: (player, args) => {
      yarp.client.toggleCharpos(player);
    },
  },
  'camdir': {
    category: 'admin',
    hint: 'Toggle camera direction display.',
    permissions: ['cmd.camdir'],
    call: (player, args) => {
      yarp.client.toggleCamdir(player);
    },
  },
  'gmtp': {
    category: 'admin',
    hint: 'Teleport to specified gamemode object.',
    permissions: ['cmd.gmtp'],
    call: (player, args) => {
      args = yarp.utils.server.getSubstrings(args.join(' '), '\'');
      let Class = args[0];
      let id = args[1];
      if (yarp[Class]) {
        let collection = Class.toLowerCase()+'s';
        let obj = yarp[collection][id];
        player.position = obj.position;
      }
    },
  },
  'tp': {
    category: 'admin',
    hint: 'Teleport to specified position.',
    permissions: ['cmd.tp'],
    call: (player, args) => {
      // Sanitize arguments
      args[0] = args[0].replace(/,/g, '').replace(/}/g, '');
      args[1] = args[1].replace(/,/g, '').replace(/}/g, '');
      args[2] = args[2].replace(/,/g, '').replace(/}/g, '');
      player.position = new mp.Vector3(Number(args[0]), Number(args[1]), Number(args[2]));
    },
  },
  'inventory': {
    category: 'user',
    hint: 'Open your inventory.',
    permissions: ['cmd.inventory'],
    call: (player, args) => {
      let list = [];
      let inventory = player.character.inventory;
      for (let id in inventory) {
        if (inventory.hasOwnProperty(id)) {
          let item = yarp.items[id];
          list.push({
            id: item.id,
            model: item.model,
            amount: inventory[id],
            options: item._options,
          });
        }
      }
      yarp.client.createBrowser(player, 'inventory', ['package://YARP/ui/html/inventory.html', 'populateInventory', list, 'Inventory'], false, true);
    },
  },
  'money': {
    category: 'user',
    hint: 'Show your wallet and bank.',
    permissions: ['cmd.money'],
    call: (player, args) => {
      player.outputChatBox(`Wallet: !{51, 204, 51}${player.character.wallet}`);
      player.outputChatBox(`Bank: !{0, 153, 255}${player.character.bank}`);
    },
  },
  '?': {
    category: 'user',
    hint: 'Lists existing commands for each category.',
    permissions: ['cmd.hint'],
    call: (player, args) => {
      if (!args[0]) {
        player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(yarp.commands.categories).join(', ')}`);
      } else {
        let category = yarp.commands.categories[args[0]];
        if (category) {
          player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(category).join(', ')}`);
        } else {
          let command = yarp.commands[args[0]];
          if (command) {
            player.outputChatBox(`!{yellow}HINT!{white}: ${command.hint}`);
          }
        }
     }
    },
  },
};

module.exports = config;
