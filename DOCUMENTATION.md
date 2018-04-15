## Objects

<dl>
<dt><a href="#checkpoint">checkpoint</a> : <code>object</code></dt>
<dd><p>Checkpoint events</p>
</dd>
<dt><a href="#colshape">colshape</a> : <code>object</code></dt>
<dd><p>Colshape events</p>
</dd>
<dt><a href="#entity">entity</a> : <code>object</code></dt>
<dd><p>Entity events</p>
</dd>
<dt><a href="#player">player</a> : <code>object</code></dt>
<dd><p>Player events</p>
</dd>
<dt><a href="#stream">stream</a> : <code>object</code></dt>
<dd><p>Stream events</p>
</dd>
<dt><a href="#vehicle">vehicle</a> : <code>object</code></dt>
<dd><p>Vehicle events</p>
</dd>
<dt><a href="#waypoint">waypoint</a> : <code>object</code></dt>
<dd><p>Waypoint events</p>
</dd>
<dt><a href="#world">world</a> : <code>object</code></dt>
<dd><p>World events and IPLs</p>
</dd>
<dt><a href="#character">character</a> : <code>object</code></dt>
<dd><p>Character events</p>
</dd>
<dt><a href="#gamemode">gamemode</a> : <code>object</code></dt>
<dd><p>Gamemode events</p>
</dd>
<dt><a href="#item">item</a> : <code>object</code></dt>
<dd><p>Item events</p>
</dd>
<dt><a href="#menu">menu</a> : <code>object</code></dt>
<dd><p>Menu events</p>
</dd>
<dt><a href="#yarp">yarp</a> : <code>object</code></dt>
<dd><p>Loads the gamemode on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the classes on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the configs on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the data on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the events on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the pools on server-side.</p>
</dd>
<dt><a href="#loaders">loaders</a> : <code>object</code></dt>
<dd><p>Loads the requirements on server-side.</p>
</dd>
</dl>

<a name="checkpoint"></a>

## checkpoint : <code>object</code>
Checkpoint events

**Kind**: global namespace  

