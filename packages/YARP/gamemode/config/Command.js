"use strict";
/**
* @file Command config
*/
module.exports = {
   "superadmin": {
      "code": {
         hint: "Write code to be executed from inside the game. A very powerful command.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.code") || yarp.users[player.socialClub].isDev()){
               player.call("createBrowser", ["editor", ["package://YARP/ui/html/editor.html", "setupCodeEditor"]]);
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "new": {
         hint: "Create any gamemode object from inside the game. A very powerful command.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.new") || yarp.users[player.socialClub].isDev()){
               let Class = args[0];
               args = yarp.utils.getSubstrings(args.join(" "));
               if (Class) {
                  if (args.length > 0){
                     for (let i = 0; i < args.length; i++){
                        try {
                           let arg = eval(args[i]);
                        } catch(err) {
                           args[i] = `'${args[i]}'`
                        }
                     }
                     eval(`new yarp[Class](${args.join(", ")})`)
                  } else {
                     player.call("createBrowser", ["editor", ["package://YARP/ui/html/editor.html", "setupCodeEditor",`new yarp.${Class}(${yarp.utils.getParamNames(yarp[Class]).join(", ")})`]]);
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "rem": {
         hint: "Remove any gamemode object from inside the game. A very powerful command.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.rem") || yarp.users[player.socialClub].isDev()){
               let Class = args[0];
               args = yarp.utils.getSubstrings(args.join(" "));
               let id = args[0];
               if (yarp[Class]) {
                  let obj = yarp[Class.toLowerCase()+"s"][id];
                  if (obj) {
                     obj.remove();
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "edit": {
         hint: "Edit any gamemode object from inside the game. A very powerful command.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.new") || yarp.users[player.socialClub].isDev()){
               let Class = args[0];
               args = yarp.utils.getSubstrings(args.join(" "));
               let id = args[0];
               if (yarp[Class]) {
                  let collection = Class.toLowerCase()+"s";
                  let obj = yarp[collection][id];
                  if (obj) {
                     if (args.length > 1){
                        let text = "";
                        for (let i = 1; i < args.length; i++){
                           text = text+`yarp.${collection}["${id}"].${args[i]} = ${obj[args[i]]};\\n`;
                        }
                        player.call("createBrowser", ["editor", ["package://YARP/ui/html/editor.html", "setupCodeEditor",text]]);
                     } else {
                        player.call("createBrowser", ["editor", ["package://YARP/ui/html/editor.html", "setupCodeEditor",`yarp.${collection}["${id}"];`]]);
                     }
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "givegroup": {
         hint: "Give a group to an user or character.",
         call: (player,args) => {
            args = yarp.utils.getSubstrings(args.join(" "));
            if (yarp.users[player.socialClub].hasPermission("cmd.givegroup") || yarp.users[player.socialClub].isDev()){
               if (yarp.groups[args[1]]){
                  if (yarp.users[args[0]]){
                     yarp.users[args[0]].giveGroup(args[1]);
                     yarp.users[args[0]].save();
                  } else if (yarp.characters[args[0]]){
                     yarp.characters[args[0]].giveGroup(args[1]);
                     yarp.characters[args[0]].save();
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "takegroup": {
         hint: "Take a group from an user or character.",
         call: (player,args) => {
            args = yarp.utils.getSubstrings(args.join(" "));
            if (yarp.users[player.socialClub].hasPermission("cmd.takegroup") || yarp.users[player.socialClub].isDev()){
               if (yarp.groups[args[1]]){
                  if (yarp.users[args[0]]){
                     yarp.users[args[0]].takeGroup(args[1]);
                     yarp.users[args[0]].save();
                  } else if (yarp.characters[args[0]]){
                     yarp.characters[args[0]].takeGroup(args[1]);
                     yarp.characters[args[0]].save();
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      }
   },
   "admin": {
      "kill": {
         hint: "Kill yourself.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.kill")){
               player.health = 0;
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "givemoney": {
        hint: "Give yourself money.",
        call: (player,args) => {
           if (yarp.users[player.socialClub].hasPermission("cmd.givemoney")){
              yarp.characters[player.name].giveMoney(args[0]);
              player.notify("Received ~g~$"+args[0])
           } else {
              player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
           }
        }
      },
      "hp": {
         hint: "Regenerates player health.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.hp")){
               player.health = 100;
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "armour": {
         hint: "Regenerates player armour.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.armour")){
               player.armour = 100;
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "weapon": {
         hint: "Gives specified weapon and ammo.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.weapon")){
               let ammo = Number(args[1]) || 10000;
               yarp.characters[player.name].giveWeapon(args[0], ammo);
               yarp.characters[player.name].save();
               player.giveWeapon(mp.joaat(args[0]), ammo);
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "veh": {
         hint: "Spawns specified vehicle model.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.veh")){
               let veh = mp.vehicles.new(mp.joaat(args[0]), player.position);
               player.putIntoVehicle(veh, -1);
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "noclip": {
         hint: "Toggle No-clip.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.noclip")){
               player.call("toggleNoclip")
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "charpos": {
         hint: "Toggle character position display.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.charpos")){
               player.call("toggleCharpos")
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "camdir": {
         hint: "Toggle camera direction display.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.camdir")){
               player.call("toggleCamdir")
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "tp": {
         hint: "Teleport to specified gamemode object.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.tp")){
               let Class = args[0];
               let id = args[1];
               if (yarp[Class]) {
                  let collection = Class.toLowerCase()+"s";
                  let obj = yarp[collection][id];
                  player.position = obj.position;
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      }
   },
   "user": {
      "inventory": {
         hint: "Open your inventory.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.inventory")){
               let inventoryJson = JSON.stringify(yarp.characters[player.name].inventory);
               player.call("showPlayerInventory", [inventoryJson, 0])
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "money": {
         hint: "Write your location + commentary on jpos.log.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.money")){
               player.outputChatBox(`Wallet: !{51, 204, 51}${yarp.characters[player.name].wallet}`);
               player.outputChatBox(`Bank: !{0, 153, 255}${yarp.characters[player.name].bank}`);
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      },
      "?": {
         hint: "Lists existing commands for each category.",
         call: (player,args) => {
            if (yarp.users[player.socialClub].hasPermission("cmd.hint")){
               if (!args[0]){
                  player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(yarp.commands.categories).join(", ")}`);
               } else {
                  let category = yarp.commands.categories[args[0]];
                  if (category){
                     player.outputChatBox(`!{yellow}HINT!{white}: ${Object.keys(category).join(", ")}`);
                  } else {
                     let command = yarp.commands[args[0]];
                     if (command) {
                        player.outputChatBox(`!{yellow}HINT!{white}: ${command.hint}`);
                     }
                  }
               }
            } else {
               player.outputChatBox("!{yellow}HINT!{white}: You don't have permission.");
            }
         }
      }
   }
}
