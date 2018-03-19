'use strict';
/**
 * @file Weapon config
 */
module.exports = {
  "Assault": {
    "WEAPON_ADVANCEDRIFLE": {
      name: "Advanced Rifle",
      price: 8500,
      ammo: 85,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_advancedrifle"
    },
    "WEAPON_ASSAULTRIFLE": {
      name: "Assault Rifle",
      price: 6500,
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_assaultrifle"
    },
    "WEAPON_BULLPUPRIFLE": {
      name: "Bullpup Rifle",
      price: 6200,
      ammo: 62,
     	bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_bullpuprifle"
    },
    "WEAPON_CARBINERIFLE": {
      name: "Carbine Rifle",
      price: 7000,
      ammo: 70,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_carbinerifle"
    },
  	"WEAPON_COMPACTRIFLE": {
      name: "Compact Rifle",
      price: 6000,
      ammo: 60,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
    "WEAPON_SPECIALCARBINE": {
      name: "Special Carbine",
      price: 7500,
      ammo: 75,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_specialcarbine"
    },
  },
  "Thrown": {
    "WEAPON_BZGAS": {
      name: "BZ Gas",
      price: 300,
      ammo: 30,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ex_grenadesmoke"
    },
    "WEAPON_BALL": {
      name: "Ball",
      price: 50,
      ammo: 5,
    	bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_am_baseball"
    },
    "WEAPON_FIREEXTINGUISHER": {
      name: "Fire Extinguisher",
      price: 100,
      ammo: 10,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_am_fire_exting"
    },
  	"WEAPON_SNOWBALL": {
      name: "Snow Ball",
      price: 2,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ex_snowball"
    },
  	"WEAPON_STICKYBOMB": {
      name: "Sticky Bomb",
      price: 500,
      ammo: 50,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_bomb_01_s"
    },
  	"WEAPON_SMOKEGRENADE": {
      name: "Smoke Grenade",
      price: 250,
      ammo: 25,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ex_grenadesmoke"
    },
  	"WEAPON_PROXMINE": {
      name: "Prox Mine",
      price: 500,
      ammo: 50,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_PETROLCAN": {
      name: "Petrol Can",
      price: 50,
      ammo: 5,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_am_jerrycan"
    },
  	"WEAPON_MOLOTOV": {
      name: "Molotov",
      price: 150,
      ammo: 15,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ex_molotov"
    },
  	"WEAPON_GRENADE": {
      name: "Grenade",
      price: 300,
      ammo: 30,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ex_grenadefrag"
    },
  },
  "Handguns": {
    "WEAPON_APPISTOL": {
      name: "AP Pistol",
      price: 6000,
      ammo: 60,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0), category : "handguns",
      model: "w_pi_appistol"
    },
  	"WEAPON_VINTAGEPISTOL": {
      name: "Vintage Pistol",
      price: 1500,
      ammo: 15,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: "w_pi_vintage_pistol"
    },
  	"WEAPON_HEAVYPISTOL": {
      name: "Heavy Pistol",
      price: 5200,
      ammo: 52,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: "w_pi_heavypistol"
    },
    "WEAPON_SNSPISTOL": {
      name: "SNS Pistol",
      price: 4700,
      ammo: 47,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: "w_pi_sns_pistol"
    },
    "WEAPON_STUNGUN": {
      name: "Stungun",
      price: 1400,
      ammo: 14,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: "w_pi_stungun"
    },
    "WEAPON_REVOLVER": {
      name: "Revolver",
      price: 3000,
      ammo: 30,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: ""
    },
    "WEAPON_PISTOL50": {
      name: ".50 Pistol",
      price: 6000,
      ammo: 60,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: "w_pi_pistol50"
    },
    "WEAPON_PISTOL": {
      name: "Pistol",
      price: 5500,
      ammo: 55,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: "w_pi_pistol"
    },
    "WEAPON_MARKSMANPISTOL": {
      name: "Marksman Pistol",
      price: 7000,
      ammo: 70,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: ""
    },
    "WEAPON_FLAREGUN": {
      name: "Flare Gun",
      price: 800,
      ammo: 80,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: "w_pi_flaregun"
    },
    "WEAPON_COMBATPISTOL": {
      name: "Combat Pistol",
      price: 5800,
      ammo: 58,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: "w_pi_combatpistol"
    },
  },
  "Shotguns": {
    "WEAPON_ASSAULTSHOTGUN": {
      name: "Assault Shotgun",
      price: 8200,
      ammo: 82,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sg_assaultshotgun"
    },
  	"WEAPON_MUSKET": {
      name: "Musket",
      price: 7200,
      ammo: 72,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_musket"
    },
  	"WEAPON_DBSHOTGUN": {
      name: "Double Barrel Shotgun",
      price: 6800,
      ammo: 68,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
    "WEAPON_PUMPSHOTGUN": {
      name: "Pump Shotgun",
      price: 7800,
      ammo: 78,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: "w_sg_pumpshotgun"
    },
    "WEAPON_SAWNOFFSHOTGUN": {
      name: "Sawn-off Shotgun",
      price: 6500,
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
    "WEAPON_HEAVYSHOTGUN": {
      name: "Heavy Shotgun",
      price: 8500,
      ammo: 85,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 225.0, 0.0),
      model: "w_sg_heavyshotgun"
    },
    "WEAPON_BULLPUPSHOTGUN": {
      name: "Bullpup Shotgun",
      price: 6300,
      ammo: 63,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: "w_sg_bullpupshotgun"
    },
    "WEAPON_AUTOSHOTGUN": {
      name: "Auto Shotgun",
      price: 9800,
      ammo: 98,
      bone: 24818,
      position: new mp.Vector3(0.1, 0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  },
  "Machine": {
    "WEAPON_ASSAULTSMG": {
      name: "Assault SMG",
      price: 8400,
      ammo: 84,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sb_assaultsmg"
    },
  	"WEAPON_MINISMG": {
      name: "Mini SMG",
      price: 6400,
      ammo: 64,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_GUSENBERG": {
      name: "Gusenberg",
      price: 11200,
      ammo: 112,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sb_gusenberg"
    },
    "WEAPON_SMG": {
      name: "SMG",
      price: 7200,
      ammo: 72,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sb_smg"
    },
    "WEAPON_MG": {
      name: "MG",
      price: 9700,
      ammo: 97,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_mg_mg"
    },
    "WEAPON_MICROSMG": {
      name: "Micro SMG",
      price: 6500,
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sb_microsmg"
    },
    "WEAPON_MACHINEPISTOL": {
      name: "Machine Pistol",
      price: 6000,
      ammo: 60,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
    "WEAPON_COMBATMG": {
      name: "Combat  MG",
      price: 7900,
      ammo: 79,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_mg_combatmg"
    },
    "WEAPON_COMBATPDW": {
      name: "Combat PDW",
      price: 8100,
      ammo: 81,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  },
  "Melee": {
    "WEAPON_BAT": {
      name: "Bat",
      price: 110,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0, 0.0, 0.0),
      rotation: new mp.Vector3(320.0, 320.0, 320.0),
      model: "w_me_bat"
    },
    "WEAPON_FLASHLIGHT": {
      name: "Flashlight",
      price: 20,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0, 0.0, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_dagger"
    },
    "WEAPON_GOLFCLUB": {
      name: "Golfclub",
      price: 120,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_me_gclub"
    },
    "WEAPON_HAMMER": {
      name: "Hammer",
      price: 70,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_tool_hammer"
    },
    "WEAPON_HATCHET": {
      name: "Hatchet",
      price: 70,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_me_hatchet"
    },
    "WEAPON_BOTTLE":	{
      name: "Broken Bottle",
      price: 40,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_bottle"
    },
    "WEAPON_CROWBAR": {
      name: "Crowbar",
      price: 60,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_me_crowbar"
    },
    "WEAPON_KNIFE": {
      name: "Knife",
      price: 50,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_knife_01"
    },
    "WEAPON_KNUCKLE": {
      name: "Knuckle",
      price: 30,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_dagger"
    },
    "WEAPON_MACHETE": {
      name: "Machete",
      price: 75,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_ld_w_me_machette"
    },
    "WEAPON_SWITCHBLADE": {
      name: "Switchblade",
      price: 70,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_dagger"
    },
    "WEAPON_NIGHTSTICK": {
      name: "Nightstick",
      price: 80,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_me_nightstick"
    },
  },
  "Others": {
  	"WEAPON_WRENCH": {
      name: "Wrench",
      price: 80,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_me_hammer"
    },
  	"WEAPON_PIPEBOMB": {
      name: "Pipe Bomb",
      price: 400,
      ammo: 40,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_POOLCUE": {
      name: "Pool Cue",
      price: 25,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_pool_cue"
    },
  	"WEAPON_HANDCUFFS": {
      name: "Handcuffs",
      price: 100,
      ammo: 100,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_GARBAGEBAG": {
      name: "Garbage Bag",
      price: 10,
      ammo: 10,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_DIGISCANNER": {
      name: "Digi Scanner",
      price: 10000,
      ammo: 100,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_am_digiscanner"
    },
    "WEAPON_BATTLEAXE": {
      name: "Battle Axe",
      price: 140,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_tool_fireaxe"
    },
    "WEAPON_DAGGER": {
      name: "Dagger",
      price: 220,
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "prop_w_me_dagger"
    },
  	"WEAPON_REMOTESNIPER": {
      name: "Remote Sniper",
      price: 20000,
      ammo: 200,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_STINGER": {
      name: "Stinger",
      price: 20000,
      ammo: 200,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  },
  "Sniper": {
    "WEAPON_HEAVYSNIPER": {
      name: "Heavy Sniper",
      price: 14200,
      ammo: 142,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: "w_sr_heavysniper"
    },
    "WEAPON_MARKSMANRIFLE": {
      name: "Marksman Rifle",
      price: 12800,
      ammo: 128,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: "w_sr_marksmanrifle"
    },
    "WEAPON_SNIPERRIFLE": {
      name: "Sniper Rifle",
      price: 11000,
      ammo: 110,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_sr_sniperrifle"
    },
  },
  "Heavy": {
  	"WEAPON_RPG": {
      name: "RPG",
      price: 24300,
      ammo: 243,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_lr_rpg"
    },
    "WEAPON_COMPACTLAUNCHER": {
      name: "Compact Launcher",
      price: 28000,
      ammo: 280,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ""
    },
  	"WEAPON_FIREWORK": {
      name: "Firework",
      price: 18000,
      ammo: 180,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_lr_firework"
    },
  	"WEAPON_GRENADELAUNCHER": {
      name: "Grenade Launcher",
      price: 14700,
      ammo: 147,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_lr_grenadelauncher"
    },
  	"WEAPON_HOMINGLAUNCHER": {
      name: "Homing Launcher",
      price: 34000,
      ammo: 340,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_lr_homing"
    },
  	"WEAPON_MINIGUN": {
      name: "Minigun",
      price: 50000,
      ammo: 500,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_mg_minigun"
    },
  	"WEAPON_RAILGUN": {
      name: "Rail Gun",
      price: 100000,
      ammo: 1000,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: "w_ar_railgun"
    },
  }
}