* [checkpoint](#checkpoint) : <code>object</code>
    * ["playerEnterCheckpoint" (player, checkpoint)](#checkpoint.event_playerEnterCheckpoint)
    * ["playerExitCheckpoint" (player, checkpoint)](#checkpoint.event_playerExitCheckpoint)

<a name="checkpoint.event_playerEnterCheckpoint"></a>

### "playerEnterCheckpoint" (player, checkpoint)
Player exit checkpoint.

**Kind**: event emitted by [<code>checkpoint</code>](#checkpoint)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| checkpoint | <code>object</code> | The checkpoint that was left. |

<a name="checkpoint.event_playerExitCheckpoint"></a>

### "playerExitCheckpoint" (player, checkpoint)
Player exit checkpoint.

**Kind**: event emitted by [<code>checkpoint</code>](#checkpoint)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| checkpoint | <code>object</code> | The checkpoint that was left. |

<a name="colshape"></a>

## colshape : <code>object</code>
Colshape events

**Kind**: global namespace  

* [colshape](#colshape) : <code>object</code>
    * ["playerEnterColshape" (player, shape)](#colshape.event_playerEnterColshape)
    * ["playerExitColshape" (player, shape)](#colshape.event_playerExitColshape)

<a name="colshape.event_playerEnterColshape"></a>

### "playerEnterColshape" (player, shape)
Player enter coolshape.

**Kind**: event emitted by [<code>colshape</code>](#colshape)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| shape | <code>object</code> | The colshape that was entered. |

<a name="colshape.event_playerExitColshape"></a>

### "playerExitColshape" (player, shape)
Player exit coolshape.

**Kind**: event emitted by [<code>colshape</code>](#colshape)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| shape | <code>object</code> | The colshape that was left. |

<a name="entity"></a>

## entity : <code>object</code>
Entity events

**Kind**: global namespace  

* [entity](#entity) : <code>object</code>
    * ["entityCreated" (entity)](#entity.event_entityCreated)
    * ["entityDestroyed" (entity)](#entity.event_entityDestroyed)
    * ["entityModelChange" (entity, oldModel)](#entity.event_entityModelChange)

<a name="entity.event_entityCreated"></a>

### "entityCreated" (entity)
Entity created.

**Kind**: event emitted by [<code>entity</code>](#entity)  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>object</code> | The entity that called the event. |

<a name="entity.event_entityDestroyed"></a>

### "entityDestroyed" (entity)
Entity destroyed.

**Kind**: event emitted by [<code>entity</code>](#entity)  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>object</code> | The entity that called the event. |

<a name="entity.event_entityModelChange"></a>

### "entityModelChange" (entity, oldModel)
Entity model change.

**Kind**: event emitted by [<code>entity</code>](#entity)  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>object</code> | The entity that called the event. |
| oldModel | <code>number</code> | Hash of the old model. |

<a name="player"></a>

## player : <code>object</code>
Player events

**Kind**: global namespace  

* [player](#player) : <code>object</code>
    * ["playerChat" (player, message)](#player.event_playerChat)
    * ["playerCommand" (player, command)](#player.event_playerCommand)
    * ["playerDeath" (player)](#player.event_playerDeath)
    * ["playerJoin" (player)](#player.event_playerJoin)
    * ["playerQuit" (player, exitType, reason)](#player.event_playerQuit)
    * ["playerReady" (player)](#player.event_playerReady)
    * ["playerSpawn" (player)](#player.event_playerSpawn)
    * ["playerWeaponChange" (player, oldWeapon, newWeapon)](#player.event_playerWeaponChange)
    * ["playerWeaponShot" (player, targetPositionJson, targetEntityJson, weaponHash)](#player.event_playerWeaponShot)

<a name="player.event_playerChat"></a>

### "playerChat" (player, message)
Chat event.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| message | <code>string</code> | Message sent. |

<a name="player.event_playerCommand"></a>

### "playerCommand" (player, command)
Command event.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| command | <code>string</code> | Message sent. |

<a name="player.event_playerDeath"></a>

### "playerDeath" (player)
Death event.

**Kind**: event emitted by [<code>player</code>](#player)  
**Emits**: <code>event:unequipAllWeapons</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="player.event_playerJoin"></a>

### "playerJoin" (player)
Join event.

**Kind**: event emitted by [<code>player</code>](#player)  
**Emits**: <code>event:createBrowser</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="player.event_playerQuit"></a>

### "playerQuit" (player, exitType, reason)
Quit event.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| exitType | <code>string</code> | Exit type. |
| reason | <code>string</code> | Exit reason. |

<a name="player.event_playerReady"></a>

### "playerReady" (player)
Player ready.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="player.event_playerSpawn"></a>

### "playerSpawn" (player)
Player spawned.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="player.event_playerWeaponChange"></a>

### "playerWeaponChange" (player, oldWeapon, newWeapon)
Weapon change event.

**Kind**: event emitted by [<code>player</code>](#player)  
**Emits**: <code>event:unequipWeapon</code>, <code>event:equipWeapon</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| oldWeapon | <code>number</code> | Old weapon hash. |
| newWeapon | <code>number</code> | New weapon hash. |

<a name="player.event_playerWeaponShot"></a>

### "playerWeaponShot" (player, targetPositionJson, targetEntityJson, weaponHash)
Weapon shot event.

**Kind**: event emitted by [<code>player</code>](#player)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| targetPositionJson | <code>string</code> | Target position JSON. |
| targetEntityJson | <code>string</code> | Target entity JSON. |
| weaponHash | <code>number</code> | Weapon hash. |

<a name="stream"></a>

## stream : <code>object</code>
Stream events

**Kind**: global namespace  

* [stream](#stream) : <code>object</code>
    * ["playerStreamIn" (player, forPlayer)](#stream.event_playerStreamIn)
    * ["playerStreamOut" (player, forPlayer)](#stream.event_playerStreamOut)

<a name="stream.event_playerStreamIn"></a>

### "playerStreamIn" (player, forPlayer)
Player stream in.

**Kind**: event emitted by [<code>stream</code>](#stream)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| forPlayer | <code>object</code> | For which player he was just streamed in. |

<a name="stream.event_playerStreamOut"></a>

### "playerStreamOut" (player, forPlayer)
Player stream out.

**Kind**: event emitted by [<code>stream</code>](#stream)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| forPlayer | <code>object</code> | For which player he was just streamed out. |

<a name="vehicle"></a>

## vehicle : <code>object</code>
Vehicle events

**Kind**: global namespace  

* [vehicle](#vehicle) : <code>object</code>
    * ["playerStartEnterVehicle" (player, vehicle, seat)](#vehicle.event_playerStartEnterVehicle)
    * ["playerEnterVehicle" (player, vehicle, seat)](#vehicle.event_playerEnterVehicle)
    * ["playerStartExitVehicle" (player)](#vehicle.event_playerStartExitVehicle)
    * ["playerExitVehicle" (player, vehicle)](#vehicle.event_playerExitVehicle)
    * ["trailerAttached" (vehicle, trailer)](#vehicle.event_trailerAttached)
    * ["vehicleDamage" (vehicle, bodyHealthLoss, engineHealthLoss)](#vehicle.event_vehicleDamage)
    * ["vehicleDeath" (vehicle)](#vehicle.event_vehicleDeath)
    * ["vehicleHornToggle" (vehicle, toggle)](#vehicle.event_vehicleHornToggle)
    * ["vehicleSirenToggle" (vehicle, toggle)](#vehicle.event_vehicleSirenToggle)

<a name="vehicle.event_playerStartEnterVehicle"></a>

### "playerStartEnterVehicle" (player, vehicle, seat)
Entering vehicle.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| vehicle | <code>object</code> | The vehicle of the event. |
| seat | <code>number</code> | The seat he is sitting on. |

<a name="vehicle.event_playerEnterVehicle"></a>

### "playerEnterVehicle" (player, vehicle, seat)
Entered vehicle.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| vehicle | <code>object</code> | The vehicle of the event. |
| seat | <code>number</code> | The seat he is sitting on. |

<a name="vehicle.event_playerStartExitVehicle"></a>

### "playerStartExitVehicle" (player)
Exiting vehicle.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="vehicle.event_playerExitVehicle"></a>

### "playerExitVehicle" (player, vehicle)
Exited vehicle.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| vehicle | <code>object</code> | The vehicle of the event. |

<a name="vehicle.event_trailerAttached"></a>

### "trailerAttached" (vehicle, trailer)
Attached trailer.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| vehicle | <code>object</code> | The vehicle that called the event. |
| trailer | <code>object</code> | The trailer of the event. |

<a name="vehicle.event_vehicleDamage"></a>

### "vehicleDamage" (vehicle, bodyHealthLoss, engineHealthLoss)
Vehicle damaged.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| vehicle | <code>object</code> | The vehicle that called the event. |
| bodyHealthLoss | <code>number</code> | Body health loss. |
| engineHealthLoss | <code>number</code> | Engine health loss. |

<a name="vehicle.event_vehicleDeath"></a>

### "vehicleDeath" (vehicle)
Vehicle death.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| vehicle | <code>object</code> | The vehicle that called the event. |

<a name="vehicle.event_vehicleHornToggle"></a>

### "vehicleHornToggle" (vehicle, toggle)
Vehicle death.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| vehicle | <code>object</code> | The vehicle that called the event. |
| toggle | <code>boolean</code> | Horn on or off. |

<a name="vehicle.event_vehicleSirenToggle"></a>

### "vehicleSirenToggle" (vehicle, toggle)
Vehicle death.

**Kind**: event emitted by [<code>vehicle</code>](#vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| vehicle | <code>object</code> | The vehicle that called the event. |
| toggle | <code>boolean</code> | Siren on or off. |

<a name="waypoint"></a>

## waypoint : <code>object</code>
Waypoint events

**Kind**: global namespace  

* [waypoint](#waypoint) : <code>object</code>
    * ["playerCreateWaypoint" (player, position)](#waypoint.event_playerCreateWaypoint)
    * ["playerReachWaypoint" (player)](#waypoint.event_playerReachWaypoint)

<a name="waypoint.event_playerCreateWaypoint"></a>

### "playerCreateWaypoint" (player, position)
Waypoint created.

**Kind**: event emitted by [<code>waypoint</code>](#waypoint)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| position | <code>Vector3</code> | Waypoiny position. |

<a name="waypoint.event_playerReachWaypoint"></a>

### "playerReachWaypoint" (player)
Waypoint reached.

**Kind**: event emitted by [<code>waypoint</code>](#waypoint)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="world"></a>

## world : <code>object</code>
World events and IPLs

**Kind**: global namespace  
<a name="character"></a>

## character : <code>object</code>
Character events

**Kind**: global namespace  

* [character](#character) : <code>object</code>
    * ["createCharacter" (player, id, age, model, faceJson)](#character.event_createCharacter)
    * ["changeCharacterModel" (player, model)](#character.event_changeCharacterModel)
    * ["setCharacterIntoCreator" (player)](#character.event_setCharacterIntoCreator)
    * ["loadCharacter" (player, id)](#character.event_loadCharacter)

<a name="character.event_createCharacter"></a>

### "createCharacter" (player, id, age, model, faceJson)
Create character event.

**Kind**: event emitted by [<code>character</code>](#character)  
**Emits**: <code>event:characterCreatedSuccessfully</code>, <code>event:showPlayerCharacters</code>, <code>event:characterNameDuplicated</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| id | <code>string</code> | Character id. |
| age | <code>number</code> | Character age. |
| model | <code>string</code> | Character model. |
| faceJson | <code>string</code> | Character face JSON. |

<a name="character.event_changeCharacterModel"></a>

### "changeCharacterModel" (player, model)
Change character model event.

**Kind**: event emitted by [<code>character</code>](#character)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| model | <code>string</code> | Character model. |

<a name="character.event_setCharacterIntoCreator"></a>

### "setCharacterIntoCreator" (player)
Set character into creator event.

**Kind**: event emitted by [<code>character</code>](#character)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="character.event_loadCharacter"></a>

### "loadCharacter" (player, id)
Load character event.

**Kind**: event emitted by [<code>character</code>](#character)  
**Emits**: <code>event:equipWeapon</code>, <code>event:updatePlayerCustomSkin</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| id | <code>string</code> | Character id. |

<a name="gamemode"></a>

## gamemode : <code>object</code>
Gamemode events

**Kind**: global namespace  

* [gamemode](#gamemode) : <code>object</code>
    * [.tick()](#gamemode.tick)
    * ["runServerCode" (player, code)](#gamemode.event_runServerCode)
    * ["playerBoundKeyPressed" (player, id)](#gamemode.event_playerBoundKeyPressed)

<a name="gamemode.tick"></a>

### gamemode.tick()
Scans players and objects to act on proximity.

**Kind**: static method of [<code>gamemode</code>](#gamemode)  
<a name="gamemode.event_runServerCode"></a>

### "runServerCode" (player, code)
Evaluates code on server-side.

**Kind**: event emitted by [<code>gamemode</code>](#gamemode)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| code | <code>string</code> | Code. |

<a name="gamemode.event_playerBoundKeyPressed"></a>

### "playerBoundKeyPressed" (player, id)
Evaluates code on server-side.

**Kind**: event emitted by [<code>gamemode</code>](#gamemode)  
**Emits**: <code>event:displayHelpText</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| id | <code>string</code> | Hotkey id. |

<a name="item"></a>

## item : <code>object</code>
Item events

**Kind**: global namespace  

* [item](#item) : <code>object</code>
    * ["restoreHunger" (player, value)](#item.event_restoreHunger)
    * ["restoreThirst" (player, value)](#item.event_restoreThirst)

<a name="item.event_restoreHunger"></a>

### "restoreHunger" (player, value)
Restore hunger event.

**Kind**: event emitted by [<code>item</code>](#item)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| value | <code>number</code> | Amount to restore. |

<a name="item.event_restoreThirst"></a>

### "restoreThirst" (player, value)
Restore thirst event.

**Kind**: event emitted by [<code>item</code>](#item)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| value | <code>number</code> | Amount to restore. |

<a name="menu"></a>

## menu : <code>object</code>
Menu events

**Kind**: global namespace  

* [menu](#menu) : <code>object</code>
    * ["callInventoryOption" (player, item_id, option)](#menu.event_callInventoryOption)
    * ["loadBankBalance" (player, item_id, option)](#menu.event_loadBankBalance)
    * ["unbindToggleChat" (player)](#menu.event_unbindToggleChat)
    * ["purchaseSaleItem" (player, locationid, itemid, amount)](#menu.event_purchaseSaleItem)
    * ["purchaseAmmuWeapon" (player, id, amount)](#menu.event_purchaseAmmuWeapon)
    * ["executeBankOperation" (player, operation, amount, [target])](#menu.event_executeBankOperation)
    * ["verifyLogin" (player, password)](#menu.event_verifyLogin)

<a name="menu.event_callInventoryOption"></a>

### "callInventoryOption" (player, item_id, option)
Call inventory option.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:browserExecute</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| item_id | <code>string</code> | Item id. |
| option | <code>string</code> | Option id. |

<a name="menu.event_loadBankBalance"></a>

### "loadBankBalance" (player, item_id, option)
Loads bank balance.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:browserExecute</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| item_id | <code>string</code> | Item id. |
| option | <code>string</code> | Option id. |

<a name="menu.event_unbindToggleChat"></a>

### "unbindToggleChat" (player)
Unbind toggle chat hotkey.

**Kind**: event emitted by [<code>menu</code>](#menu)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |

<a name="menu.event_purchaseSaleItem"></a>

### "purchaseSaleItem" (player, locationid, itemid, amount)
Purchase item for sale.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:browserExecute</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| locationid | <code>string</code> | Location id. |
| itemid | <code>string</code> | Item id. |
| amount | <code>string</code> | Amount to purchase. |

<a name="menu.event_purchaseAmmuWeapon"></a>

### "purchaseAmmuWeapon" (player, id, amount)
Purchase weapon for sale.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:browserExecute</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| id | <code>string</code> | Weapon id. |
| amount | <code>string</code> | Amount to purchase. |

<a name="menu.event_executeBankOperation"></a>

### "executeBankOperation" (player, operation, amount, [target])
Execute bank operation.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:browserExecute</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| operation | <code>number</code> | Operation id. |
| amount | <code>string</code> | Amount of money. |
| [target] | <code>string</code> | Target of transfer. |

<a name="menu.event_verifyLogin"></a>

### "verifyLogin" (player, password)
Verify user login.

**Kind**: event emitted by [<code>menu</code>](#menu)  
**Emits**: <code>event:showCharacterCreationMenu</code>, <code>event:showPlayerCharacters</code>, <code>event:createBrowser</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | The player that called the event. |
| password | <code>string</code> | User password. |

<a name="yarp"></a>

## yarp : <code>object</code>
Loads the gamemode on server-side.

**Kind**: global namespace  
**Author**: Guilherme Caulada (Sighmir)  
**Copyright**: Copyright (C) 2018  Sighmir  

* [yarp](#yarp) : <code>object</code>
    * [.Blip](#yarp.Blip) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Blip(id, position, [name], [sprite], [scale], [color], [alpha], [drawDistance], [fade], [rotation], [dimension])](#new_yarp.Blip_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Blip.load)
            * [.config(file)](#yarp.Blip.config)
    * [.Character](#yarp.Character) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Character(id, socialClub, [age], [face], [lastLogin], [wallet], [bank], [health], [armour], [hunger], [thirst], [position], [heading], [groups], [weapons], [skills], [weight], [inventory], [customization], [decoration], [clothes], [enter], [leave])](#new_yarp.Character_new)
        * _instance_
            * [.player()](#yarp.Character+player) => <code>object</code>
            * [.user()](#yarp.Character+user) => <code>object</code>
            * [.balance()](#yarp.Character+balance) => <code>Array.&lt;object&gt;</code>
            * [.enter()](#yarp.Character+enter) => <code>function</code>
            * [.leave()](#yarp.Character+leave) => <code>function</code>
            * [.updateLastLogin(ip)](#yarp.Character+updateLastLogin)
            * [.giveMoney(value)](#yarp.Character+giveMoney)
            * [.tryWalletPayment(value)](#yarp.Character+tryWalletPayment) => <code>boolean</code>
            * [.tryBankPayment(value)](#yarp.Character+tryBankPayment) => <code>boolean</code>
            * [.tryFullPayment(value)](#yarp.Character+tryFullPayment) => <code>boolean</code>
            * [.tryDeposit(value)](#yarp.Character+tryDeposit) => <code>boolean</code>
            * [.tryWithdraw(value)](#yarp.Character+tryWithdraw) => <code>boolean</code>
            * [.tryTransfer(target, value)](#yarp.Character+tryTransfer) => <code>boolean</code>
            * [.giveItem(item, value)](#yarp.Character+giveItem) => <code>boolean</code>
            * [.takeItem(item, value)](#yarp.Character+takeItem) => <code>boolean</code>
            * [.takeItem(id)](#yarp.Character+takeItem) => <code>boolean</code>
            * [.hasItems(items)](#yarp.Character+hasItems) => <code>boolean</code>
            * [.giveWeapon(weapon, amount)](#yarp.Character+giveWeapon)
            * [.takeWeapon(weapon)](#yarp.Character+takeWeapon)
            * [.takeWeaponAmmo(id, amount)](#yarp.Character+takeWeaponAmmo)
            * [.giveWeaponAmmo(id, amount)](#yarp.Character+giveWeaponAmmo)
            * [.takeAmmo(id, amount)](#yarp.Character+takeAmmo)
            * [.giveAmmo(id, amount)](#yarp.Character+giveAmmo)
            * [.hasWeapon(id)](#yarp.Character+hasWeapon) => <code>boolean</code>
            * [.hasWeapons(weapons)](#yarp.Character+hasWeapons) => <code>boolean</code>
            * [.giveGroup(group)](#yarp.Character+giveGroup) => <code>boolean</code>
            * [.takeGroup(group)](#yarp.Character+takeGroup) => <code>boolean</code>
            * [.getGroupByType(type)](#yarp.Character+getGroupByType) => <code>string</code>
            * [.getGroupByTypes(type)](#yarp.Character+getGroupByTypes) => <code>Array.&lt;string&gt;</code>
            * [.hasGroup(id)](#yarp.Character+hasGroup) => <code>boolean</code>
            * [.hasGroup(id)](#yarp.Character+hasGroup) => <code>boolean</code>
            * [.hasPermission(permission)](#yarp.Character+hasPermission) => <code>boolean</code>
            * [.hasPermission(permissions)](#yarp.Character+hasPermission) => <code>boolean</code>
            * [.increaseHunger(value)](#yarp.Character+increaseHunger)
            * [.increaseThirst(value)](#yarp.Character+increaseThirst)
            * [.decreaseHunger(value)](#yarp.Character+decreaseHunger)
            * [.decreaseThirst(value)](#yarp.Character+decreaseThirst)
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Character.load)
            * [.config(file)](#yarp.Character.config)
    * [.Checkpoint](#yarp.Checkpoint) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Checkpoint(id, position, [type], [radius], [color], [direction], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Checkpoint_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Checkpoint.load)
            * [.config(file)](#yarp.Checkpoint.config)
    * [.Colshape](#yarp.Colshape) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Colshape(id, position, [type], [width], [height], [depth], [enter], [leave], [permissions], [items])](#new_yarp.Colshape_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Colshape.load)
            * [.config(file)](#yarp.Colshape.config)
    * [.Command](#yarp.Command) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Command(id, call, [category], [hint], [position], [range], [permissions], [items])](#new_yarp.Command_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Command.load)
            * [.config(file)](#yarp.Command.config)
    * [.Door](#yarp.Door) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Door(id, model, position, [range], [enter], [leave], [permissions], [items])](#new_yarp.Door_new)
        * _instance_
            * [.open()](#yarp.Door+open)
            * [.close()](#yarp.Door+close)
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Door.load)
            * [.config(file)](#yarp.Door.config)
    * [.Event](#yarp.Event) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Event(id, call, [permissions], [items])](#new_yarp.Event_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Event.load)
            * [.config(file)](#yarp.Event.config)
    * *[.GMObject](#yarp.GMObject)*
        * *[new GMObject()](#new_yarp.GMObject_new)*
        * *[.save()](#yarp.GMObject+save)*
        * *[.remove()](#yarp.GMObject+remove)*
        * *[.data()](#yarp.GMObject+data) => <code>object</code>*
        * *[.call()](#yarp.GMObject+call)*
        * *[.enter()](#yarp.GMObject+enter)*
        * *[.leave()](#yarp.GMObject+leave)*
        * *[.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)*
    * [.Group](#yarp.Group) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Group(id, [type], [enter], [leave], [permissions], [items])](#new_yarp.Group_new)
        * _instance_
            * [.users()](#yarp.Group+users) => <code>object</code>
            * [.characters()](#yarp.Group+characters) => <code>object</code>
            * [.addPermission(permission)](#yarp.Group+addPermission)
            * [.removePermission(permission)](#yarp.Group+removePermission)
            * [.hasPermission(permission)](#yarp.Group+hasPermission) => <code>boolean</code>
            * [.hasPermission(permissions)](#yarp.Group+hasPermission) => <code>boolean</code>
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Group.load)
            * [.config(file)](#yarp.Group.config)
    * [.Hotkey](#yarp.Hotkey) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Hotkey(id, key, call, [category], [hint], [position], [range], [permissions], [items])](#new_yarp.Hotkey_new)
        * _instance_
            * [.bind(player, args)](#yarp.Hotkey+bind)
            * [.unbind(player)](#yarp.Hotkey+unbind)
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Hotkey.load)
            * [.config(file)](#yarp.Hotkey.config)
    * [.Item](#yarp.Item) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Item(id, name, [category], [weight], [spoil], [model], [options])](#new_yarp.Item_new)
        * _instance_
            * [.options()](#yarp.Item+options) => <code>object</code>
            * [.isAmmo()](#yarp.Item+isAmmo) => <code>boolean</code>
            * [.isAmmo()](#yarp.Item+isAmmo) => <code>boolean</code>
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Item.load)
            * [.config(file)](#yarp.Item.config)
    * [.Label](#yarp.Label) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Label(id, position, [text], [range], [color], [drawDistance], [font], [los], [dimension], [visible], [enter], [leave], [permissions], [items])](#new_yarp.Label_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Label.load)
            * [.config(file)](#yarp.Label.config)
    * [.Location](#yarp.Location) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Location(id, [inventory], [owner], [money], [price])](#new_yarp.Location_new)
        * _instance_
            * [.sale(categories)](#yarp.Location+sale)
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Location.load)
            * [.config(file)](#yarp.Location.config)
    * [.Marker](#yarp.Marker) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Marker(id, position, [type], [radius], [color], [direction], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Marker_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Marker.load)
            * [.config(file)](#yarp.Marker.config)
    * [.Npc](#yarp.Npc) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Npc(id, model, position, [heading], [drawDistance], [dimension], [call])](#new_yarp.Npc_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Npc.load)
            * [.config(file)](#yarp.Npc.config)
    * [.Pool](#yarp.Pool)
        * [new Pool(Class)](#new_yarp.Pool_new)
        * [.load(object)](#yarp.Pool+load)
        * [.config(file)](#yarp.Pool+config)
        * [.categories()](#yarp.Pool+categories) => <code>Array.&lt;string&gt;</code>
        * [.length()](#yarp.Pool+length) => <code>number</code>
        * [.size()](#yarp.Pool+size) => <code>number</code>
        * [.exists(id)](#yarp.Pool+exists) => <code>boolean</code>
        * [.at(id)](#yarp.Pool+at) => <code>object</code>
        * [.toArray()](#yarp.Pool+toArray) => <code>Array.&lt;object&gt;</code>
        * [.forEach(call)](#yarp.Pool+forEach)
        * [.forEachInRange(position, range, call)](#yarp.Pool+forEachInRange)
        * [.forEachInDimension(dimension, call)](#yarp.Pool+forEachInDimension)
    * [.Prop](#yarp.Prop) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Prop(id, model, position, [owner], [alpha], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Prop_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Prop.load)
            * [.config(file)](#yarp.Prop.config)
    * [.Transaction](#yarp.Transaction) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Transaction(type, value, source, [target], [date])](#new_yarp.Transaction_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Transaction.load)
    * [.User](#yarp.User) - [<code>GMObject</code>](#yarp.GMObject)
        * [new User(id, password, [lastLogin], [whitelisted], [banned], [groups], [enter], [leave])](#new_yarp.User_new)
        * _instance_
            * [.player()](#yarp.User+player) => <code>object</code>
            * [.characters()](#yarp.User+characters) => <code>object</code>
            * [.character()](#yarp.User+character) => <code>object</code>
            * [.enter()](#yarp.User+enter) => <code>function</code>
            * [.leave()](#yarp.User+leave) => <code>function</code>
            * [.updateLastLogin(ip)](#yarp.User+updateLastLogin)
            * [.verifyPassword(password)](#yarp.User+verifyPassword)
            * [.giveGroup(group)](#yarp.User+giveGroup) => <code>boolean</code>
            * [.takeGroup(group)](#yarp.User+takeGroup) => <code>boolean</code>
            * [.getGroupByType(type)](#yarp.User+getGroupByType) => <code>string</code>
            * [.getGroupByTypes(type)](#yarp.User+getGroupByTypes) => <code>Array.&lt;string&gt;</code>
            * [.hasGroup(id)](#yarp.User+hasGroup) => <code>boolean</code>
            * [.hasGroup(id)](#yarp.User+hasGroup) => <code>boolean</code>
            * [.hasPermission(permission)](#yarp.User+hasPermission) => <code>boolean</code>
            * [.hasPermission(permissions)](#yarp.User+hasPermission) => <code>boolean</code>
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.User.load)
            * [.config(file)](#yarp.User.config)
    * [.Variable](#yarp.Variable) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Variable(id, value)](#new_yarp.Variable_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Variable.load)
            * [.config(file)](#yarp.Variable.config)
    * [.Vehicle](#yarp.Vehicle) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Vehicle(id, model, position, [heading], [owner], [plate], [color], [alpha], [locked], [engine], [dimension], [visible], [permissions], [items], [enter], [leave])](#new_yarp.Vehicle_new)
        * _instance_
            * [.position(value)](#yarp.Vehicle+position)
            * [.heading(value)](#yarp.Vehicle+heading)
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Vehicle.load)
            * [.config(file)](#yarp.Vehicle.config)
    * [.Weapon](#yarp.Weapon) - [<code>GMObject</code>](#yarp.GMObject)
        * [new Weapon(id, name, [category], [weight], [ammo], [model], [bone], [position], [rotation], [visible])](#new_yarp.Weapon_new)
        * _instance_
            * [.save()](#yarp.GMObject+save)
            * [.remove()](#yarp.GMObject+remove)
            * [.data()](#yarp.GMObject+data) => <code>object</code>
            * [.call()](#yarp.GMObject+call)
            * [.enter()](#yarp.GMObject+enter)
            * [.leave()](#yarp.GMObject+leave)
            * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
        * _static_
            * [.load(object)](#yarp.Weapon.load)
            * [.config(file)](#yarp.Weapon.config)
    * [.blips](#yarp.blips) : <code>object</code>
    * [.characters](#yarp.characters) : <code>object</code>
    * [.checkpoints](#yarp.checkpoints) : <code>object</code>
    * [.colshapes](#yarp.colshapes) : <code>object</code>
    * [.commands](#yarp.commands) : <code>object</code>
    * [.doors](#yarp.doors) : <code>object</code>
    * [.events](#yarp.events) : <code>object</code>
    * [.groups](#yarp.groups) : <code>object</code>
    * [.hotkeys](#yarp.hotkeys) : <code>object</code>
    * [.items](#yarp.items) : <code>object</code>
    * [.labels](#yarp.labels) : <code>object</code>
    * [.locations](#yarp.locations) : <code>object</code>
    * [.markers](#yarp.markers) : <code>object</code>
    * [.npcs](#yarp.npcs) : <code>object</code>
    * [.props](#yarp.props) : <code>object</code>
    * [.transactions](#yarp.transactions) : <code>object</code>
    * [.users](#yarp.users) : <code>object</code>
    * [.variables](#yarp.variables) : <code>object</code>
    * [.vehicles](#yarp.vehicles) : <code>object</code>
    * [.weapons](#yarp.weapons) : <code>object</code>
    * [.mng](#yarp.mng) : <code>object</code>
        * [.register(object)](#yarp.mng.register)
        * [.save(object)](#yarp.mng.save)
        * [.remove(object)](#yarp.mng.remove)
        * [.load(Class)](#yarp.mng.load)
    * [.db](#yarp.db) : <code>object</code>
        * [.connect([url])](#yarp.db.connect) => <code>Promise.&lt;object&gt;</code>
        * [.insert(collection, docs, [options])](#yarp.db.insert) => <code>Promise.&lt;object&gt;</code>
        * [.remove(collection, selector, [options])](#yarp.db.remove) => <code>Promise.&lt;object&gt;</code>
        * [.save(collection, doc, [options])](#yarp.db.save) => <code>Promise.&lt;object&gt;</code>
        * [.update(collection, selector, doc, [options])](#yarp.db.update) => <code>Promise.&lt;object&gt;</code>
        * [.destinct(collection, key, [query], [options])](#yarp.db.destinct) => <code>Promise.&lt;object&gt;</code>
        * [.count(collection, [query], [options])](#yarp.db.count) => <code>Promise.&lt;object&gt;</code>
        * [.find(collection, query, [options])](#yarp.db.find) => <code>Promise.&lt;Array&gt;</code>
        * [.indexes(collection)](#yarp.db.indexes) => <code>Promise.&lt;object&gt;</code>
        * [.aggregate(collection, query, [options])](#yarp.db.aggregate) => <code>Promise.&lt;object&gt;</code>
        * [.stats([options])](#yarp.db.stats) => <code>Promise.&lt;object&gt;</code>
        * [.close()](#yarp.db.close)
    * [.utils](#yarp.utils) : <code>object</code>
        * [.getTimestamp(date)](#yarp.utils.getTimestamp) => <code>string</code>
        * [.round(value, decimals)](#yarp.utils.round) => <code>number</code>
        * [.Vector3Offset(vector, offset)](#yarp.utils.Vector3Offset) => <code>Vector3</code>
        * [.Vector3Distance(vector1, vector2)](#yarp.utils.Vector3Distance) => <code>number</code>
        * [.randomString(digits, possible)](#yarp.utils.randomString) => <code>string</code>
        * [.getSubstrings(string)](#yarp.utils.getSubstrings) => <code>Array</code>
        * [.getParamNames(func)](#yarp.utils.getParamNames) => <code>Array</code>
        * [.paramsToString(obj)](#yarp.utils.paramsToString) => <code>string</code>
        * [.getTimezoneDate(timezone)](#yarp.utils.getTimezoneDate) => <code>Date</code>

<a name="yarp.Blip"></a>

### yarp.Blip - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Blip](#yarp.Blip) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Blip(id, position, [name], [sprite], [scale], [color], [alpha], [drawDistance], [fade], [rotation], [dimension])](#new_yarp.Blip_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Blip.load)
        * [.config(file)](#yarp.Blip.config)

<a name="new_yarp.Blip_new"></a>

#### new Blip(id, position, [name], [sprite], [scale], [color], [alpha], [drawDistance], [fade], [rotation], [dimension])
Creates a Blip.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Blip id. |
| position | <code>Vector3</code> |  | Blip position. |
| [name] | <code>string</code> | <code>&quot;&#x27;Blip&#x27;&quot;</code> | Blip name. |
| [sprite] | <code>number</code> | <code>1</code> | Blip sprite. |
| [scale] | <code>Float</code> | <code>1</code> | Blip scale. |
| [color] | <code>number</code> | <code>4</code> | Blip color. |
| [alpha] | <code>number</code> | <code>255</code> | Blip alpha. |
| [drawDistance] | <code>Float</code> | <code>100</code> | Blip draw distance. |
| [fade] | <code>boolean</code> | <code>true</code> | Blip fade. |
| [rotation] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Blip rotation. |
| [dimension] | <code>number</code> | <code>0</code> | Blip dimension. |

<a name="yarp.GMObject+save"></a>

#### blip.save()
Save the object.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.GMObject+remove"></a>

#### blip.remove()
Remove the object.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.GMObject+data"></a>

#### blip.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### blip.call()
Evals the call parameter.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.GMObject+enter"></a>

#### blip.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.GMObject+leave"></a>

#### blip.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### blip.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Blip</code>](#yarp.Blip)  
<a name="yarp.Blip.load"></a>

#### Blip.load(object)
Load from object.

**Kind**: static method of [<code>Blip</code>](#yarp.Blip)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Blip.config"></a>

#### Blip.config(file)
Load from config.

**Kind**: static method of [<code>Blip</code>](#yarp.Blip)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Character"></a>

### yarp.Character - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Character](#yarp.Character) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Character(id, socialClub, [age], [face], [lastLogin], [wallet], [bank], [health], [armour], [hunger], [thirst], [position], [heading], [groups], [weapons], [skills], [weight], [inventory], [customization], [decoration], [clothes], [enter], [leave])](#new_yarp.Character_new)
    * _instance_
        * [.player()](#yarp.Character+player) => <code>object</code>
        * [.user()](#yarp.Character+user) => <code>object</code>
        * [.balance()](#yarp.Character+balance) => <code>Array.&lt;object&gt;</code>
        * [.enter()](#yarp.Character+enter) => <code>function</code>
        * [.leave()](#yarp.Character+leave) => <code>function</code>
        * [.updateLastLogin(ip)](#yarp.Character+updateLastLogin)
        * [.giveMoney(value)](#yarp.Character+giveMoney)
        * [.tryWalletPayment(value)](#yarp.Character+tryWalletPayment) => <code>boolean</code>
        * [.tryBankPayment(value)](#yarp.Character+tryBankPayment) => <code>boolean</code>
        * [.tryFullPayment(value)](#yarp.Character+tryFullPayment) => <code>boolean</code>
        * [.tryDeposit(value)](#yarp.Character+tryDeposit) => <code>boolean</code>
        * [.tryWithdraw(value)](#yarp.Character+tryWithdraw) => <code>boolean</code>
        * [.tryTransfer(target, value)](#yarp.Character+tryTransfer) => <code>boolean</code>
        * [.giveItem(item, value)](#yarp.Character+giveItem) => <code>boolean</code>
        * [.takeItem(item, value)](#yarp.Character+takeItem) => <code>boolean</code>
        * [.takeItem(id)](#yarp.Character+takeItem) => <code>boolean</code>
        * [.hasItems(items)](#yarp.Character+hasItems) => <code>boolean</code>
        * [.giveWeapon(weapon, amount)](#yarp.Character+giveWeapon)
        * [.takeWeapon(weapon)](#yarp.Character+takeWeapon)
        * [.takeWeaponAmmo(id, amount)](#yarp.Character+takeWeaponAmmo)
        * [.giveWeaponAmmo(id, amount)](#yarp.Character+giveWeaponAmmo)
        * [.takeAmmo(id, amount)](#yarp.Character+takeAmmo)
        * [.giveAmmo(id, amount)](#yarp.Character+giveAmmo)
        * [.hasWeapon(id)](#yarp.Character+hasWeapon) => <code>boolean</code>
        * [.hasWeapons(weapons)](#yarp.Character+hasWeapons) => <code>boolean</code>
        * [.giveGroup(group)](#yarp.Character+giveGroup) => <code>boolean</code>
        * [.takeGroup(group)](#yarp.Character+takeGroup) => <code>boolean</code>
        * [.getGroupByType(type)](#yarp.Character+getGroupByType) => <code>string</code>
        * [.getGroupByTypes(type)](#yarp.Character+getGroupByTypes) => <code>Array.&lt;string&gt;</code>
        * [.hasGroup(id)](#yarp.Character+hasGroup) => <code>boolean</code>
        * [.hasGroup(id)](#yarp.Character+hasGroup) => <code>boolean</code>
        * [.hasPermission(permission)](#yarp.Character+hasPermission) => <code>boolean</code>
        * [.hasPermission(permissions)](#yarp.Character+hasPermission) => <code>boolean</code>
        * [.increaseHunger(value)](#yarp.Character+increaseHunger)
        * [.increaseThirst(value)](#yarp.Character+increaseThirst)
        * [.decreaseHunger(value)](#yarp.Character+decreaseHunger)
        * [.decreaseThirst(value)](#yarp.Character+decreaseThirst)
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Character.load)
        * [.config(file)](#yarp.Character.config)

<a name="new_yarp.Character_new"></a>

#### new Character(id, socialClub, [age], [face], [lastLogin], [wallet], [bank], [health], [armour], [hunger], [thirst], [position], [heading], [groups], [weapons], [skills], [weight], [inventory], [customization], [decoration], [clothes], [enter], [leave])
Creates a Character.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Character name. |
| socialClub | <code>Vector3</code> |  | User social club. |
| [age] | <code>number</code> | <code>18</code> | Character age. |
| [face] | <code>object</code> | <code>{}</code> | Character face. |
| [lastLogin] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Character last login. |
| [wallet] | <code>Float</code> | <code>yarp.variables[&#x27;Starting Wallet&#x27;].value</code> | Character wallet. |
| [bank] | <code>Float</code> | <code>yarp.variables[&#x27;Starting Bank&#x27;].value</code> | Character bank. |
| [health] | <code>Float</code> | <code>100</code> | Character health. |
| [armour] | <code>Float</code> | <code>0</code> | Character armour. |
| [hunger] | <code>Float</code> | <code>0</code> | Character hunger. |
| [thirst] | <code>Float</code> | <code>0</code> | Character thirst. |
| [position] | <code>Vector3</code> | <code>yarp.variables[&#x27;First Spawn&#x27;].value</code> | Character position. |
| [heading] | <code>number</code> | <code>yarp.variables[&#x27;First Heading&#x27;].value</code> | Character heading. |
| [groups] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Character groups. |
| [weapons] | <code>object</code> | <code>{}</code> | Character weapons. |
| [skills] | <code>object</code> | <code>{}</code> | Character skills. |
| [weight] | <code>Float</code> | <code>0</code> | Character weight. |
| [inventory] | <code>object</code> | <code>{}</code> | Character inventory. |
| [customization] | <code>object</code> | <code>{}</code> | Character customization. |
| [decoration] | <code>object</code> | <code>{}</code> | Character decoration. |
| [clothes] | <code>object</code> | <code>{}</code> | Character clothes. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Character enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Character leave function. |

<a name="yarp.Character+player"></a>

#### character.player() => <code>object</code>
Get character player.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>object</code> - Player.  
<a name="yarp.Character+user"></a>

#### character.user() => <code>object</code>
Get character user.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>object</code> - User.  
<a name="yarp.Character+balance"></a>

#### character.balance() => <code>Array.&lt;object&gt;</code>
Get character balance.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>Array.&lt;object&gt;</code> - Balance.  
<a name="yarp.Character+enter"></a>

#### character.enter() => <code>function</code>
Call enter fuction for character and it's groups.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Overrides**: [<code>enter</code>](#yarp.GMObject+enter)  
**Returns**: <code>function</code> - Enter functions.  
**Emits**: <code>event:characterJoinedGroup</code>  
<a name="yarp.Character+leave"></a>

#### character.leave() => <code>function</code>
Call leave fuction for character and it's groups.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Overrides**: [<code>leave</code>](#yarp.GMObject+leave)  
**Returns**: <code>function</code> - Leave functions.  
**Emits**: <code>event:characterLeftGroup</code>  
<a name="yarp.Character+updateLastLogin"></a>

#### character.updateLastLogin(ip)
Update character last login.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | Character ip. |

<a name="yarp.Character+giveMoney"></a>

#### character.giveMoney(value)
Give money.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to give. |

<a name="yarp.Character+tryWalletPayment"></a>

#### character.tryWalletPayment(value) => <code>boolean</code>
Try wallet payment.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to pay. |

<a name="yarp.Character+tryBankPayment"></a>

#### character.tryBankPayment(value) => <code>boolean</code>
Try bank payment.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to pay. |

<a name="yarp.Character+tryFullPayment"></a>

#### character.tryFullPayment(value) => <code>boolean</code>
Try full payment.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to pay. |

<a name="yarp.Character+tryDeposit"></a>

#### character.tryDeposit(value) => <code>boolean</code>
Try deposit.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to deposit. |

<a name="yarp.Character+tryWithdraw"></a>

#### character.tryWithdraw(value) => <code>boolean</code>
Try withdraw.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Amount to withdraw. |

<a name="yarp.Character+tryTransfer"></a>

#### character.tryTransfer(target, value) => <code>boolean</code>
Try transfer.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | Target character name. |
| value | <code>number</code> | Amount to transfer. |

<a name="yarp.Character+giveItem"></a>

#### character.giveItem(item, value) => <code>boolean</code>
Give an item.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | Item to give. |
| value | <code>number</code> | Amount to give. |

<a name="yarp.Character+takeItem"></a>

#### character.takeItem(item, value) => <code>boolean</code>
Take an item.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | Item to take. |
| value | <code>number</code> | Amount to take. |

<a name="yarp.Character+takeItem"></a>

#### character.takeItem(id) => <code>boolean</code>
Check if has an item.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not the item.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Item id. |

<a name="yarp.Character+hasItems"></a>

#### character.hasItems(items) => <code>boolean</code>
Check if has all items.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not all items.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | Items id. |

<a name="yarp.Character+giveWeapon"></a>

#### character.giveWeapon(weapon, amount)
Give a weapon.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Emits**: <code>event:equipWeapon</code>  

| Param | Type | Description |
| --- | --- | --- |
| weapon | <code>object</code> | Weapon object or id. |
| amount | <code>number</code> | Amount of bullets. |

<a name="yarp.Character+takeWeapon"></a>

#### character.takeWeapon(weapon)
Take a weapon.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Emits**: <code>event:unequipWeapon</code>  

| Param | Type | Description |
| --- | --- | --- |
| weapon | <code>object</code> | Weapon object or id. |

<a name="yarp.Character+takeWeaponAmmo"></a>

#### character.takeWeaponAmmo(id, amount)
Take weapon ammo.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Weapon id. |
| amount | <code>number</code> | Amount of bullets. |

<a name="yarp.Character+giveWeaponAmmo"></a>

#### character.giveWeaponAmmo(id, amount)
Give weapon ammo.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Weapon id. |
| amount | <code>number</code> | Amount of bullets. |

<a name="yarp.Character+takeAmmo"></a>

#### character.takeAmmo(id, amount)
Take ammo.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Ammo id. |
| amount | <code>number</code> | Amount of bullets. |

<a name="yarp.Character+giveAmmo"></a>

#### character.giveAmmo(id, amount)
Give ammo.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Ammo id. |
| amount | <code>number</code> | Amount of bullets. |

<a name="yarp.Character+hasWeapon"></a>

#### character.hasWeapon(id) => <code>boolean</code>
Check if has a weapon.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not the weapon.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Weapon id. |

<a name="yarp.Character+hasWeapons"></a>

#### character.hasWeapons(weapons) => <code>boolean</code>
Check if has all weapons.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not all the weapons.  

| Param | Type | Description |
| --- | --- | --- |
| weapons | <code>Array.&lt;string&gt;</code> | Weapons id. |

<a name="yarp.Character+giveGroup"></a>

#### character.giveGroup(group) => <code>boolean</code>
Give a group.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  
**Emits**: <code>event:characterJoinedGroup</code>  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | Group id. |

<a name="yarp.Character+takeGroup"></a>

#### character.takeGroup(group) => <code>boolean</code>
Take a group.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - Operation success/fail.  
**Emits**: <code>event:characterLeftGroup</code>  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | Group id. |

<a name="yarp.Character+getGroupByType"></a>

#### character.getGroupByType(type) => <code>string</code>
Get group by type.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>string</code> - Group id.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Group type. |

<a name="yarp.Character+getGroupByTypes"></a>

#### character.getGroupByTypes(type) => <code>Array.&lt;string&gt;</code>
Get groups by types.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>Array.&lt;string&gt;</code> - Group ids.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Array.&lt;string&gt;</code> | Group types. |

<a name="yarp.Character+hasGroup"></a>

#### character.hasGroup(id) => <code>boolean</code>
Check if has group.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not the group.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Group id. |

<a name="yarp.Character+hasGroup"></a>

#### character.hasGroup(id) => <code>boolean</code>
Check if has all groups.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not all the groups.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Array.&lt;string&gt;</code> | Group ids. |

<a name="yarp.Character+hasPermission"></a>

#### character.hasPermission(permission) => <code>boolean</code>
Check if has permission.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not the permission.  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | Permission. |

<a name="yarp.Character+hasPermission"></a>

#### character.hasPermission(permissions) => <code>boolean</code>
Check if has all permissions.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>boolean</code> - If has or not all permissions.  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>Array.&lt;string&gt;</code> | Permissions. |

<a name="yarp.Character+increaseHunger"></a>

#### character.increaseHunger(value)
Increase hunger.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value to increase. |

<a name="yarp.Character+increaseThirst"></a>

#### character.increaseThirst(value)
Increase thirst.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value to increase. |

<a name="yarp.Character+decreaseHunger"></a>

#### character.decreaseHunger(value)
Decrease hunger.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value to decrease. |

<a name="yarp.Character+decreaseThirst"></a>

#### character.decreaseThirst(value)
Decrease thirst.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value to decrease. |

<a name="yarp.GMObject+save"></a>

#### character.save()
Save the object.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
<a name="yarp.GMObject+remove"></a>

#### character.remove()
Remove the object.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
<a name="yarp.GMObject+data"></a>

#### character.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### character.call()
Evals the call parameter.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### character.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Character</code>](#yarp.Character)  
<a name="yarp.Character.load"></a>

#### Character.load(object)
Load from object.

**Kind**: static method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Character.config"></a>

#### Character.config(file)
Load from config.

**Kind**: static method of [<code>Character</code>](#yarp.Character)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Checkpoint"></a>

### yarp.Checkpoint - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Checkpoint](#yarp.Checkpoint) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Checkpoint(id, position, [type], [radius], [color], [direction], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Checkpoint_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Checkpoint.load)
        * [.config(file)](#yarp.Checkpoint.config)

<a name="new_yarp.Checkpoint_new"></a>

#### new Checkpoint(id, position, [type], [radius], [color], [direction], [dimension], [visible], [range], [enter], [leave], [permissions], [items])
Creates a Checkpoint.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Checkpoint id. |
| position | <code>Vector3</code> |  | Checkpoint position. |
| [type] | <code>number</code> | <code>0</code> | Checkpoint type. |
| [radius] | <code>number</code> | <code>1</code> | Checkpoint radius. |
| [color] | <code>Array.&lt;number&gt;</code> | <code>[255,255,0,255]</code> | Checkpoint color. |
| [direction] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Checkpoint direction. |
| [dimension] | <code>number</code> | <code>0</code> | Checkpoint dimension. |
| [visible] | <code>boolean</code> | <code>true</code> | Checkpoint visible. |
| [range] | <code>number</code> | <code>3</code> | Checkpoint range. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Checkpoint enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Checkpoint leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Checkpoint permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Checkpoint items. |

<a name="yarp.GMObject+save"></a>

#### checkpoint.save()
Save the object.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.GMObject+remove"></a>

#### checkpoint.remove()
Remove the object.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.GMObject+data"></a>

#### checkpoint.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### checkpoint.call()
Evals the call parameter.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.GMObject+enter"></a>

#### checkpoint.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.GMObject+leave"></a>

#### checkpoint.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### checkpoint.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Checkpoint</code>](#yarp.Checkpoint)  
<a name="yarp.Checkpoint.load"></a>

#### Checkpoint.load(object)
Load from object.

**Kind**: static method of [<code>Checkpoint</code>](#yarp.Checkpoint)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Checkpoint.config"></a>

#### Checkpoint.config(file)
Load from config.

**Kind**: static method of [<code>Checkpoint</code>](#yarp.Checkpoint)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Colshape"></a>

### yarp.Colshape - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Colshape](#yarp.Colshape) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Colshape(id, position, [type], [width], [height], [depth], [enter], [leave], [permissions], [items])](#new_yarp.Colshape_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Colshape.load)
        * [.config(file)](#yarp.Colshape.config)

<a name="new_yarp.Colshape_new"></a>

#### new Colshape(id, position, [type], [width], [height], [depth], [enter], [leave], [permissions], [items])
Creates a Colshape.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Colshape id. |
| position | <code>Vector3</code> |  | Colshape position. |
| [type] | <code>number</code> | <code>0</code> | Colshape type. |
| [width] | <code>number</code> | <code>10</code> | Colshape width. |
| [height] | <code>number</code> | <code>10</code> | Colshape height. |
| [depth] | <code>number</code> | <code>10</code> | Colshape depth. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Colshape enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Colshape leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Colshape permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Colshape items. |

<a name="yarp.GMObject+save"></a>

#### colshape.save()
Save the object.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.GMObject+remove"></a>

#### colshape.remove()
Remove the object.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.GMObject+data"></a>

#### colshape.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### colshape.call()
Evals the call parameter.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.GMObject+enter"></a>

#### colshape.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.GMObject+leave"></a>

#### colshape.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### colshape.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Colshape</code>](#yarp.Colshape)  
<a name="yarp.Colshape.load"></a>

#### Colshape.load(object)
Load from object.

**Kind**: static method of [<code>Colshape</code>](#yarp.Colshape)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Colshape.config"></a>

#### Colshape.config(file)
Load from config.

**Kind**: static method of [<code>Colshape</code>](#yarp.Colshape)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Command"></a>

### yarp.Command - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Command](#yarp.Command) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Command(id, call, [category], [hint], [position], [range], [permissions], [items])](#new_yarp.Command_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Command.load)
        * [.config(file)](#yarp.Command.config)

<a name="new_yarp.Command_new"></a>

#### new Command(id, call, [category], [hint], [position], [range], [permissions], [items])
Creates a Command.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Command id. |
| call | <code>function</code> |  | Command call function. |
| [category] | <code>string</code> | <code>&quot;&#x27;None&#x27;&quot;</code> | Command category. |
| [hint] | <code>string</code> | <code>&quot;&#x27;There\\&#x27;s no hint.&#x27;&quot;</code> | Command hint. |
| [position] | <code>Vector3</code> | <code></code> | Command position. |
| [range] | <code>number</code> | <code></code> | Command range. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Command permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Command items. |

<a name="yarp.GMObject+save"></a>

#### command.save()
Save the object.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.GMObject+remove"></a>

#### command.remove()
Remove the object.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.GMObject+data"></a>

#### command.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### command.call()
Evals the call parameter.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.GMObject+enter"></a>

#### command.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.GMObject+leave"></a>

#### command.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### command.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Command</code>](#yarp.Command)  
<a name="yarp.Command.load"></a>

#### Command.load(object)
Load from object.

**Kind**: static method of [<code>Command</code>](#yarp.Command)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Command.config"></a>

#### Command.config(file)
Load from config.

**Kind**: static method of [<code>Command</code>](#yarp.Command)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Door"></a>

### yarp.Door - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Door](#yarp.Door) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Door(id, model, position, [range], [enter], [leave], [permissions], [items])](#new_yarp.Door_new)
    * _instance_
        * [.open()](#yarp.Door+open)
        * [.close()](#yarp.Door+close)
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Door.load)
        * [.config(file)](#yarp.Door.config)

<a name="new_yarp.Door_new"></a>

#### new Door(id, model, position, [range], [enter], [leave], [permissions], [items])
Creates a Door.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Door id. |
| model | <code>string</code> |  | Door model. |
| position | <code>Vector3</code> |  | Door position. |
| [range] | <code>number</code> | <code>0</code> | Door range. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Door enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Door leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Door permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Door items. |

<a name="yarp.Door+open"></a>

#### door.open()
Broadcast open door event.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.Door+close"></a>

#### door.close()
Broadcast close door event.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+save"></a>

#### door.save()
Save the object.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+remove"></a>

#### door.remove()
Remove the object.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+data"></a>

#### door.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### door.call()
Evals the call parameter.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+enter"></a>

#### door.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+leave"></a>

#### door.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### door.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Door</code>](#yarp.Door)  
<a name="yarp.Door.load"></a>

#### Door.load(object)
Load from object.

**Kind**: static method of [<code>Door</code>](#yarp.Door)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Door.config"></a>

#### Door.config(file)
Load from config.

**Kind**: static method of [<code>Door</code>](#yarp.Door)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Event"></a>

### yarp.Event - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Event](#yarp.Event) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Event(id, call, [permissions], [items])](#new_yarp.Event_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Event.load)
        * [.config(file)](#yarp.Event.config)

<a name="new_yarp.Event_new"></a>

#### new Event(id, call, [permissions], [items])
Creates a Event.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Event id. |
| call | <code>function</code> |  | Event call function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Event permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Event items. |

<a name="yarp.GMObject+save"></a>

#### event.save()
Save the object.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.GMObject+remove"></a>

#### event.remove()
Remove the object.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.GMObject+data"></a>

#### event.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### event.call()
Evals the call parameter.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.GMObject+enter"></a>

#### event.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.GMObject+leave"></a>

#### event.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### event.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Event</code>](#yarp.Event)  
<a name="yarp.Event.load"></a>

#### Event.load(object)
Load from object.

**Kind**: static method of [<code>Event</code>](#yarp.Event)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Event.config"></a>

#### Event.config(file)
Load from config.

**Kind**: static method of [<code>Event</code>](#yarp.Event)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.GMObject"></a>

### *yarp.GMObject*
**Kind**: static abstract class of [<code>yarp</code>](#yarp)  

* *[.GMObject](#yarp.GMObject)*
    * *[new GMObject()](#new_yarp.GMObject_new)*
    * *[.save()](#yarp.GMObject+save)*
    * *[.remove()](#yarp.GMObject+remove)*
    * *[.data()](#yarp.GMObject+data) => <code>object</code>*
    * *[.call()](#yarp.GMObject+call)*
    * *[.enter()](#yarp.GMObject+enter)*
    * *[.leave()](#yarp.GMObject+leave)*
    * *[.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)*

<a name="new_yarp.GMObject_new"></a>

#### *new GMObject()*
Implements common functionalities across all YARP objects.

**Throws**:

- <code>TypeError</code> - Abstract class GMObject cannot be instantiated directly.

<a name="yarp.GMObject+save"></a>

#### *gmObject.save()*
Save the object.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.GMObject+remove"></a>

#### *gmObject.remove()*
Remove the object.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.GMObject+data"></a>

#### *gmObject.data() => <code>object</code>*
Get only persisten data

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### *gmObject.call()*
Evals the call parameter.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.GMObject+enter"></a>

#### *gmObject.enter()*
Evals the enter parameter.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.GMObject+leave"></a>

#### *gmObject.leave()*
Evals the leave parameter.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### *gmObject.makeGetterSetter()*
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>GMObject</code>](#yarp.GMObject)  
<a name="yarp.Group"></a>

### yarp.Group - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Group](#yarp.Group) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Group(id, [type], [enter], [leave], [permissions], [items])](#new_yarp.Group_new)
    * _instance_
        * [.users()](#yarp.Group+users) => <code>object</code>
        * [.characters()](#yarp.Group+characters) => <code>object</code>
        * [.addPermission(permission)](#yarp.Group+addPermission)
        * [.removePermission(permission)](#yarp.Group+removePermission)
        * [.hasPermission(permission)](#yarp.Group+hasPermission) => <code>boolean</code>
        * [.hasPermission(permissions)](#yarp.Group+hasPermission) => <code>boolean</code>
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Group.load)
        * [.config(file)](#yarp.Group.config)

<a name="new_yarp.Group_new"></a>

#### new Group(id, [type], [enter], [leave], [permissions], [items])
Creates a Group.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Group id. |
| [type] | <code>string</code> | <code>null</code> | Group type. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Group enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Group leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Door permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Group items. |

<a name="yarp.Group+users"></a>

#### group.users() => <code>object</code>
Get users on group.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
**Returns**: <code>object</code> - Users.  
<a name="yarp.Group+characters"></a>

#### group.characters() => <code>object</code>
Get characters on group.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
**Returns**: <code>object</code> - Characters.  
<a name="yarp.Group+addPermission"></a>

#### group.addPermission(permission)
Add permission to group.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | Permission. |

<a name="yarp.Group+removePermission"></a>

#### group.removePermission(permission)
Remove permission from group.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | Permission. |

<a name="yarp.Group+hasPermission"></a>

#### group.hasPermission(permission) => <code>boolean</code>
Check if has permission.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
**Returns**: <code>boolean</code> - If has or not the permission.  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | Permission. |

<a name="yarp.Group+hasPermission"></a>

#### group.hasPermission(permissions) => <code>boolean</code>
Check if has all permissions.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
**Returns**: <code>boolean</code> - If has or not all permissions.  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>Array.&lt;string&gt;</code> | Permissions. |

<a name="yarp.GMObject+save"></a>

#### group.save()
Save the object.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.GMObject+remove"></a>

#### group.remove()
Remove the object.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.GMObject+data"></a>

#### group.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### group.call()
Evals the call parameter.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.GMObject+enter"></a>

#### group.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.GMObject+leave"></a>

#### group.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### group.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Group</code>](#yarp.Group)  
<a name="yarp.Group.load"></a>

#### Group.load(object)
Load from object.

**Kind**: static method of [<code>Group</code>](#yarp.Group)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Group.config"></a>

#### Group.config(file)
Load from config.

**Kind**: static method of [<code>Group</code>](#yarp.Group)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Hotkey"></a>

### yarp.Hotkey - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Hotkey](#yarp.Hotkey) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Hotkey(id, key, call, [category], [hint], [position], [range], [permissions], [items])](#new_yarp.Hotkey_new)
    * _instance_
        * [.bind(player, args)](#yarp.Hotkey+bind)
        * [.unbind(player)](#yarp.Hotkey+unbind)
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Hotkey.load)
        * [.config(file)](#yarp.Hotkey.config)

<a name="new_yarp.Hotkey_new"></a>

#### new Hotkey(id, key, call, [category], [hint], [position], [range], [permissions], [items])
Creates a Hotkey.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Hotkey id. |
| key | <code>string</code> |  | Hotkey key. |
| call | <code>function</code> |  | Hotkey call function. |
| [category] | <code>string</code> | <code>&quot;&#x27;None&#x27;&quot;</code> | Hotkey category. |
| [hint] | <code>string</code> | <code>&quot;&#x27;There\\&#x27;s no hint.&#x27;&quot;</code> | Hotkey hint. |
| [position] | <code>Vector3</code> | <code></code> | Hotkey position. |
| [range] | <code>number</code> | <code></code> | Hotkey range. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Hotkey permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Hotkey items. |

<a name="yarp.Hotkey+bind"></a>

#### hotkey.bind(player, args)
Bind hotkey to player.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
**Emits**: <code>event:playerBindKey</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | Player to bind to. |
| args | <code>Array</code> | Arguments to the bind. |

<a name="yarp.Hotkey+unbind"></a>

#### hotkey.unbind(player)
Unbind hotkey to player.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
**Emits**: <code>event:playerUnbindKey</code>  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>object</code> | Player to unbind from. |

<a name="yarp.GMObject+save"></a>

#### hotkey.save()
Save the object.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.GMObject+remove"></a>

#### hotkey.remove()
Remove the object.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.GMObject+data"></a>

#### hotkey.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### hotkey.call()
Evals the call parameter.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.GMObject+enter"></a>

#### hotkey.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.GMObject+leave"></a>

#### hotkey.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### hotkey.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Hotkey</code>](#yarp.Hotkey)  
<a name="yarp.Hotkey.load"></a>

#### Hotkey.load(object)
Load from object.

**Kind**: static method of [<code>Hotkey</code>](#yarp.Hotkey)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Hotkey.config"></a>

#### Hotkey.config(file)
Load from config.

**Kind**: static method of [<code>Hotkey</code>](#yarp.Hotkey)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Item"></a>

### yarp.Item - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Item](#yarp.Item) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Item(id, name, [category], [weight], [spoil], [model], [options])](#new_yarp.Item_new)
    * _instance_
        * [.options()](#yarp.Item+options) => <code>object</code>
        * [.isAmmo()](#yarp.Item+isAmmo) => <code>boolean</code>
        * [.isAmmo()](#yarp.Item+isAmmo) => <code>boolean</code>
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Item.load)
        * [.config(file)](#yarp.Item.config)

<a name="new_yarp.Item_new"></a>

#### new Item(id, name, [category], [weight], [spoil], [model], [options])
Creates a Item.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Item id. |
| name | <code>string</code> |  | Item name. |
| [category] | <code>string</code> | <code>&quot;&#x27;None&#x27;&quot;</code> | Item category. |
| [weight] | <code>number</code> | <code>0.5</code> | Item weight. |
| [spoil] | <code>number</code> | <code>false</code> | Item spoil. |
| [model] | <code>number</code> | <code>&#x27;&#x27;</code> | Item model. |
| [options] | <code>object</code> | <code>{}</code> | Item options. |

<a name="yarp.Item+options"></a>

#### item.options() => <code>object</code>
Gets item options functions.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
**Returns**: <code>object</code> - Functions indexed by option.  
<a name="yarp.Item+isAmmo"></a>

#### item.isAmmo() => <code>boolean</code>
Load from object.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
**Returns**: <code>boolean</code> - If the item is weapon or not.  
<a name="yarp.Item+isAmmo"></a>

#### item.isAmmo() => <code>boolean</code>
Load from object.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
**Returns**: <code>boolean</code> - If the item is ammo or not.  
<a name="yarp.GMObject+save"></a>

#### item.save()
Save the object.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.GMObject+remove"></a>

#### item.remove()
Remove the object.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.GMObject+data"></a>

#### item.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### item.call()
Evals the call parameter.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.GMObject+enter"></a>

#### item.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.GMObject+leave"></a>

#### item.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### item.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Item</code>](#yarp.Item)  
<a name="yarp.Item.load"></a>

#### Item.load(object)
Load from object.

**Kind**: static method of [<code>Item</code>](#yarp.Item)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Item.config"></a>

#### Item.config(file)
Load from config.

**Kind**: static method of [<code>Item</code>](#yarp.Item)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Label"></a>

### yarp.Label - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Label](#yarp.Label) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Label(id, position, [text], [range], [color], [drawDistance], [font], [los], [dimension], [visible], [enter], [leave], [permissions], [items])](#new_yarp.Label_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Label.load)
        * [.config(file)](#yarp.Label.config)

<a name="new_yarp.Label_new"></a>

#### new Label(id, position, [text], [range], [color], [drawDistance], [font], [los], [dimension], [visible], [enter], [leave], [permissions], [items])
Creates a Label.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Label id. |
| position | <code>Vector3</code> |  | Label position. |
| [text] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Label text. |
| [range] | <code>number</code> | <code>3</code> | Label range. |
| [color] | <code>Array.&lt;number&gt;</code> | <code>[251, 204, 51, 255]</code> | Label color. |
| [drawDistance] | <code>number</code> | <code>10</code> | Label radius. |
| [font] | <code>number</code> | <code>10</code> | Label font. |
| [los] | <code>boolean</code> | <code>true</code> | Label line of sight. |
| [dimension] | <code>number</code> | <code>0</code> | Label dimension. |
| [visible] | <code>boolean</code> | <code>true</code> | Label visible. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Label enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Label leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Label permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Label items. |

<a name="yarp.GMObject+save"></a>

#### label.save()
Save the object.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.GMObject+remove"></a>

#### label.remove()
Remove the object.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.GMObject+data"></a>

#### label.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### label.call()
Evals the call parameter.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.GMObject+enter"></a>

#### label.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.GMObject+leave"></a>

#### label.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### label.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Label</code>](#yarp.Label)  
<a name="yarp.Label.load"></a>

#### Label.load(object)
Load from object.

**Kind**: static method of [<code>Label</code>](#yarp.Label)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Label.config"></a>

#### Label.config(file)
Load from config.

**Kind**: static method of [<code>Label</code>](#yarp.Label)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Location"></a>

### yarp.Location - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Location](#yarp.Location) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Location(id, [inventory], [owner], [money], [price])](#new_yarp.Location_new)
    * _instance_
        * [.sale(categories)](#yarp.Location+sale)
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Location.load)
        * [.config(file)](#yarp.Location.config)

<a name="new_yarp.Location_new"></a>

#### new Location(id, [inventory], [owner], [money], [price])
Creates a Location.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Location id. |
| [inventory] | <code>object</code> | <code>{}</code> | Location inventory. |
| [owner] | <code>string</code> | <code>null</code> | Location owner. |
| [money] | <code>number</code> | <code>0</code> | Location radius. |
| [price] | <code>number</code> | <code>0</code> | Location font. |

<a name="yarp.Location+sale"></a>

#### location.sale(categories)
Get items with price in inventory.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  

| Param | Type | Description |
| --- | --- | --- |
| categories | <code>object</code> | Items indexed by categories and id. |

<a name="yarp.GMObject+save"></a>

#### location.save()
Save the object.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.GMObject+remove"></a>

#### location.remove()
Remove the object.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.GMObject+data"></a>

#### location.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### location.call()
Evals the call parameter.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.GMObject+enter"></a>

#### location.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.GMObject+leave"></a>

#### location.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### location.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Location</code>](#yarp.Location)  
<a name="yarp.Location.load"></a>

#### Location.load(object)
Load from object.

**Kind**: static method of [<code>Location</code>](#yarp.Location)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Location.config"></a>

#### Location.config(file)
Load from config.

**Kind**: static method of [<code>Location</code>](#yarp.Location)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Marker"></a>

### yarp.Marker - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Marker](#yarp.Marker) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Marker(id, position, [type], [radius], [color], [direction], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Marker_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Marker.load)
        * [.config(file)](#yarp.Marker.config)

<a name="new_yarp.Marker_new"></a>

#### new Marker(id, position, [type], [radius], [color], [direction], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])
Creates a Marker.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Marker id. |
| position | <code>Vector3</code> |  | Marker position. |
| [type] | <code>number</code> | <code>1</code> | Marker type. |
| [radius] | <code>number</code> | <code>1</code> | Marker radius. |
| [color] | <code>Array.&lt;number&gt;</code> | <code>[255,255,0,255]</code> | Marker color. |
| [direction] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Marker direction. |
| [rotation] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Marker rotation. |
| [dimension] | <code>number</code> | <code>0</code> | Marker dimension. |
| [visible] | <code>boolean</code> | <code>true</code> | Marker visible. |
| [range] | <code>number</code> | <code>3</code> | Marker range. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Marker enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Marker leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Marker permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Marker items. |

<a name="yarp.GMObject+save"></a>

#### marker.save()
Save the object.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.GMObject+remove"></a>

#### marker.remove()
Remove the object.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.GMObject+data"></a>

#### marker.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### marker.call()
Evals the call parameter.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.GMObject+enter"></a>

#### marker.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.GMObject+leave"></a>

#### marker.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### marker.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Marker</code>](#yarp.Marker)  
<a name="yarp.Marker.load"></a>

#### Marker.load(object)
Load from object.

**Kind**: static method of [<code>Marker</code>](#yarp.Marker)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Marker.config"></a>

#### Marker.config(file)
Load from config.

**Kind**: static method of [<code>Marker</code>](#yarp.Marker)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Npc"></a>

### yarp.Npc - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Npc](#yarp.Npc) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Npc(id, model, position, [heading], [drawDistance], [dimension], [call])](#new_yarp.Npc_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Npc.load)
        * [.config(file)](#yarp.Npc.config)

<a name="new_yarp.Npc_new"></a>

#### new Npc(id, model, position, [heading], [drawDistance], [dimension], [call])
Creates a Npc.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Npc id. |
| model | <code>string</code> |  | Npc model. |
| position | <code>Vector3</code> |  | Npc position. |
| [heading] | <code>number</code> | <code>0</code> | Npc type. |
| [drawDistance] | <code>number</code> | <code>100</code> | Npc dimension. |
| [dimension] | <code>boolean</code> | <code>0</code> | Npc visible. |
| [call] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Npc call function. |

<a name="yarp.GMObject+save"></a>

#### npc.save()
Save the object.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.GMObject+remove"></a>

#### npc.remove()
Remove the object.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.GMObject+data"></a>

#### npc.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### npc.call()
Evals the call parameter.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.GMObject+enter"></a>

#### npc.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.GMObject+leave"></a>

#### npc.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### npc.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Npc</code>](#yarp.Npc)  
<a name="yarp.Npc.load"></a>

#### Npc.load(object)
Load from object.

**Kind**: static method of [<code>Npc</code>](#yarp.Npc)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Npc.config"></a>

#### Npc.config(file)
Load from config.

**Kind**: static method of [<code>Npc</code>](#yarp.Npc)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Pool"></a>

### yarp.Pool
**Kind**: static class of [<code>yarp</code>](#yarp)  

* [.Pool](#yarp.Pool)
    * [new Pool(Class)](#new_yarp.Pool_new)
    * [.load(object)](#yarp.Pool+load)
    * [.config(file)](#yarp.Pool+config)
    * [.categories()](#yarp.Pool+categories) => <code>Array.&lt;string&gt;</code>
    * [.length()](#yarp.Pool+length) => <code>number</code>
    * [.size()](#yarp.Pool+size) => <code>number</code>
    * [.exists(id)](#yarp.Pool+exists) => <code>boolean</code>
    * [.at(id)](#yarp.Pool+at) => <code>object</code>
    * [.toArray()](#yarp.Pool+toArray) => <code>Array.&lt;object&gt;</code>
    * [.forEach(call)](#yarp.Pool+forEach)
    * [.forEachInRange(position, range, call)](#yarp.Pool+forEachInRange)
    * [.forEachInDimension(dimension, call)](#yarp.Pool+forEachInDimension)

<a name="new_yarp.Pool_new"></a>

#### new Pool(Class)
Creates a Pool.


| Param | Type | Description |
| --- | --- | --- |
| Class | <code>class</code> | The class of the objects in the pool. |

<a name="yarp.Pool+load"></a>

#### pool.load(object)
Load all objects from the pool collection.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Pool+config"></a>

#### pool.config(file)
Load from config.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Pool+categories"></a>

#### pool.categories() => <code>Array.&lt;string&gt;</code>
Categories in the pool.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>Array.&lt;string&gt;</code> - Categories in the pool.  
<a name="yarp.Pool+length"></a>

#### pool.length() => <code>number</code>
Elments in the pool.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>number</code> - Number of elements.  
<a name="yarp.Pool+size"></a>

#### pool.size() => <code>number</code>
Elments in the pool.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>number</code> - Number of elements.  
<a name="yarp.Pool+exists"></a>

#### pool.exists(id) => <code>boolean</code>
Checks if id exists in the pool.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>boolean</code> - If objects exists or not in the pool.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Object id. |

<a name="yarp.Pool+at"></a>

#### pool.at(id) => <code>object</code>
Get object at id.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>object</code> - Object at id.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Object id. |

<a name="yarp.Pool+toArray"></a>

#### pool.toArray() => <code>Array.&lt;object&gt;</code>
Get the pool as array.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  
**Returns**: <code>Array.&lt;object&gt;</code> - All objects in the pool.  
<a name="yarp.Pool+forEach"></a>

#### pool.forEach(call)
Execute a function for each element asynchronously.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  

| Param | Type | Description |
| --- | --- | --- |
| call | <code>function</code> | Function to run for each element. |

<a name="yarp.Pool+forEachInRange"></a>

#### pool.forEachInRange(position, range, call)
Execute a function for each element in range of a certain position asynchronously.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Vector3</code> | Position. |
| range | <code>number</code> | Max range. |
| call | <code>function</code> | Function to run for each element. |

<a name="yarp.Pool+forEachInDimension"></a>

#### pool.forEachInDimension(dimension, call)
Execute a function for each element dimension asynchronously.

**Kind**: instance method of [<code>Pool</code>](#yarp.Pool)  

| Param | Type | Description |
| --- | --- | --- |
| dimension | <code>number</code> | Dimension. |
| call | <code>function</code> | Function to run for each element. |

<a name="yarp.Prop"></a>

### yarp.Prop - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Prop](#yarp.Prop) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Prop(id, model, position, [owner], [alpha], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])](#new_yarp.Prop_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Prop.load)
        * [.config(file)](#yarp.Prop.config)

<a name="new_yarp.Prop_new"></a>

#### new Prop(id, model, position, [owner], [alpha], [rotation], [dimension], [visible], [range], [enter], [leave], [permissions], [items])
Creates a Prop.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Prop id. |
| model | <code>string</code> |  | Prop model. |
| position | <code>Vector3</code> |  | Prop position. |
| [owner] | <code>string</code> | <code>null</code> | Prop owner. |
| [alpha] | <code>number</code> | <code>255</code> | Prop alpha. |
| [rotation] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Prop rotation. |
| [dimension] | <code>number</code> | <code>0</code> | Prop dimension. |
| [visible] | <code>boolean</code> | <code>true</code> | Prop visible. |
| [range] | <code>number</code> | <code>3</code> | Prop range. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Prop enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Prop leave function. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Prop permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Prop items. |

<a name="yarp.GMObject+save"></a>

#### prop.save()
Save the object.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.GMObject+remove"></a>

#### prop.remove()
Remove the object.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.GMObject+data"></a>

#### prop.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### prop.call()
Evals the call parameter.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.GMObject+enter"></a>

#### prop.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.GMObject+leave"></a>

#### prop.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### prop.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Prop</code>](#yarp.Prop)  
<a name="yarp.Prop.load"></a>

#### Prop.load(object)
Load from object.

**Kind**: static method of [<code>Prop</code>](#yarp.Prop)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Prop.config"></a>

#### Prop.config(file)
Load from config.

**Kind**: static method of [<code>Prop</code>](#yarp.Prop)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Transaction"></a>

### yarp.Transaction - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Transaction](#yarp.Transaction) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Transaction(type, value, source, [target], [date])](#new_yarp.Transaction_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Transaction.load)

<a name="new_yarp.Transaction_new"></a>

#### new Transaction(type, value, source, [target], [date])
Creates a Transaction.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | PrTransactionop type. |
| value | <code>number</code> |  | Transaction value. |
| source | <code>string</code> |  | Transaction source. |
| [target] | <code>string</code> | <code>&quot;source&quot;</code> | Transaction target. |
| [date] | <code>Date</code> | <code>new Date();</code> | Transaction date. |

<a name="yarp.GMObject+save"></a>

#### transaction.save()
Save the object.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.GMObject+remove"></a>

#### transaction.remove()
Remove the object.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.GMObject+data"></a>

#### transaction.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### transaction.call()
Evals the call parameter.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.GMObject+enter"></a>

#### transaction.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.GMObject+leave"></a>

#### transaction.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### transaction.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Transaction</code>](#yarp.Transaction)  
<a name="yarp.Transaction.load"></a>

#### Transaction.load(object)
Load from object.

**Kind**: static method of [<code>Transaction</code>](#yarp.Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.User"></a>

### yarp.User - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.User](#yarp.User) - [<code>GMObject</code>](#yarp.GMObject)
    * [new User(id, password, [lastLogin], [whitelisted], [banned], [groups], [enter], [leave])](#new_yarp.User_new)
    * _instance_
        * [.player()](#yarp.User+player) => <code>object</code>
        * [.characters()](#yarp.User+characters) => <code>object</code>
        * [.character()](#yarp.User+character) => <code>object</code>
        * [.enter()](#yarp.User+enter) => <code>function</code>
        * [.leave()](#yarp.User+leave) => <code>function</code>
        * [.updateLastLogin(ip)](#yarp.User+updateLastLogin)
        * [.verifyPassword(password)](#yarp.User+verifyPassword)
        * [.giveGroup(group)](#yarp.User+giveGroup) => <code>boolean</code>
        * [.takeGroup(group)](#yarp.User+takeGroup) => <code>boolean</code>
        * [.getGroupByType(type)](#yarp.User+getGroupByType) => <code>string</code>
        * [.getGroupByTypes(type)](#yarp.User+getGroupByTypes) => <code>Array.&lt;string&gt;</code>
        * [.hasGroup(id)](#yarp.User+hasGroup) => <code>boolean</code>
        * [.hasGroup(id)](#yarp.User+hasGroup) => <code>boolean</code>
        * [.hasPermission(permission)](#yarp.User+hasPermission) => <code>boolean</code>
        * [.hasPermission(permissions)](#yarp.User+hasPermission) => <code>boolean</code>
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.User.load)
        * [.config(file)](#yarp.User.config)

<a name="new_yarp.User_new"></a>

#### new User(id, password, [lastLogin], [whitelisted], [banned], [groups], [enter], [leave])
Creates a User.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | User social club. |
| password | <code>string</code> |  | User password. |
| [lastLogin] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | User last login. |
| [whitelisted] | <code>Float</code> | <code>false</code> | User whitelisted. |
| [banned] | <code>Float</code> | <code>false</code> | User banned. |
| [groups] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | User groups. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | User enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | User leave function. |

<a name="yarp.User+player"></a>

#### user.player() => <code>object</code>
Get user player.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>object</code> - Player.  
<a name="yarp.User+characters"></a>

#### user.characters() => <code>object</code>
Get user characters.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>object</code> - Characters indexed by name.  
<a name="yarp.User+character"></a>

#### user.character() => <code>object</code>
Get user active character.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>object</code> - Active character.  
<a name="yarp.User+enter"></a>

#### user.enter() => <code>function</code>
Call enter fuction for character and it's groups.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Overrides**: [<code>enter</code>](#yarp.GMObject+enter)  
**Returns**: <code>function</code> - Enter functions.  
**Emits**: <code>event:userJoinedGroup</code>  
<a name="yarp.User+leave"></a>

#### user.leave() => <code>function</code>
Call leave fuction for character and it's groups.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Overrides**: [<code>leave</code>](#yarp.GMObject+leave)  
**Returns**: <code>function</code> - Leave functions.  
**Emits**: <code>event:userLeftGroup</code>  
<a name="yarp.User+updateLastLogin"></a>

#### user.updateLastLogin(ip)
Update character last login.

**Kind**: instance method of [<code>User</code>](#yarp.User)  

| Param | Type | Description |
| --- | --- | --- |
| ip | <code>string</code> | Character ip. |

<a name="yarp.User+verifyPassword"></a>

#### user.verifyPassword(password)
Verify password.

**Kind**: instance method of [<code>User</code>](#yarp.User)  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | Password to comapare with hash. |

<a name="yarp.User+giveGroup"></a>

#### user.giveGroup(group) => <code>boolean</code>
Give a group.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - Operation success/fail.  
**Emits**: <code>event:userJoinedGroup</code>  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | Group id. |

<a name="yarp.User+takeGroup"></a>

#### user.takeGroup(group) => <code>boolean</code>
Take a group.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - Operation success/fail.  
**Emits**: <code>event:userLeftGroup</code>  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | Group id. |

<a name="yarp.User+getGroupByType"></a>

#### user.getGroupByType(type) => <code>string</code>
Get group by type.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>string</code> - Group id.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Group type. |

<a name="yarp.User+getGroupByTypes"></a>

#### user.getGroupByTypes(type) => <code>Array.&lt;string&gt;</code>
Get groups by types.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>Array.&lt;string&gt;</code> - Group ids.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Array.&lt;string&gt;</code> | Group types. |

<a name="yarp.User+hasGroup"></a>

#### user.hasGroup(id) => <code>boolean</code>
Check if has group.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - If has or not the group.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Group id. |

<a name="yarp.User+hasGroup"></a>

#### user.hasGroup(id) => <code>boolean</code>
Check if has all groups.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - If has or not all the groups.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Array.&lt;string&gt;</code> | Group ids. |

<a name="yarp.User+hasPermission"></a>

#### user.hasPermission(permission) => <code>boolean</code>
Check if has permission.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - If has or not the permission.  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | Permission. |

<a name="yarp.User+hasPermission"></a>

#### user.hasPermission(permissions) => <code>boolean</code>
Check if has all permissions.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>boolean</code> - If has or not all permissions.  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>Array.&lt;string&gt;</code> | Permissions. |

<a name="yarp.GMObject+save"></a>

#### user.save()
Save the object.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
<a name="yarp.GMObject+remove"></a>

#### user.remove()
Remove the object.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
<a name="yarp.GMObject+data"></a>

#### user.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>User</code>](#yarp.User)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### user.call()
Evals the call parameter.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### user.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>User</code>](#yarp.User)  
<a name="yarp.User.load"></a>

#### User.load(object)
Load from object.

**Kind**: static method of [<code>User</code>](#yarp.User)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.User.config"></a>

#### User.config(file)
Load from config.

**Kind**: static method of [<code>User</code>](#yarp.User)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Variable"></a>

### yarp.Variable - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Variable](#yarp.Variable) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Variable(id, value)](#new_yarp.Variable_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Variable.load)
        * [.config(file)](#yarp.Variable.config)

<a name="new_yarp.Variable_new"></a>

#### new Variable(id, value)
Creates a Variable.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Variable id. |
| value |  | Variable value. |

<a name="yarp.GMObject+save"></a>

#### variable.save()
Save the object.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.GMObject+remove"></a>

#### variable.remove()
Remove the object.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.GMObject+data"></a>

#### variable.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### variable.call()
Evals the call parameter.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.GMObject+enter"></a>

#### variable.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.GMObject+leave"></a>

#### variable.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### variable.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Variable</code>](#yarp.Variable)  
<a name="yarp.Variable.load"></a>

#### Variable.load(object)
Load from object.

**Kind**: static method of [<code>Variable</code>](#yarp.Variable)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Variable.config"></a>

#### Variable.config(file)
Load from config.

**Kind**: static method of [<code>Variable</code>](#yarp.Variable)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Vehicle"></a>

### yarp.Vehicle - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Vehicle](#yarp.Vehicle) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Vehicle(id, model, position, [heading], [owner], [plate], [color], [alpha], [locked], [engine], [dimension], [visible], [permissions], [items], [enter], [leave])](#new_yarp.Vehicle_new)
    * _instance_
        * [.position(value)](#yarp.Vehicle+position)
        * [.heading(value)](#yarp.Vehicle+heading)
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Vehicle.load)
        * [.config(file)](#yarp.Vehicle.config)

<a name="new_yarp.Vehicle_new"></a>

#### new Vehicle(id, model, position, [heading], [owner], [plate], [color], [alpha], [locked], [engine], [dimension], [visible], [permissions], [items], [enter], [leave])
Creates a Vehicle.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Vehicle id. |
| model | <code>string</code> |  | Vehicle model. |
| position | <code>Vector3</code> |  | Vehicle position. |
| [heading] | <code>number</code> | <code>0</code> | Vehicle heading. |
| [owner] | <code>string</code> | <code>null</code> | Vehicle owner. |
| [plate] | <code>string</code> | <code>&quot;yarp.utils.randomString(8,&#x27;ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&#x27;)&quot;</code> | Vehicle plate. |
| [color] | <code>Array.&lt;number&gt;</code> | <code>[0,0,0]</code> | Vehicle color. |
| [alpha] | <code>number</code> | <code>255</code> | Vehicle alpha. |
| [locked] | <code>boolean</code> | <code>false</code> | Vehicle locked. |
| [engine] | <code>boolean</code> | <code>false</code> | Vehicle engine. |
| [dimension] | <code>number</code> | <code>0</code> | Vehicle dimension. |
| [visible] | <code>boolean</code> | <code>true</code> | Vehicle visible. |
| [permissions] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Vehicle permissions. |
| [items] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Vehicle items. |
| [enter] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Vehicle enter function. |
| [leave] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Vehicle leave function. |

<a name="yarp.Vehicle+position"></a>

#### vehicle.position(value)
Set vehicle position.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vector3</code> | Position value. |

<a name="yarp.Vehicle+heading"></a>

#### vehicle.heading(value)
Set vehicle heading.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Heading value. |

<a name="yarp.GMObject+save"></a>

#### vehicle.save()
Save the object.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.GMObject+remove"></a>

#### vehicle.remove()
Remove the object.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.GMObject+data"></a>

#### vehicle.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### vehicle.call()
Evals the call parameter.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.GMObject+enter"></a>

#### vehicle.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.GMObject+leave"></a>

#### vehicle.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### vehicle.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Vehicle</code>](#yarp.Vehicle)  
<a name="yarp.Vehicle.load"></a>

#### Vehicle.load(object)
Load from object.

**Kind**: static method of [<code>Vehicle</code>](#yarp.Vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Vehicle.config"></a>

#### Vehicle.config(file)
Load from config.

**Kind**: static method of [<code>Vehicle</code>](#yarp.Vehicle)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.Weapon"></a>

### yarp.Weapon - [<code>GMObject</code>](#yarp.GMObject)
**Kind**: static class of [<code>yarp</code>](#yarp)  
**Extends**: [<code>GMObject</code>](#yarp.GMObject)  

* [.Weapon](#yarp.Weapon) - [<code>GMObject</code>](#yarp.GMObject)
    * [new Weapon(id, name, [category], [weight], [ammo], [model], [bone], [position], [rotation], [visible])](#new_yarp.Weapon_new)
    * _instance_
        * [.save()](#yarp.GMObject+save)
        * [.remove()](#yarp.GMObject+remove)
        * [.data()](#yarp.GMObject+data) => <code>object</code>
        * [.call()](#yarp.GMObject+call)
        * [.enter()](#yarp.GMObject+enter)
        * [.leave()](#yarp.GMObject+leave)
        * [.makeGetterSetter()](#yarp.GMObject+makeGetterSetter)
    * _static_
        * [.load(object)](#yarp.Weapon.load)
        * [.config(file)](#yarp.Weapon.config)

<a name="new_yarp.Weapon_new"></a>

#### new Weapon(id, name, [category], [weight], [ammo], [model], [bone], [position], [rotation], [visible])
Creates a Weapon.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Weapon id. |
| name | <code>string</code> |  | Weapon name. |
| [category] | <code>string</code> | <code>&quot;&#x27;None&#x27;&quot;</code> | Weapon category. |
| [weight] | <code>string</code> | <code>&quot;5.0&quot;</code> | Weapon weight. |
| [ammo] | <code>string</code> | <code>100</code> | Weapon ammo. |
| [model] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Weapon model. |
| [bone] | <code>number</code> | <code>0</code> | Weapon bone. |
| [position] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Weapon position. |
| [rotation] | <code>Vector3</code> | <code>new mp.Vector3(0,0,0)</code> | Weapon rotation. |
| [visible] | <code>boolean</code> | <code>true</code> | Weapon visible. |

<a name="yarp.GMObject+save"></a>

#### weapon.save()
Save the object.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.GMObject+remove"></a>

#### weapon.remove()
Remove the object.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.GMObject+data"></a>

#### weapon.data() => <code>object</code>
Get only persisten data

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
**Returns**: <code>object</code> - Persistent data object.  
<a name="yarp.GMObject+call"></a>

#### weapon.call()
Evals the call parameter.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.GMObject+enter"></a>

#### weapon.enter()
Evals the enter parameter.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.GMObject+leave"></a>

#### weapon.leave()
Evals the leave parameter.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.GMObject+makeGetterSetter"></a>

#### weapon.makeGetterSetter()
Make getter and setter for persistent variables.

**Kind**: instance method of [<code>Weapon</code>](#yarp.Weapon)  
<a name="yarp.Weapon.load"></a>

#### Weapon.load(object)
Load from object.

**Kind**: static method of [<code>Weapon</code>](#yarp.Weapon)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Class object. |

<a name="yarp.Weapon.config"></a>

#### Weapon.config(file)
Load from config.

**Kind**: static method of [<code>Weapon</code>](#yarp.Weapon)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Config file path. |

<a name="yarp.blips"></a>

### yarp.blips : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Blip&gt;</code>](#yarp.Blip)  
<a name="yarp.characters"></a>

### yarp.characters : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Character&gt;</code>](#yarp.Character)  
<a name="yarp.checkpoints"></a>

### yarp.checkpoints : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Checkpoint&gt;</code>](#yarp.Checkpoint)  
<a name="yarp.colshapes"></a>

### yarp.colshapes : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Colshape&gt;</code>](#yarp.Colshape)  
<a name="yarp.commands"></a>

### yarp.commands : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Command&gt;</code>](#yarp.Command)  
<a name="yarp.doors"></a>

### yarp.doors : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Door&gt;</code>](#yarp.Door)  
<a name="yarp.events"></a>

### yarp.events : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Event&gt;</code>](#yarp.Event)  
<a name="yarp.groups"></a>

### yarp.groups : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Group&gt;</code>](#yarp.Group)  
<a name="yarp.hotkeys"></a>

### yarp.hotkeys : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Hotkey&gt;</code>](#yarp.Hotkey)  
<a name="yarp.items"></a>

### yarp.items : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Item&gt;</code>](#yarp.Item)  
<a name="yarp.labels"></a>

### yarp.labels : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Label&gt;</code>](#yarp.Label)  
<a name="yarp.locations"></a>

### yarp.locations : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Location&gt;</code>](#yarp.Location)  
<a name="yarp.markers"></a>

### yarp.markers : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Marker&gt;</code>](#yarp.Marker)  
<a name="yarp.npcs"></a>

### yarp.npcs : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Npc&gt;</code>](#yarp.Npc)  
<a name="yarp.props"></a>

### yarp.props : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Prop&gt;</code>](#yarp.Prop)  
<a name="yarp.transactions"></a>

### yarp.transactions : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Transaction&gt;</code>](#yarp.Transaction)  
<a name="yarp.users"></a>

### yarp.users : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;User&gt;</code>](#yarp.User)  
<a name="yarp.variables"></a>

### yarp.variables : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Variable&gt;</code>](#yarp.Variable)  
<a name="yarp.vehicles"></a>

### yarp.vehicles : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Vehicle&gt;</code>](#yarp.Vehicle)  
<a name="yarp.weapons"></a>

### yarp.weapons : <code>object</code>
**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**Extends**: [<code>yarp.Pool&lt;Weapon&gt;</code>](#yarp.Weapon)  
<a name="yarp.mng"></a>

### yarp.mng : <code>object</code>
Provides safe asynchronous interaction between MongoDB and YARP.

**Kind**: static namespace of [<code>yarp</code>](#yarp)  

* [.mng](#yarp.mng) : <code>object</code>
    * [.register(object)](#yarp.mng.register)
    * [.save(object)](#yarp.mng.save)
    * [.remove(object)](#yarp.mng.remove)
    * [.load(Class)](#yarp.mng.load)

<a name="yarp.mng.register"></a>

#### mng.register(object)
Register an object to the temporary collection in memory.

**Kind**: static method of [<code>mng</code>](#yarp.mng)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object to be registered. |

<a name="yarp.mng.save"></a>

#### mng.save(object)
Save an object to MongoDB.

**Kind**: static method of [<code>mng</code>](#yarp.mng)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object to be saved. |

<a name="yarp.mng.remove"></a>

#### mng.remove(object)
Remove an object from MongoDB.

**Kind**: static method of [<code>mng</code>](#yarp.mng)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object to be removed. |

<a name="yarp.mng.load"></a>

#### mng.load(Class)
Load classes into their respective temporary collections from MongoDB.

**Kind**: static method of [<code>mng</code>](#yarp.mng)  

| Param | Type | Description |
| --- | --- | --- |
| Class | <code>object</code> | Class to be loaded. |

<a name="yarp.db"></a>

### yarp.db : <code>object</code>
MongoDB promise library.

**Kind**: static namespace of [<code>yarp</code>](#yarp)  
**See**: https://mongodb.github.io/node-mongodb-native/api-generated/collection.html  

* [.db](#yarp.db) : <code>object</code>
    * [.connect([url])](#yarp.db.connect) => <code>Promise.&lt;object&gt;</code>
    * [.insert(collection, docs, [options])](#yarp.db.insert) => <code>Promise.&lt;object&gt;</code>
    * [.remove(collection, selector, [options])](#yarp.db.remove) => <code>Promise.&lt;object&gt;</code>
    * [.save(collection, doc, [options])](#yarp.db.save) => <code>Promise.&lt;object&gt;</code>
    * [.update(collection, selector, doc, [options])](#yarp.db.update) => <code>Promise.&lt;object&gt;</code>
    * [.destinct(collection, key, [query], [options])](#yarp.db.destinct) => <code>Promise.&lt;object&gt;</code>
    * [.count(collection, [query], [options])](#yarp.db.count) => <code>Promise.&lt;object&gt;</code>
    * [.find(collection, query, [options])](#yarp.db.find) => <code>Promise.&lt;Array&gt;</code>
    * [.indexes(collection)](#yarp.db.indexes) => <code>Promise.&lt;object&gt;</code>
    * [.aggregate(collection, query, [options])](#yarp.db.aggregate) => <code>Promise.&lt;object&gt;</code>
    * [.stats([options])](#yarp.db.stats) => <code>Promise.&lt;object&gt;</code>
    * [.close()](#yarp.db.close)

<a name="yarp.db.connect"></a>

#### db.connect([url]) => <code>Promise.&lt;object&gt;</code>
Connects to MongoDB.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the MongoDB object if resolved.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;mongodb://localhost:27017/yarp&#x27;&quot;</code> | Connection URL. |

<a name="yarp.db.insert"></a>

#### db.insert(collection, docs, [options]) => <code>Promise.&lt;object&gt;</code>
Inserts a single document or a an array of documents into MongoDB.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the documents. |
| docs | <code>Array</code> | Array of objects. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.remove"></a>

#### db.remove(collection, selector, [options]) => <code>Promise.&lt;object&gt;</code>
Removes documents specified by selector from MongoDB.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| selector | <code>object</code> | Filter the document by parameter. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.save"></a>

#### db.save(collection, doc, [options]) => <code>Promise.&lt;object&gt;</code>
Save a document. Simple full document replacement function.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| doc | <code>object</code> | The object to save. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.update"></a>

#### db.update(collection, selector, doc, [options]) => <code>Promise.&lt;object&gt;</code>
Updates documents.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| selector | <code>object</code> | Filter documents by parameter. |
| doc | <code>object</code> | The fields/values to be updated. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.destinct"></a>

#### db.destinct(collection, key, [query], [options]) => <code>Promise.&lt;object&gt;</code>
The distinct command returns returns a list of distinct values for the given key across a collection.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| key | <code>string</code> | Key to run distinct against. |
| [query] | <code>object</code> | Filter results. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.count"></a>

#### db.count(collection, [query], [options]) => <code>Promise.&lt;object&gt;</code>
Count number of matching documents in MongoDB to a query.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| [query] | <code>object</code> | Filter results. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.find"></a>

#### db.find(collection, query, [options]) => <code>Promise.&lt;Array&gt;</code>
Creates a cursor for a query that can be used to iterate over results from MongoDB.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| query | <code>object</code> | Query to locate the document. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.indexes"></a>

#### db.indexes(collection) => <code>Promise.&lt;object&gt;</code>
Retrieve all the indexes on the collection.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |

<a name="yarp.db.aggregate"></a>

#### db.aggregate(collection, query, [options]) => <code>Promise.&lt;object&gt;</code>
Execute an aggregation framework pipeline against the collection.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | The collection of the document. |
| query | <code>Array</code> | Contain all the aggregation framework commands for the execution. |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.stats"></a>

#### db.stats([options]) => <code>Promise.&lt;object&gt;</code>
Get all the collection statistics.

**Kind**: static method of [<code>db</code>](#yarp.db)  
**Returns**: <code>Promise.&lt;object&gt;</code> - A promise that returns the result from MongoDB if resolved.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | MongoDB options. |

<a name="yarp.db.close"></a>

#### db.close()
Closes the connection.

**Kind**: static method of [<code>db</code>](#yarp.db)  
<a name="yarp.utils"></a>

### yarp.utils : <code>object</code>
Holds utility functions.

**Kind**: static namespace of [<code>yarp</code>](#yarp)  

* [.utils](#yarp.utils) : <code>object</code>
    * [.getTimestamp(date)](#yarp.utils.getTimestamp) => <code>string</code>
    * [.round(value, decimals)](#yarp.utils.round) => <code>number</code>
    * [.Vector3Offset(vector, offset)](#yarp.utils.Vector3Offset) => <code>Vector3</code>
    * [.Vector3Distance(vector1, vector2)](#yarp.utils.Vector3Distance) => <code>number</code>
    * [.randomString(digits, possible)](#yarp.utils.randomString) => <code>string</code>
    * [.getSubstrings(string)](#yarp.utils.getSubstrings) => <code>Array</code>
    * [.getParamNames(func)](#yarp.utils.getParamNames) => <code>Array</code>
    * [.paramsToString(obj)](#yarp.utils.paramsToString) => <code>string</code>
    * [.getTimezoneDate(timezone)](#yarp.utils.getTimezoneDate) => <code>Date</code>

<a name="yarp.utils.getTimestamp"></a>

#### utils.getTimestamp(date) => <code>string</code>
Format dates to dd/mm/yy h:m:s.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>string</code> - The formatted date.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | new Date(). |

<a name="yarp.utils.round"></a>

#### utils.round(value, decimals) => <code>number</code>
Round numbers by the amount of decimals.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>number</code> - The rounded number.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Value to be rounded. |
| decimals | <code>number</code> | How many decimals. |

<a name="yarp.utils.Vector3Offset"></a>

#### utils.Vector3Offset(vector, offset) => <code>Vector3</code>
Offset a Vector3.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>Vector3</code> - Offset Vector3.  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Vector3</code> | Vector3 to be offset. |
| offset | <code>Vector3</code> | Vector3 offset amount. |

<a name="yarp.utils.Vector3Distance"></a>

#### utils.Vector3Distance(vector1, vector2) => <code>number</code>
Get the distance between two Vector3.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>number</code> - Distance between them.  

| Param | Type | Description |
| --- | --- | --- |
| vector1 | <code>Vector3</code> | First Vector3. |
| vector2 | <code>Vector3</code> | Second Vector3. |

<a name="yarp.utils.randomString"></a>

#### utils.randomString(digits, possible) => <code>string</code>
Generate a random string.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>string</code> - Randomly generated string.  

| Param | Type | Description |
| --- | --- | --- |
| digits | <code>number</code> | Amaount of symbols on the string. |
| possible | <code>string</code> | String with possible symbols. |

<a name="yarp.utils.getSubstrings"></a>

#### utils.getSubstrings(string) => <code>Array</code>
Get substrings from string.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>Array</code> - Array of substrings.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String to analyze. |

<a name="yarp.utils.getParamNames"></a>

#### utils.getParamNames(func) => <code>Array</code>
Offsets a Vector3.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>Array</code> - Array of parameter names.  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to be analyzed. |

<a name="yarp.utils.paramsToString"></a>

#### utils.paramsToString(obj) => <code>string</code>
Offsets a Vector3.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>string</code> - Object representation in string.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The object to be analyzed. |

<a name="yarp.utils.getTimezoneDate"></a>

#### utils.getTimezoneDate(timezone) => <code>Date</code>
Returns the time in a set timezone.

**Kind**: static method of [<code>utils</code>](#yarp.utils)  
**Returns**: <code>Date</code> - Timezone date.  

| Param | Type | Description |
| --- | --- | --- |
| timezone | <code>number</code> | The timezone difference to GMT. |

<a name="loaders"></a>

## loaders : <code>object</code>
Loads the classes on server-side.

**Kind**: global namespace  
<a name="loaders"></a>

## loaders : <code>object</code>
Loads the configs on server-side.

**Kind**: global namespace  
<a name="loaders"></a>

## loaders : <code>object</code>
Loads the data on server-side.

**Kind**: global namespace  
<a name="loaders"></a>

## loaders : <code>object</code>
Loads the events on server-side.

**Kind**: global namespace  
<a name="loaders"></a>

## loaders : <code>object</code>
Loads the pools on server-side.

**Kind**: global namespace  
<a name="loaders"></a>

## loaders : <code>object</code>
Loads the requirements on server-side.

**Kind**: global namespace  
