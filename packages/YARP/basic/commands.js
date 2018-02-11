mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand("weapon", (player, fullText, weapon, ammo) => {
	var weaponHash = mp.joaat(weapon);
	player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
});
