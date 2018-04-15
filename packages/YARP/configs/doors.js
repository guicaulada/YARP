'use strict';

let config = {
  //Banks
  'Bank Main': {
    model: 110411286,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(232.6054, 214.1584, 106.4049),
      new mp.Vector3(231.5123, 216.5177, 106.4049),
      new mp.Vector3(260.6432, 203.2052, 106.4049),
      new mp.Vector3(258.2022, 204.1005, 106.4049),
      new mp.Vector3(259.9831, 215.2468, 106.4049),
      new mp.Vector3(259.0879, 212.8062, 106.4049)
    ]
  },
  'Bank Upstairs': {
    model: 1956494919,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(237.7704, 227.87, 106.426),
      new mp.Vector3(236.5488, 228.3147, 110.4328),
      new mp.Vector3(256.6172, 206.1522, 110.4328)
    ]
  },
  'Bank Office': {
    model: 964838196,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(260.8579, 210.4453, 110.4328),
      new mp.Vector3(262.5366, 215.0576, 110.4328)
    ]
  },
  //Stores
  'Discount Store': {
    model: -1148826190,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(82.38156, -1390.476, 29.52609)
    ]
  },
  'Popular LSC': {
    model: 868499217,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(82.38156, -1390.752, 29.52609)
    ]
  },
  'Carcer LSC': {
    model: 270330101,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(723.116, -1088.831, 23.23201)
    ]
  },
  'Greenwich LSC': {
    model: -550347177,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-356.0905, -134.7714, 40.01295),
      new mp.Vector3(-1145.898, -1991.144, 14.18357)
    ]
  },
  'Route 68 LSC': {
    model: -822900180,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(1174.656, 2644.159, 40.50673),
      new mp.Vector3(1182.307, 2644.166, 40.50784),
      new mp.Vector3(114.3135, 6623.233, 32.67305),
      new mp.Vector3(108.8502, 6617.877, 32.67305)
    ]
  },
  'Route 68 Office': {
    model: 1335311341,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(1187.202, 2644.95, 38.55176),
      new mp.Vector3(105.1518, 6614.655, 32.58521)
    ]
  },
  'Route 68 Office Int': {
    model: 1544229216,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(1182.646, 2641.182, 39.31031),
      new mp.Vector3(105.7772, 6620.532, 33.34266)
    ]
  },
  // Ammunations
  'Ammu-Nation Right': {
    model: -8873588,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(842.7685, -1024.539, 28.34478),
      new mp.Vector3(-662.6415, -944.3256, 21.97915),
      new mp.Vector3(810.5769, -2148.27, 29.76892),
      new mp.Vector3(18.572, -1115.495, 29.94694),
      new mp.Vector3(243.8379, -46.52324, 70.09098),
      new mp.Vector3(-1314.5981, -390.8461, 36.5870)
    ]
  },
  'Ammu-Nation Left': {
    model: 97297972,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(845.3694, -1024.539, 28.34478),
      new mp.Vector3(-665.2424, -944.3256, 21.97915),
      new mp.Vector3(813.1779, -2148.27, 29.76892),
      new mp.Vector3(16.12787, -1114.606, 29.94694),
      new mp.Vector3(244.7275, -44.07911, 70.09098),
      new mp.Vector3(-1314.5981, -389.6211, 36.5870)
    ]
  },
  'Ammu-Nation Office': {
    model: 452874391,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(6.81789, -1098.209, 29.94685)
    ]
  },
  //Clothing
  'Ponsonbys': {
    model: -1922281023,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-715.6154, -157.2561, 37.67493),
      new mp.Vector3(-716.6755, -155.42, 37.67493),
      new mp.Vector3(-1456.201, -233.3682, 50.05648),
      new mp.Vector3(-1454.782, -231.7927, 50.05649),
      new mp.Vector3(-156.439, -304.4294, 39.99308),
      new mp.Vector3(-157.1293, -306.4341, 39.99308)
    ]
  },
  'Sub Urban': {
    model: 1780022985,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-1201.435, -776.8566, 17.99184),
      new mp.Vector3(127.8201, -211.8274, 55.22751),
      new mp.Vector3(617.2458, 2751.022, 42.75777),
      new mp.Vector3(-3167.75, 1055.536, 21.53288)
    ]
  },
  //Liquor
  'Robs Liquor Glass': {
    model: -1212951353,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-2973.535, 390.1414, 15.18735),
      new mp.Vector3(-1490.411, -383.8453, 40.30745),
      new mp.Vector3(-1226.894, -903.1218, 12.47039),
      new mp.Vector3(1141.038, -980.3225, 46.55986)
    ]
  },
  'Robs Liquor Wood': {
    model: 1173348778,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-2965.648, 386.7928, 15.18735),
      new mp.Vector3(-2961.749, 390.2573, 15.19322),
      new mp.Vector3(-1482.679, -380.153, 40.30745),
      new mp.Vector3(-1482.693, -374.9365, 40.31332),
      new mp.Vector3(-1224.755, -911.4182, 12.47039),
      new mp.Vector3(-1219.633, -912.406, 12.47626),
      new mp.Vector3(1132.645, -978.6059, 46.55986),
      new mp.Vector3(1129.51, -982.7756, 46.56573)
    ]
  },
  //Barber
  'Bob Mulet': {
    model: 145369505,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-822.4442, -188.3924, 37.81895)
    ]
  },
  'Hair on Hawick': {
    model: -1663512092,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-823.2001, -187.0831, 37.81895)
    ]
  },
  'OSheas': {
    model: -1844444717,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-29.86917, -148.1571, 57.22648),
      new mp.Vector3(1932.952, 3725.154, 32.9944)
    ]
  },
  //Motorsport
  'Premium Deluxe Parking': {
    model: 1417577297,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-37.33113, -1108.873, 26.7198),
      new mp.Vector3(-60.54582, -1094.749, 26.88872)
    ]
  },
  'Premium Deluxe Main': {
    model: 2059227086,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-39.13366, -1108.218, 26.7198),
      new mp.Vector3(-59.89302, -1092.952, 26.88362)
    ]
  },
  'Premium Deluxe Right': {
    model: -2051651622,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-33.80989, -1107.579, 26.57225),
      new mp.Vector3(-31.72353, -1101.847, 26.57225)
    ]
  },
  //Houses
  'Franklin House': {
    model: 520341586,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-14.86892, -1441.182, 31.19323)
    ]
  },
  'Franklin House Garage': {
    model: 703855057,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(-25.2784, -1431.061, 30.83955)
    ]
  },
  //Police
  'Mission Row Main Right': {
    model: 320433149,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(434.7479, -983.2151, 30.83926)
    ]
  },
  'Mission Row Main Left': {
    model: -1215222675,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(434.7479, -980.6184, 30.83926)
    ]
  },
  'Mission Row Back': {
    model: -2023754432,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(469.9679, -1014.452, 26.53623),
      new mp.Vector3(467.3716, -1014.452, 26.53623),
      new mp.Vector3(452.6248, -987.3626, 30.8393)
    ]
  },
  'Mission Row Cells': {
    model: -1033001619,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(463.4782, -1003.538, 25.00599)
    ]
  },
  'Mission Row Cell': {
    model: 631614199,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(461.8065, -994.4086, 25.06443),
      new mp.Vector3(461.8065, -997.6583, 25.06443),
      new mp.Vector3(461.8065, -1001.302, 25.06443),
      new mp.Vector3(464.5701, -992.6641, 25.06443)
    ]
  },
  'Mission Row Capitan': {
    model: -1320876379,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(446.5728, -980.0106, 30.8393)
    ]
  },
  'Mission Row Armory': {
    model: 185711165,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(450.1041, -984.0915, 30.8393),
      new mp.Vector3(450.1041, -981.4915, 30.8393),
      new mp.Vector3(443.4078, -989.4454, 30.8393),
      new mp.Vector3(446.0079, -989.4454, 30.8393)
    ]
  },
  'Mission Row Secure': {
    model: 749848321,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(453.0793, -983.1895, 30.83926),
      new mp.Vector3(461.2865, -985.3206, 30.83926)
    ]
  },
  'Mission Row Lockers': {
    model: 1557126584,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(450.1041, -985.7384, 30.8393)
    ]
  },
  'Mission Row Roof': {
    model: -340230128,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(464.3613, -984.678, 43.83443)
    ]
  },
  'Mission Row Briefing': {
    model: -131296141,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(443.0298, -991.941, 30.8393),
      new mp.Vector3(443.0298, -994.5412, 30.8393)
    ]
  },
  'Mission Row Gate': {
    model: -1603817716,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(488.8923, -1011.67, 27.14583)
    ]
  },
  //Others
  'Vanilla Unicorn Main': {
    model: -1116041313,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(127.9552, -1298.503, 29.41962)
    ]
  },
  'Vanilla Unicorn Back': {
    model: 668467214,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(96.09197, -1284.854, 29.43878)
    ]
  },
  'Vanilla Unicorn Office': {
    model: -626684119,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(99.08321, -1293.701, 29.41868)
    ]
  },
  'Vanilla Unicorn Dress': {
    model: -495720969,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(113.9822, -1297.43, 29.41868)
    ]
  },
  'Vanilla Unicorn Private': {
    model: -1881825907,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(116.0046, -1294.692, 29.41947)
    ]
  },
  'Penitentiary': {
    model: 741314661,
    enter: (player) => {this.open();},
    leave: (player) => {this.close();},
    positions: [
      new mp.Vector3(1844.998, 2597.482, 44.63626),
      new mp.Vector3(1818.543, 2597.482, 44.60749),
      new mp.Vector3(1806.939, 2616.975, 44.60093)
    ]
  }
}

module.exports = config;
