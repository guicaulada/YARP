var db = require('../groups/database.js');
mp.events.addCommand('kill', (player) => {
  if (db.hasPermission(player,"cmd.kill")){
    player.health = 0;
  }
});

mp.events.addCommand('hp', (player) => {
  if (db.hasPermission(player,"cmd.hp")){
    player.health = 100;
  }
});

mp.events.addCommand('armor', (player) => {
  if (db.hasPermission(player,"cmd.armor")){
    player.armour = 100;
  }
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
  if (db.hasPermission(player,"cmd.weapon")){
    var weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
  }
});

mp.events.addCommand('veh', (player, text) => {
  if (db.hasPermission(player,"cmd.veh")){
    if (text == undefined) {
        let veh = mp.vehicles.new(mp.joaat('T20'), player.position);
        player.putIntoVehicle(veh, -1);
    } else {
        let veh = mp.vehicles.new(mp.joaat(text), player.position);
        player.putIntoVehicle(veh, -1);
    }
  }
});

mp.events.addCommand('noclip', (player) => {
  if (db.hasPermission(player,"cmd.noclip")){
    player.call('toggleNoclip')
  }
});

mp.events.addCommand('charpos', (player) => {
  if (db.hasPermission(player,"cmd.charpos")){
    player.call('toggleCharpos')
  }
});

mp.events.addCommand('camdir', (player) => {
  if (db.hasPermission(player,"cmd.camdir")){
    player.call('toggleCamdir')
  }
});
