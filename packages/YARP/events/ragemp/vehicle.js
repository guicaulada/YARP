mp.events.add("playerStartEnterVehicle", (player, vehicle, seat) => {
});

mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
});

mp.events.add("playerStartExitVehicle", player => {
});

mp.events.add("playerExitVehicle", (player, vehicle) => {
});

mp.events.add("trailerAttached", (vehicle, trailer) => {
});

mp.events.add("vehicleDamage", (vehicle, bodyHealthLoss, engineHealthLoss) => {
});

mp.events.add('vehicleDeath', (vehicle) => {
});

mp.events.add("vehicleHornToggle", (vehicle, toggle) => {
});

mp.events.add("vehicleSirenToggle", (vehicle, toggle) => {
});
