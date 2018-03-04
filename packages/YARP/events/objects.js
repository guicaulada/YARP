var spawnedObjects = [];

mp.events.add('showObjectsMenu', (player) => {
  let menu = {}
  menu.title = "Object Maker";
  menu.options = {};
  menu.options["New Object"] = {};
  menu.options["New Object"].type = "default";
  menu.options["New Object"].event = ['showObjectsList', 1];
  menu.options["Edit Object"] = {};
  menu.options["Edit Object"].type = "default";
  menu.options["Edit Object"].event = ['showNearbyObjects'];
  player.call('GUI:Create',[JSON.stringify(menu)]);
})

mp.events.add('showObjectsList', (player, result, args) => {
  let menu = {};
  let page = JSON.parse(args)[0];
  menu.title = "New Object";
  menu.onclose = ['showObjectsMenu'];
  menu.options = {};
  let max = page*100;
  let min = max - 100;
  let i = 0;
  for (object in cfg.objects){
    if (i >= min && i <= max) {
      menu.options[object] = {};
      menu.options[object].type = "default";
      menu.options[object].event = ['spawnObject'];
    }
    i++;
  }
  if (i>max){
    menu.options[".Next Page >>"] = {};
    menu.options[".Next Page >>"].type = "default";
    menu.options[".Next Page >>"].event = ['showObjectsList', page+1];
  }
  if (page > 1) {
    menu.options["<< Prev Page."] = {};
    menu.options["<< Prev Page."].type = "default";
    menu.options["<< Prev Page."].event = ['showObjectsList', page-1];
  }
  player.call('GUI:Create',[JSON.stringify(menu)]);
})

mp.events.add('showNearbyObjects', (player) => {
  let menu = {}
  menu.title = "Nearby Objects";
  menu.onclose = ['showObjectsMenu'];
  menu.options = {};
  for (obj of spawnedObjects){
    menu.options[object.name] = {};
    menu.options[object.name].type = "default";
    menu.options[object.name].event = ['editNearbyObject', obj];
  }
  player.call('GUI:Create',[JSON.stringify(menu)]);
})

mp.events.add('editNearbyObject', (player, result, args) => {
  object = JSON.parse(args)[0];
  let menu = {}
  menu.title = "Edit Object";
  menu.onclose = ['showNearbyObjects'];
  menu.options = {};
  menu.options["destroy"] = {};
  menu.options["destroy"].type = "default";
  menu.options["destroy"].event = ['destroySelectedObject', object];
  menu.options["alpha"] = {};
  menu.options["alpha"].type = "int";
  menu.options["alpha"].max = 255;
  menu.options["alpha"].min = 0;
  menu.options["alpha"].start = object.alpha;
  menu.options["alpha"].event = ['setSelectedObjectAlpha', object];
  menu.options["x"] = {};
  menu.options["x"].type = "int";
  menu.options["x"].max = 40000;
  menu.options["x"].min = -40000;
  menu.options["x"].start = object.position.x;
  menu.options["x"].event = ['setSelectedObjectX', object];
  menu.options["y"] = {};
  menu.options["y"].type = "int";
  menu.options["y"].max = 40000;
  menu.options["y"].min = -40000;
  menu.options["y"].start = object.position.y;
  menu.options["y"].event = ['setSelectedObjectY', object];
  menu.options["z"] = {};
  menu.options["z"].type = "int";
  menu.options["z"].max = 40000;
  menu.options["z"].min = -40000;
  menu.options["z"].start = object.position.z;
  menu.options["z"].event = ['setSelectedObjectZ', object];
  player.call('GUI:Create',[JSON.stringify(menu)]);
})

mp.events.add('spawnObject', (player,object) => {
  if ((typeof object) === 'string'){
    object = mp.joaat(object);
  }
  let obj = mp.objects.new(object, player.position);
  obj.name = object;
  spawnedObjects.push(obj);
  mp.events.call('showNearbyObjects', player);
})
