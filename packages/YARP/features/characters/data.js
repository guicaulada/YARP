'use strict';

let data = {};

data.freemode = [mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01')];
data.fathers = {'Benjamin': 0, 'Daniel': 1, 'Joshua': 2, 'Noah': 3, 'Andrew': 4, 'Juan': 5, 'Alex': 6, 'Isaac': 7, 'Evan': 8, 'Ethan': 9, 'Vincent': 10, 'Angel': 11, 'Diego': 12, 'Adrian': 13, 'Gabriel': 14, 'Michael': 15, 'Santiago': 16, 'Kevin': 17, 'Louis': 18, 'Samuel': 19, 'Anthony': 20, 'Claude': 42, 'Niko': 43, 'John': 44};
data.mothers = {'Hannah': 21, 'Aubrey': 22, 'Jasmine': 23, 'Gisele': 24, 'Amelia': 25, 'Isabella': 26, 'Zoe': 27, 'Ava': 28, 'Camila': 29, 'Violet': 30, 'Sophia': 31, 'Evelyn': 32, 'Nicole': 33, 'Ashley': 34, 'Gracie': 35, 'Brianna': 36, 'Natalie': 37, 'Olivia': 38, 'Elizabeth': 39, 'Charlotte': 40, 'Emma': 41, 'Misty': 45};
data.features = {
  'Nose': ['Nose Width', 'Nose Bottom Height', 'Nose Tip Length', 'Nose Bridge Depth', 'Nose Tip Height', 'Nose Broken'],
  'Brow': ['Brow Height', 'Brow Depth'],
  'Cheek': ['Cheekbone Height', 'Cheekbone Width', 'Cheek Depth'],
  'Eye': ['Eye Size'],
  'Lip': ['Lip Thickness'],
  'Jaw': ['Jaw Width', 'Jaw Shape'],
  'Chin': ['Chin Height', 'Chin Depth', 'Chin Width', 'Chin Indent'],
  'Neck': ['Neck Width'],
};

data.appearances = {
  // blemishes
  'Blemishes': ['None', 'Measles', 'Pimples', 'Spots', 'Break Out', 'Blackheads', 'Build Up', 'Pustules', 'Zits', 'Full Acne', 'Acne', 'Cheek Rash', 'Face Rash', 'Picker', 'Puberty', 'Eyesore', 'Chin Rash', 'Two Face', 'T Zone', 'Greasy', 'Marked', 'Acne Scarring', 'Full Acne Scarring', 'Cold Sores', 'Impetigo'],
  // facial hair
  'Facial Hair': ['None', 'Light Stubble', 'Balbo', 'Circle Beard', 'Goatee', 'Chin', 'Chin Fuzz', 'Pencil Chin Strap', 'Scruffy', 'Musketeer', 'Mustache', 'Trimmed Beard', 'Stubble', 'Thin Circle Beard', 'Horseshoe', 'Pencil and \'Chops', 'Chin Strap Beard', 'Balbo and Sideburns', 'Mutton Chops', 'Scruffy Beard', 'Curly', 'Curly & Deep Stranger', 'Handlebar', 'Faustic', 'Otto & Patch', 'Otto & Full Stranger', 'Light Franz', 'The Hampstead', 'The Ambrose', 'Lincoln Curtain'],
  // eyebrows
  'Eyebrows': ['None', 'Balanced', 'Fashion', 'Cleopatra', 'Quizzical', 'Femme', 'Seductive', 'Pinched', 'Chola', 'Triomphe', 'Carefree', 'Curvaceous', 'Rodent', 'Double Tram', 'Thin', 'Penciled', 'Mother Plucker', 'Straight and Narrow', 'Natural', 'Fuzzy', 'Unkempt', 'Caterpillar', 'Regular', 'Mediterranean', 'Groomed', 'Bushels', 'Feathered', 'Prickly', 'Monobrow', 'Winged', 'Triple Tram', 'Arched Tram', 'Cutouts', 'Fade Away', 'Solo Tram'],
  // ageing
  'Ageing': ['None', 'Crow\'s Feet', 'First Signs', 'Middle Aged', 'Worry Lines', 'Depression', 'Distinguished', 'Aged', 'Weathered', 'Wrinkled', 'Sagging', 'Tough Life', 'Vintage', 'Retired', 'Junkie', 'Geriatric'],
  // makeup
  'Makeup': ['None', 'Smoky Black', 'Bronze', 'Soft Gray', 'Retro Glam', 'Natural Look', 'Cat Eyes', 'Chola', 'Vamp', 'Vinewood Glamour', 'Bubblegum', 'Aqua Dream', 'Pin Up', 'Purple Passion', 'Smoky Cat Eye', 'Smoldering Ruby', 'Pop Princess'],
  // blush
  'Blush': ['None', 'Full', 'Angled', 'Round', 'Horizontal', 'High', 'Sweetheart', 'Eighties'],
  // complexion
  'Complexion': ['None', 'Rosy Cheeks', 'Stubble Rash', 'Hot Flush', 'Sunburn', 'Bruised', 'Alchoholic', 'Patchy', 'Totem', 'Blood Vessels', 'Damaged', 'Pale', 'Ghostly'],
  // sun damage
  'Sun Damage': ['None', 'Uneven', 'Sandpaper', 'Patchy', 'Rough', 'Leathery', 'Textured', 'Coarse', 'Rugged', 'Creased', 'Cracked', 'Gritty'],
  // lipstick
  'Lipstick': ['None', 'Color Matte', 'Color Gloss', 'Lined Matte', 'Lined Gloss', 'Heavy Lined Matte', 'Heavy Lined Gloss', 'Lined Nude Matte', 'Liner Nude Gloss', 'Smudged', 'Geisha'],
  // freckles
  'Moles & Freckles': ['None', 'Cherub', 'All Over', 'Irregular', 'Dot Dash', 'Over the Bridge', 'Baby Doll', 'Pixie', 'Sun Kissed', 'Beauty Marks', 'Line Up', 'Modelesque', 'Occasional', 'Speckled', 'Rain Drops', 'Double Dip', 'One Sided', 'Pairs', 'Growth'],
  // chest hair
  'Chest Hair': ['None', 'Natural', 'The Strip', 'The Tree', 'Hairy', 'Grisly', 'Ape', 'Groomed Ape', 'Bikini', 'Lightning Bolt', 'Reverse Lightning', 'Love Heart', 'Chestache', 'Happy Face', 'Skull', 'Snail Trail', 'Slug and Nips', 'Hairy Arms'],
};

data.hairs = [
  // male
  [
    {ID: 0, Name: 'Close Shave', Collection: 'mpbeach_overlays', Overlay: 'FM_Hair_Fuzz'},
    {ID: 1, Name: 'Buzzcut', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_001'},
    {ID: 2, Name: 'Faux Hawk', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_002'},
    {ID: 3, Name: 'Hipster', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_003'},
    {ID: 4, Name: 'Side Parting', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_004'},
    {ID: 5, Name: 'Shorter Cut', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_005'},
    {ID: 6, Name: 'Biker', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_006'},
    {ID: 7, Name: 'Ponytail', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_007'},
    {ID: 8, Name: 'Cornrows', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_008'},
    {ID: 9, Name: 'Slicked', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_009'},
    {ID: 10, Name: 'Short Brushed', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_013'},
    {ID: 11, Name: 'Spikey', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_002'},
    {ID: 12, Name: 'Caesar', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_011'},
    {ID: 13, Name: 'Chopped', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_012'},
    {ID: 14, Name: 'Dreads', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_014'},
    {ID: 15, Name: 'Long Hair', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_015'},
    {ID: 16, Name: 'Shaggy Curls', Collection: 'multiplayer_overlays', Overlay: 'NGBea_M_Hair_000'},
    {ID: 17, Name: 'Surfer Dude', Collection: 'multiplayer_overlays', Overlay: 'NGBea_M_Hair_001'},
    {ID: 18, Name: 'Short Side Part', Collection: 'multiplayer_overlays', Overlay: 'NGBus_M_Hair_000'},
    {ID: 19, Name: 'High Slicked Sides', Collection: 'multiplayer_overlays', Overlay: 'NGBus_M_Hair_001'},
    {ID: 20, Name: 'Long Slicked', Collection: 'multiplayer_overlays', Overlay: 'NGHip_M_Hair_000'},
    {ID: 21, Name: 'Hipster Youth', Collection: 'multiplayer_overlays', Overlay: 'NGHip_M_Hair_001'},
    {ID: 22, Name: 'Mullet', Collection: 'multiplayer_overlays', Overlay: 'NGInd_M_Hair_000'},
    {ID: 24, Name: 'Classic Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_M_Hair_000'},
    {ID: 25, Name: 'Palm Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_M_Hair_001'},
    {ID: 26, Name: 'Lightning Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_M_Hair_002'},
    {ID: 27, Name: 'Whipped Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_M_Hair_003'},
    {ID: 28, Name: 'Zig Zag Cornrows', Collection: 'mplowrider2_overlays', Overlay: 'LR_M_Hair_004'},
    {ID: 29, Name: 'Snail Cornrows', Collection: 'mplowrider2_overlays', Overlay: 'LR_M_Hair_005'},
    {ID: 30, Name: 'Hightop', Collection: 'mplowrider2_overlays', Overlay: 'LR_M_Hair_006'},
    {ID: 31, Name: 'Loose Swept Back', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_000_M'},
    {ID: 32, Name: 'Undercut Swept Back', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_001_M'},
    {ID: 33, Name: 'Undercut Swept Side', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_002_M'},
    {ID: 34, Name: 'Spiked Mohawk', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_003_M'},
    {ID: 35, Name: 'Mod', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_004_M'},
    {ID: 36, Name: 'Layered Mod', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_005_M'},
    {ID: 72, Name: 'Flattop', Collection: 'mpgunrunning_overlays', Overlay: 'MP_Gunrunning_Hair_M_000_M'},
    {ID: 73, Name: 'Military Buzzcut', Collection: 'mpgunrunning_overlays', Overlay: 'MP_Gunrunning_Hair_M_001_M'},
  ],
  // female
  [
    {ID: 0, Name: 'Close Shave', Collection: 'mpbeach_overlays', Overlay: 'FM_Hair_Fuzz'},
    {ID: 1, Name: 'Short', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_001'},
    {ID: 2, Name: 'Layered Bob', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_002'},
    {ID: 3, Name: 'Pigtails', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_003'},
    {ID: 4, Name: 'Ponytail', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_004'},
    {ID: 5, Name: 'Braided Mohawk', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_005'},
    {ID: 6, Name: 'Braids', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_006'},
    {ID: 7, Name: 'Bob', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_007'},
    {ID: 8, Name: 'Faux Hawk', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_008'},
    {ID: 9, Name: 'French Twist', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_009'},
    {ID: 10, Name: 'Long Bob', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_010'},
    {ID: 11, Name: 'Loose Tied', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_011'},
    {ID: 12, Name: 'Pixie', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_012'},
    {ID: 13, Name: 'Shaved Bangs', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_013'},
    {ID: 14, Name: 'Top Knot', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_014'},
    {ID: 15, Name: 'Wavy Bob', Collection: 'multiplayer_overlays', Overlay: 'NG_M_Hair_015'},
    {ID: 16, Name: 'Messy Bun', Collection: 'multiplayer_overlays', Overlay: 'NGBea_F_Hair_000'},
    {ID: 17, Name: 'Pin Up Girl', Collection: 'multiplayer_overlays', Overlay: 'NGBea_F_Hair_001'},
    {ID: 18, Name: 'Tight Bun', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_007'},
    {ID: 19, Name: 'Twisted Bob', Collection: 'multiplayer_overlays', Overlay: 'NGBus_F_Hair_000'},
    {ID: 20, Name: 'Flapper Bob', Collection: 'multiplayer_overlays', Overlay: 'NGBus_F_Hair_001'},
    {ID: 21, Name: 'Big Bangs', Collection: 'multiplayer_overlays', Overlay: 'NGBea_F_Hair_001'},
    {ID: 22, Name: 'Braided Top Knot', Collection: 'multiplayer_overlays', Overlay: 'NGHip_F_Hair_000'},
    {ID: 23, Name: 'Mullet', Collection: 'multiplayer_overlays', Overlay: 'NGInd_F_Hair_000'},
    {ID: 25, Name: 'Pinched Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_F_Hair_000'},
    {ID: 26, Name: 'Leaf Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_F_Hair_001'},
    {ID: 27, Name: 'Zig Zag Cornrows', Collection: 'mplowrider_overlays', Overlay: 'LR_F_Hair_002'},
    {ID: 28, Name: 'Pigtail Bangs', Collection: 'mplowrider2_overlays', Overlay: 'LR_F_Hair_003'},
    {ID: 29, Name: 'Wave Braids', Collection: 'mplowrider2_overlays', Overlay: 'LR_F_Hair_003'},
    {ID: 30, Name: 'Coil Braids', Collection: 'mplowrider2_overlays', Overlay: 'LR_F_Hair_004'},
    {ID: 31, Name: 'Rolled Quiff', Collection: 'mplowrider2_overlays', Overlay: 'LR_F_Hair_006'},
    {ID: 32, Name: 'Loose Swept Back', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_000_F'},
    {ID: 33, Name: 'Undercut Swept Back', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_001_F'},
    {ID: 34, Name: 'Undercut Swept Side', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_002_F'},
    {ID: 35, Name: 'Spiked Mohawk', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_003_F'},
    {ID: 36, Name: 'Bandana and Braid', Collection: 'multiplayer_overlays', Overlay: 'NG_F_Hair_003'},
    {ID: 37, Name: 'Layered Mod', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_006_F'},
    {ID: 38, Name: 'Skinbyrd', Collection: 'mpbiker_overlays', Overlay: 'MP_Biker_Hair_004_F'},
    {ID: 76, Name: 'Neat Bun', Collection: 'mpgunrunning_overlays', Overlay: 'MP_Gunrunning_Hair_F_000_F'},
    {ID: 77, Name: 'Short Bob', Collection: 'mpgunrunning_overlays', Overlay: 'MP_Gunrunning_Hair_F_001_F'},
  ],
];

data.eyeColors = ['Green', 'Emerald', 'Light Blue', 'Ocean Blue', 'Light Brown', 'Dark Brown', 'Hazel', 'Dark Gray', 'Light Gray', 'Pink', 'Yellow', 'Purple', 'Blackout', 'Shades of Gray', 'Tequila Sunrise', 'Atomic', 'Warp', 'ECola', 'Space Ranger', 'Ying Yang', 'Bullseye', 'Lizard', 'Dragon', 'Extra Terrestrial', 'Goat', 'Smiley', 'Possessed', 'Demon', 'Infected', 'Alien', 'Undead', 'Zombie'];

data.maxHairColor = 64;
data.maxEyeColor = 32;
data.maxBlushColor = 27;
data.maxLipstickColor = 32;

// color arrays
data.hairColors = [];
for (let i = 0; i < data.maxHairColor; i++) data.hairColors.push(i.toString());

data.blushColors = [];
for (let i = 0; i < data.maxBlushColor; i++) data.blushColors.push(i.toString());

data.lipstickColors = [];
for (let i = 0; i < data.maxLipstickColor; i++) data.lipstickColors.push(i.toString());


module.exports = data;
