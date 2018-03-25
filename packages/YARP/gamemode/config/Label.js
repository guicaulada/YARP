'use strict';
/**
* @file Label config
*/
module.exports = {
  "FIB Elevator Up": {
    enter: (player) => {mp.events.call('bindFIBElevatorUp',player)},
    leave: (player) => {mp.events.call('unbindFIBElevatorUp',player)},
    visible: false,
    positions: [
      new mp.Vector3(139.219,-762.7094,45.752)
    ],
  },
  "FIB Elevator Down": {
    enter: (player) => {mp.events.call('bindFIBElevatorDown',player)},
    leave: (player) => {mp.events.call('unbindFIBElevatorDown',player)},
    visible: false,
    positions: [
      new mp.Vector3(136.0667,-761.8372,234.1520)
    ],
  },
  "Airport": {
    visible: false,
    positions: [
      new mp.Vector3(-1032.690, -2728.141, 13.757),
      new mp.Vector3(1743.6820, 3286.2510, 40.087)
    ],
  },
  "Cable Car": {
    visible: false,
    positions: [
      new mp.Vector3(-737.746, 5595.192, 41.655),
      new mp.Vector3(457.097, 5571.724, 781.184)
    ],
  },
  "Tattoo Shop": {
    visible: false,
    positions: [
      new mp.Vector3(1322.645, -1651.976, 52.275),
      new mp.Vector3(-1153.676, -1425.68, 4.954),
      new mp.Vector3(322.139, 180.467, 103.587),
      new mp.Vector3(-3170.071, 1075.059, 20.829),
      new mp.Vector3(1864.633, 3747.738, 33.032),
      new mp.Vector3(-293.713, 6200.04, 31.487)
    ],
  },
  "Store": {
    enter: (player) => {mp.events.call('bindItemStore',player,"Food")},
    leave: (player) => {mp.events.call('unbindItemStore',player)},
    visible: false,
    positions: [
      new mp.Vector3(1734.48046875, 6420.38134765625, 34.5372314453125),
      new mp.Vector3(1960.7580566406, 3749.26367187, 31.3437423706055),
      new mp.Vector3(1986.1240234375, 3053.874755859, 47.215171813),
      new mp.Vector3(-709.17022705, -904.21722412109, 19.215591430664),
      new mp.Vector3(28.7538948059082, -1339.8212890625, 29.4970436096191),
      new mp.Vector3(-43.1531448364258, -1748.75244140625, 29.4209976196289),
      new mp.Vector3(378.030487060547, 332.944427490234, 103.566375732422),
      new mp.Vector3(1126.68029785156, -980.39501953125, 45.4157257080078),
      new mp.Vector3(2673.32006835938, 3286.4150390625, 55.241138458252),
      new mp.Vector3(1707.52648925781, 4920.05126953125, 42.0636787414551),
      new mp.Vector3(-1479.22424316406, -375.097686767578, 39.1632804870605),
      new mp.Vector3(-2959.37524414063, 387.556365966797, 14.043158531189),
      new mp.Vector3(-1220.14123535156, -915.712158203125, 11.3261671066284),
      new mp.Vector3(1160.06237792969, -314.061828613281, 69.2050628662109),
      new mp.Vector3(-1829.00427246094, 798.903076171875, 138.186706542969),
      new mp.Vector3(2549.400390625, 385.048309326172, 108.622955322266),
      new mp.Vector3(-621.989135742188, -230.804443359375, 38.0570297241211)
    ],
  },
  "Barbershop": {
    visible: false,
    positions: [
      new mp.Vector3(-827.333, -190.916, 37.599),
      new mp.Vector3(130.512, -1715.535, 29.226),
      new mp.Vector3(-1291.472, -1117.230, 6.641),
      new mp.Vector3(1936.451, 3720.533, 32.638),
      new mp.Vector3(1200.214, -468.822, 66.268),
      new mp.Vector3(-30.109, -141.693, 57.041),
      new mp.Vector3(-285.238, 6236.365, 31.455)
    ],
  },
  "Bank": {
    visible: false,
    positions: [
      new mp.Vector3(147.04908752441, -1044.9448242188, 29.36802482605),
      new mp.Vector3(-2957.6674804688, 481.45776367188, 15.697026252747),
      new mp.Vector3(-107.06505584717, 6474.8012695313, 31.62670135498),
      new mp.Vector3(-1212.2568359375, -336.128295898438, 36.7907638549805),
      new mp.Vector3(-354.452575683594, -53.8204879760742, 48.0463104248047),
      new mp.Vector3(309.967376708984, -283.033660888672, 53.1745223999023),
      new mp.Vector3(1176.86865234375, 2711.91357421875, 38.097785949707),
      new mp.Vector3(255.001098632813, 225.855895996094, 101.005694274902)
    ],
  },
  "Ammu-Nation": {
    enter: (player) => {mp.events.call('bindFullWeaponStore',player)},
    leave: (player) => {mp.events.call('unbindFullWeaponStore',player)},
    visible: false,
    positions: [
      new mp.Vector3(1692.41, 3758.22, 34.7053),
      new mp.Vector3(252.696, -48.2487, 69.941),
      new mp.Vector3(844.299, -1033.26, 28.1949),
      new mp.Vector3(-331.624, 6082.46, 31.4548),
      new mp.Vector3(-664.147, -935.119, 21.8292),
      new mp.Vector3(2569.62, -294.453, 108.735),
      new mp.Vector3(21.70, -1107.41, 29.79),
      new mp.Vector3( 810.15, -2156.88, 29.61),
      new mp.Vector3(-3172.6037, 1085.7481, 20.838),
      new mp.Vector3(-1119.4880, 2697.086, 18.5541),
      new mp.Vector3(-1305.45056, -394.0068, 36.695)
    ],
  },
  "Carwash": {
    visible: false,
    positions: [
      new mp.Vector3(26.5906, -1392.0261, 29.3634),
      new mp.Vector3(167.1034, -1719.4704, 29.2916),
      new mp.Vector3(-74.5693, 6427.8715, 31.4400),
      new mp.Vector3(-699.6325, -932.7043, 19.0139)
    ],
  },
  "Clothing": {
    visible: false,
    positions: [
      new mp.Vector3(88.291, -1391.929, 29.200),
      new mp.Vector3(-718.985, -158.059, 36.996),
      new mp.Vector3(-151.204, -306.837, 38.724),
      new mp.Vector3(414.646, -807.452, 29.33),
      new mp.Vector3(-815.193, -1083.333, 11.022),
      new mp.Vector3(-1208.098, -782.020, 17.163),
      new mp.Vector3(-1457.954, -229.426, 49.185),
      new mp.Vector3(-2.777, 6518.491, 31.533),
      new mp.Vector3(1681.586, 4820.133, 42.046),
      new mp.Vector3(130.216, -202.940, 54.505),
      new mp.Vector3(618.701, 2740.564, 41.905),
      new mp.Vector3(1199.169, 2694.895, 37.866),
      new mp.Vector3(-3164.172, 1063.927, 20.674),
      new mp.Vector3(-1091.373, 2702.356, 19.422)
    ],
  },
  "Gang Zone": {
    visible: false,
    positions: [
      new mp.Vector3(298.68, -2010.10, 20.07),
      new mp.Vector3(86.64, -1924.60, 20.79),
      new mp.Vector3(-183.52, -1632.62, 33.34),
      new mp.Vector3(989.37, -1777.56, 31.32),
      new mp.Vector3(960.24, -140.31, 74.50),
      new mp.Vector3(-1042.29, 4910.17, 94.92),
      new mp.Vector3(29.4838, 3735.593, 38.688),
      new mp.Vector3(-455.752, -1711.884, 18.642)
    ],
  },
  "Gas Station": {
    visible: false,
    positions: [
      new mp.Vector3(49.41872, 2778.793, 58.04395),
      new mp.Vector3(263.8949, 2606.463, 44.98339),
      new mp.Vector3(1039.958, 2671.134, 39.55091),
      new mp.Vector3(1207.26, 2660.175, 37.89996),
      new mp.Vector3(2539.685, 2594.192, 37.94488),
      new mp.Vector3(2679.858, 3263.946, 55.24057),
      new mp.Vector3(2005.055, 3773.887, 32.40393),
      new mp.Vector3(1687.156, 4929.392, 42.07809),
      new mp.Vector3(1701.314, 6416.028, 32.76395),
      new mp.Vector3(179.8573, 6602.839, 31.86817),
      new mp.Vector3(-94.46199, 6419.594, 31.48952),
      new mp.Vector3(-2554.996, 2334.402, 33.07803),
      new mp.Vector3(-1800.375, 803.6619, 138.6512),
      new mp.Vector3(-1437.622, -276.7476, 46.20771),
      new mp.Vector3(-2096.243, -320.2867, 13.16857),
      new mp.Vector3(-724.6192, -935.1631, 19.21386),
      new mp.Vector3(-526.0198, -1211.003, 18.18483),
      new mp.Vector3(-70.21484, -1761.792, 29.53402),
      new mp.Vector3(265.6484, -1261.309, 29.29294),
      new mp.Vector3(819.6538, -1028.846, 26.40342),
      new mp.Vector3(1208.951, -1402.567, 35.22419),
      new mp.Vector3(1181.381, -330.8471, 69.31651),
      new mp.Vector3(620.8434, 269.1009, 103.0895),
      new mp.Vector3(2581.321, 362.0393, 108.4688),
      new mp.Vector3(1785.363, 3330.372, 41.38188),
      new mp.Vector3(-319.690, -1471.610, 30.030),
      new mp.Vector3(174.880, -1562.450, 28.740),
      new mp.Vector3(1246.480, -1485.450, 34.900),
      new mp.Vector3(-66.330, -2532.570, 6.140)
    ],
  },
  "Hospital": {
    visible: false,
    positions: [
      new mp.Vector3(1839.6, 3672.93, 34.28),
      new mp.Vector3(-247.76, 6331.23, 32.43),
      new mp.Vector3(-449.67, -340.83, 34.50),
      new mp.Vector3(357.43, -593.36, 28.79),
      new mp.Vector3(295.83, -1446.94, 29.97),
      new mp.Vector3(-676.98, 310.68, 83.08),
      new mp.Vector3(1151.21, -1529.62, 35.37),
      new mp.Vector3(-874.64, -307.71, 39.58)
    ],
  },
  "House": {
    visible: false,
    positions: [
      new mp.Vector3(-952.359436, -1077.50219, 2.6772258),
      new mp.Vector3(-59.124889373, -616.554, 37.35677),
      new mp.Vector3(-255.05390, -943.3288, 31.21998),
      new mp.Vector3(-771.7988, 351.594, 87.9981),
      new mp.Vector3(-3086.428, 339.252, 6.371),
      new mp.Vector3(-917.289, -450.206, 39.600),
      new mp.Vector3(261.4586, -998.8196, -99.00863),
      new mp.Vector3(-35.31277, -580.4199, 88.71221),
      new mp.Vector3(120.5, 549.952, 184.097),
      new mp.Vector3(-1288.055, 440.748, 97.69459),
      new mp.Vector3(-1468.14, -541.815, 73.4442)
    ],
  },
  "LS Customs": {
    visible: false,
    positions: [
      new mp.Vector3(-337.3863, -136.9247, 39.0737),
      new mp.Vector3(-1155.536, -2007.183, 13.244),
      new mp.Vector3(731.8163, -1088.822, 22.233),
      new mp.Vector3(1175.04, 2640.216, 37.82177),
      new mp.Vector3(110.8406, 6626.568, 32.287)
    ],
  },
  "Race": {
    visible: false,
    positions: [
      new mp.Vector3(-1277.629, -2030.913, 1.2823),
      new mp.Vector3(2384.969, 4277.583, 30.379),
      new mp.Vector3(1577.881, 3836.107, 30.7717)
    ],
  },
  "Police Station": {
    visible: false,
    positions: [
      new mp.Vector3(425.130, -979.558, 30.711),
      new mp.Vector3(1859.234, 3678.742, 33.690),
      new mp.Vector3(-438.862, 6020.768, 31.490),
      new mp.Vector3(818.221, -1289.883, 26.300)
    ],
  },
  "Smoke on the Water": {
    visible: false,
    positions: [
      new mp.Vector3(-1171.42, -1572.72, 3.6636)
    ],
  },
  "MazeBank Arena": {
    visible: false,
    positions: [
      new mp.Vector3(-250.604, -2030.000, 30.000)
    ],
  },
  "Bahama Mamas": {
    visible: false,
    positions: [
      new mp.Vector3(925.329, 46.152, 80.908)
    ],
  },
  "Downtown CO.": {
    visible: false,
    positions: [
      new mp.Vector3(900.461, -181.466, 73.89)
    ],
  },
  "Tequil-La La": {
    visible: false,
    positions: [
      new mp.Vector3(-565.171, 276.625, 83.286)
    ],
  },
  "Theater": {
    visible: false,
    positions: [
      new mp.Vector3(-455.752, 180.466, 104.301)
    ],
  },
  "Weed Farm": {
    visible: false,
    positions: [
      new mp.Vector3(2208.777, 5578.235, 53.735)
    ],
  },
  "FIB": {
    visible: false,
    positions: [
      new mp.Vector3(105.455, -745.483, 44.754)
    ],
  },
  "Lifeinvader": {
    visible: false,
    positions: [
      new mp.Vector3(-1047.900, -233.000, 39.000)
    ],
  },
  "Cluckin Bell": {
    visible: false,
    positions: [
      new mp.Vector3(-72.68752, 6253.72656, 31.08991)
    ],
  },
  "Comedy Club": {
    visible: false,
    positions: [
      new mp.Vector3(-447.4833, 280.3197, 77.5215)
    ],
  },
  "Yacht": {
    visible: false,
    positions: [
      new mp.Vector3(-2045.800, -1031.200, 11.900)
    ],
  },
  "Ranch": {
    visible: false,
    positions: [
      new mp.Vector3(2441.200, 4968.500, 51.700)
    ],
  },
  "PlayBoy": {
    visible: false,
    positions: [
      new mp.Vector3(-1475.234, 167.088, 55.841)
    ],
  },
  "Chop Shop": {
    visible: false,
    positions: [
      new mp.Vector3(479.056, -1316.825, 28.203)
    ],
  },
  "Rebel Radio": {
    visible: false,
    positions: [
      new mp.Vector3(736.153, 2583.143, 79.634)
    ],
  },
  "Morgue": {
    visible: false,
    positions: [
      new mp.Vector3(243.351, -1376.014, 39.534)
    ],
  },
  "Golf": {
    visible: false,
    positions: [
      new mp.Vector3(-1336.715, 59.051, 55.246)
    ],
  },
  "Hippie Camp": {
    visible: false,
    positions: [
      new mp.Vector3(2476.712, 3789.645, 41.226)
    ],
  },
  "Torture": {
    visible: false,
    positions: [
      new mp.Vector3(132.583, -2202.327, 7.187)
    ],
  },
  "Body Training": {
    visible: false,
    positions: [
      new mp.Vector3(-1202.962, -1566.140, 4.610)
    ],
  },
  "Lester": {
    visible: false,
    positions: [
      new mp.Vector3(1274.292, -1712.663, 54.771),
      new mp.Vector3(705.859, -964.651, 30.396)
    ],
  },
  "Epsilon": {
    visible: false,
    positions: [
      new mp.Vector3(245.1564, 370.211, 104.7382)
    ],
  },
  "Franklin": {
    visible: false,
    positions: [
      new mp.Vector3(7.900, 548.100, 175.500),
      new mp.Vector3(-14.128, -1445.483, 30.648)
    ],
  },
  "Michael": {
    visible: false,
    positions: [
      new mp.Vector3(-852.400, 160.000, 65.600)
    ],
  },
  "Trevor": {
    visible: false,
    positions: [
      new mp.Vector3(1985.700, 3812.200, 32.200),
      new mp.Vector3(-1159.034, -1521.180, 10.633)
    ],
  },
  "Legal Jobs": {
    visible: false,
    positions: [
      new mp.Vector3(-268.363, -957.255, 31.223)
    ],
  },
  "Ilegal Jobs": {
    visible: false,
    positions: [
      new mp.Vector3(707.324, -966.986, 30.412)
    ],
  }
};
