'use strict';

let config = {
  'Assault': {
    'WEAPON_ADVANCEDRIFLE': {
      name: 'Advanced Rifle',
      ammo: 85,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_advancedrifle'
    },
    'WEAPON_ASSAULTRIFLE': {
      name: 'Assault Rifle',
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_assaultrifle'
    },
    'WEAPON_BULLPUPRIFLE': {
      name: 'Bullpup Rifle',
      ammo: 62,
     	bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_bullpuprifle'
    },
    'WEAPON_CARBINERIFLE': {
      name: 'Carbine Rifle',
      ammo: 70,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_carbinerifle'
    },
  	'WEAPON_COMPACTRIFLE': {
      name: 'Compact Rifle',
      ammo: 60,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_compactrifle'
    },
    'WEAPON_SPECIALCARBINE': {
      name: 'Special Carbine',
      ammo: 75,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_specialcarbine'
    },
  },
  'Thrown': {
    'WEAPON_BZGAS': {
      name: 'BZ Gas',
      ammo: 30,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_grenadesmoke'
    },
    'WEAPON_BALL': {
      name: 'Ball',
      ammo: 5,
    	bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_am_baseball'
    },
    'WEAPON_FIREEXTINGUISHER': {
      name: 'Fire Extinguisher',
      ammo: 10,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_am_fire_exting'
    },
  	'WEAPON_SNOWBALL': {
      name: 'Snow Ball',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_snowball'
    },
  	'WEAPON_STICKYBOMB': {
      name: 'Sticky Bomb',
      ammo: 50,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_bomb_01_s'
    },
  	'WEAPON_SMOKEGRENADE': {
      name: 'Smoke Grenade',
      ammo: 25,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_grenadesmoke'
    },
  	'WEAPON_PROXMINE': {
      name: 'Prox Mine',
      ammo: 50,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_apmine'
    },
  	'WEAPON_PETROLCAN': {
      name: 'Petrol Can',
      ammo: 5,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_am_jerrycan'
    },
  	'WEAPON_MOLOTOV': {
      name: 'Molotov',
      ammo: 15,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_molotov'
    },
  	'WEAPON_GRENADE': {
      name: 'Grenade',
      ammo: 30,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ex_grenadefrag'
    },
  },
  'Handguns': {
    'WEAPON_APPISTOL': {
      name: 'AP Pistol',
      ammo: 60,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0), category : 'handguns',
      model: 'w_pi_appistol'
    },
  	'WEAPON_VINTAGEPISTOL': {
      name: 'Vintage Pistol',
      ammo: 15,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: 'w_pi_vintage_pistol'
    },
  	'WEAPON_HEAVYPISTOL': {
      name: 'Heavy Pistol',
      ammo: 52,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: 'w_pi_heavypistol'
    },
    'WEAPON_SNSPISTOL': {
      name: 'SNS Pistol',
      ammo: 47,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: 'w_pi_sns_pistol'
    },
    'WEAPON_STUNGUN': {
      name: 'Stungun',
      ammo: 14,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: 'w_pi_stungun'
    },
    'WEAPON_REVOLVER': {
      name: 'Revolver',
      ammo: 30,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: 'w_pi_revolver'
    },
    'WEAPON_PISTOL50': {
      name: '.50 Pistol',
      ammo: 60,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: 'w_pi_pistol50'
    },
    'WEAPON_PISTOL': {
      name: 'Pistol',
      ammo: 55,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: 'w_pi_pistol'
    },
    'WEAPON_MARKSMANPISTOL': {
      name: 'Marksman Pistol',
      ammo: 70,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: 'w_pi_marksmanpistol'
    },
    'WEAPON_FLAREGUN': {
      name: 'Flare Gun',
      ammo: 80,
      bone: 58271,
      position: new mp.Vector3(-0.01, 0.1,  -0.07),
      rotation: new mp.Vector3(-55.0,  0.10, 0.0),
      model: 'w_pi_flaregun'
    },
    'WEAPON_COMBATPISTOL': {
      name: 'Combat Pistol',
      ammo: 58,
      bone: 51826,
      position: new mp.Vector3(-0.01, 0.10, 0.07),
      rotation: new mp.Vector3(-115.0, 0.0, 0.0),
      model: 'w_pi_combatpistol'
    },
  },
  'Shotguns': {
    'WEAPON_ASSAULTSHOTGUN': {
      name: 'Assault Shotgun',
      ammo: 82,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sg_assaultshotgun'
    },
  	'WEAPON_MUSKET': {
      name: 'Musket',
      ammo: 72,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_musket'
    },
  	'WEAPON_DBSHOTGUN': {
      name: 'Double Barrel Shotgun',
      ammo: 68,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sg_dbshotgun'
    },
    'WEAPON_PUMPSHOTGUN': {
      name: 'Pump Shotgun',
      ammo: 78,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: 'w_sg_pumpshotgun'
    },
    'WEAPON_SAWNOFFSHOTGUN': {
      name: 'Sawn-off Shotgun',
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sg_sawnoff'
    },
    'WEAPON_HEAVYSHOTGUN': {
      name: 'Heavy Shotgun',
      ammo: 85,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 225.0, 0.0),
      model: 'w_sg_heavyshotgun'
    },
    'WEAPON_BULLPUPSHOTGUN': {
      name: 'Bullpup Shotgun',
      ammo: 63,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: 'w_sg_bullpupshotgun'
    },
    'WEAPON_AUTOSHOTGUN': {
      name: 'Auto Shotgun',
      ammo: 98,
      bone: 24818,
      position: new mp.Vector3(0.1, 0.15, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sg_autoshotgun'
    },
  },
  'Machine': {
    'WEAPON_ASSAULTSMG': {
      name: 'Assault SMG',
      ammo: 84,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_assaultsmg'
    },
  	'WEAPON_MINISMG': {
      name: 'Mini SMG',
      ammo: 64,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_minismg'
    },
  	'WEAPON_GUSENBERG': {
      name: 'Gusenberg',
      ammo: 112,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_gusenberg'
    },
    'WEAPON_SMG': {
      name: 'SMG',
      ammo: 72,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_smg'
    },
    'WEAPON_MG': {
      name: 'MG',
      ammo: 97,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_mg_mg'
    },
    'WEAPON_MICROSMG': {
      name: 'Micro SMG',
      ammo: 65,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_microsmg'
    },
    'WEAPON_MACHINEPISTOL': {
      name: 'Machine Pistol',
      ammo: 60,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sb_machinepistol'
    },
    'WEAPON_COMBATMG': {
      name: 'Combat  MG',
      ammo: 79,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_mg_combatmg'
    },
    'WEAPON_COMBATPDW': {
      name: 'Combat PDW',
      ammo: 81,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_mg_combatpdw'
    },
  },
  'Melee': {
    'WEAPON_BAT': {
      name: 'Bat',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0, 0.0, 0.0),
      rotation: new mp.Vector3(320.0, 320.0, 320.0),
      model: 'w_me_bat'
    },
    'WEAPON_FLASHLIGHT': {
      name: 'Flashlight',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0, 0.0, 0.0),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_tool_torch'
    },
    'WEAPON_GOLFCLUB': {
      name: 'Golfclub',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_me_gclub'
    },
    'WEAPON_HAMMER': {
      name: 'Hammer',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_tool_hammer'
    },
    'WEAPON_HATCHET': {
      name: 'Hatchet',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_me_hatchet'
    },
    'WEAPON_BOTTLE':	{
      name: 'Broken Bottle',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_w_me_bottle'
    },
    'WEAPON_CROWBAR': {
      name: 'Crowbar',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_me_crowbar'
    },
    'WEAPON_KNIFE': {
      name: 'Knife',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_w_me_knife_01'
    },
    'WEAPON_KNUCKLE': {
      name: 'Knuckle',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_me_knuckle'
    },
    'WEAPON_MACHETE': {
      name: 'Machete',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_ld_w_me_machette'
    },
    'WEAPON_SWITCHBLADE': {
      name: 'Switchblade',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_w_me_switchblade'
    },
    'WEAPON_NIGHTSTICK': {
      name: 'Nightstick',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_me_nightstick'
    },
  },
  'Other': {
  	'WEAPON_WRENCH': {
      name: 'Wrench',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_cs_wrench'
    },
  	'WEAPON_PIPEBOMB': {
      name: 'Pipe Bomb',
      ammo: 40,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_bomb_01'
    },
  	'WEAPON_POOLCUE': {
      name: 'Pool Cue',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_pool_cue'
    },
  	'WEAPON_HANDCUFFS': {
      name: 'Handcuffs',
      ammo: 100,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_cs_cuffs_01'
    },
  	'WEAPON_GARBAGEBAG': {
      name: 'Garbage Bag',
      ammo: 10,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_ld_rub_binbag_01'
    },
  	'WEAPON_DIGISCANNER': {
      name: 'Digi Scanner',
      ammo: 100,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_am_digiscanner'
    },
    'WEAPON_BATTLEAXE': {
      name: 'Battle Axe',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_tool_fireaxe'
    },
    'WEAPON_DAGGER': {
      name: 'Dagger',
      ammo: 0,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'prop_w_me_dagger'
    },
  	'WEAPON_REMOTESNIPER': {
      name: 'Remote Sniper',
      ammo: 200,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ''
    },
  	'WEAPON_STINGER': {
      name: 'Stinger',
      ammo: 200,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ''
    },
  },
  'Sniper': {
    'WEAPON_HEAVYSNIPER': {
      name: 'Heavy Sniper',
      ammo: 142,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: 'w_sr_heavysniper'
    },
    'WEAPON_MARKSMANRIFLE': {
      name: 'Marksman Rifle',
      ammo: 128,
      bone: 24818,
      position: new mp.Vector3(0.1, -0.15, 0.0),
      rotation: new mp.Vector3(0.0, 135.0, 0.0),
      model: 'w_sr_marksmanrifle'
    },
    'WEAPON_SNIPERRIFLE': {
      name: 'Sniper Rifle',
      ammo: 110,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_sr_sniperrifle'
    },
  },
  'Heavy': {
  	'WEAPON_RPG': {
      name: 'RPG',
      ammo: 243,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_lr_rpg'
    },
    'WEAPON_COMPACTLAUNCHER': {
      name: 'Compact Launcher',
      ammo: 280,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: ''
    },
  	'WEAPON_FIREWORK': {
      name: 'Firework',
      ammo: 180,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_lr_firework'
    },
  	'WEAPON_GRENADELAUNCHER': {
      name: 'Grenade Launcher',
      ammo: 147,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_lr_grenadelauncher'
    },
  	'WEAPON_HOMINGLAUNCHER': {
      name: 'Homing Launcher',
      ammo: 340,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_lr_homing'
    },
  	'WEAPON_MINIGUN': {
      name: 'Minigun',
      ammo: 500,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_mg_minigun'
    },
  	'WEAPON_RAILGUN': {
      name: 'Rail Gun',
      ammo: 1000,
      bone: 24818,
      position: new mp.Vector3(0.0 , 0.0 , 0.0 ),
      rotation: new mp.Vector3(0.0, 0.0, 0.0),
      model: 'w_ar_railgun'
    },
  }
}

module.exports = config;
