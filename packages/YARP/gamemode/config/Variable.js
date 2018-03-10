'use strict';
/**
 * @file Variable config
 */
yarp.Variable.load().then(() => {
  console.log(chalk.yellowBright("[YARP] ")+"Loading Variables");
  new yarp.Variable('devs', ['Sighmir']).save();
  new yarp.Variable('whitelist', false).save();
  new yarp.Variable('swallet', 100).save();
  new yarp.Variable('sbank', 1500).save();
  new yarp.Variable('save_interval', 10).save();
  new yarp.Variable('max_weight', 30).save();
  new yarp.Variable('first_spawn', new mp.Vector3(-888.8746, -2313.2836, 3.5077)).save();
  new yarp.Variable('first_heading', 90).save();
  new yarp.Variable('spawn', [
    new mp.Vector3(-425.517, 1123.620, 325.8544),
    new mp.Vector3(-415.777, 1168.791, 325.854),
    new mp.Vector3(-432.534, 1157.461, 325.854),
    new mp.Vector3(-401.850, 1149.482, 325.854)
  ]).save();
});
