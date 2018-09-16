'use strict';

let config = {
  'code': {
    category: 'superadmin',
    hint: 'Write code to be executed from inside the game. A very powerful command.',
    permissions: ['cmd.code'],
    call: (player, args) => {
      player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor'], true, false]);
      yarp.hotkeys['ToggleChat'].bind(player);
    },
  },
  'new': {
    category: 'superadmin',
    hint: 'Create any gamemode object from inside the game. A very powerful command.',
    permissions: ['cmd.new'],
    call: (player, args) => {
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
      let Class = args[0];
      if (Class) {
        args.splice(0, 1);
        if (args.length > 0) {
          for (let i = 0; i < args.length; i++) {
            try {
              isNaN(eval(args[i]));
            } catch (err) {
              args[i] = `'${args[i]}'`;
            }
          }
          eval(`new yarp[Class](${args.join(', ')})`);
        } else {
          player.call('createBrowser', ['editor', [
            'package://YARP/ui/html/editor.html', 'setupCodeEditor', `new yarp.${Class}(${yarp.utils.getParamNames(yarp[Class]).join(', ')})`,
          ], true, false]);
          yarp.hotkeys['ToggleChat'].bind(player);
        }
      }
    },
  },
  'rem': {
    category: 'superadmin',
    hint: 'Remove any gamemode object from inside the game. A very powerful command.',
    permissions: ['cmd.rem'],
    call: (player, args) => {
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
      let Class = args[0];
      let id = args[1];
      if (yarp[Class]) {
        let obj = yarp[Class.toLowerCase()+'s'][id];
        if (obj) {
          obj.remove();
        }
      }
    },
  },
  'edit': {
    category: 'superadmin',
    hint: 'Edit any gamemode object from inside the game. A very powerful command.',
    permissions: ['cmd.edit'],
    call: (player, args) => {
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
      let Class = args[0];
      let id = args[1];
      if (yarp[Class]) {
        let collection = Class.toLowerCase()+'s';
        let obj = yarp[collection][id];
        if (obj) {
          if (args.length > 2) {
            let text = '';
            for (let i = 2; i < args.length; i++) {
              text = text+`yarp.${collection}['${id}'].${args[i]} = ${obj[args[i]]};\\n`;
            }
            player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor', text], true, false]);
            yarp.hotkeys['ToggleChat'].bind(player);
          } else {
            player.call('createBrowser', ['editor', ['package://YARP/ui/html/editor.html', 'setupCodeEditor', `yarp.${collection}['${id}'];`], true, false]);
            yarp.hotkeys['ToggleChat'].bind(player);
          }
         }
      }
    },
  },
  'givegroup': {
    category: 'superadmin',
    hint: 'Give a group to an user or character.',
    permissions: ['cmd.givegroup'],
    call: (player, args) => {
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
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
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
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
      yarp.characters[player.name].wallet += Number(args[0]);
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
      yarp.characters[player.name].giveWeapon(yarp.weapons[id.toUpperCase()], ammo);
      yarp.characters[player.name].save();
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
      player.call('toggleNoclip');
    },
  },
  'charpos': {
    category: 'admin',
    hint: 'Toggle character position display.',
    permissions: ['cmd.charpos'],
    call: (player, args) => {
      player.call('toggleCharpos');
    },
  },
  'camdir': {
    category: 'admin',
    hint: 'Toggle camera direction display.',
    permissions: ['cmd.camdir'],
    call: (player, args) => {
      player.call('toggleCamdir');
    },
  },
  'gmtp': {
    category: 'admin',
    hint: 'Teleport to specified gamemode object.',
    permissions: ['cmd.gmtp'],
    call: (player, args) => {
      args = yarp.utils.getSubstrings(args.join(' '), '\'');
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
      let inventory = yarp.characters[player.name].inventory;
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
      player.call('createBrowser', ['inventory', ['package://YARP/ui/html/inventory.html', 'populateInventory', JSON.stringify(list), 'Inventory'], false, true]);
    },
  },
  'money': {
    category: 'user',
    hint: 'Show your wallet and bank.',
    permissions: ['cmd.money'],
    call: (player, args) => {
      player.outputChatBox(`Wallet: !{51, 204, 51}${yarp.characters[player.name].wallet}`);
      player.outputChatBox(`Bank: !{0, 153, 255}${yarp.characters[player.name].bank}`);
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
