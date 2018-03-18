'use strict';
/**
 * @file Vehicle class
 */
module.exports = class Vehicle{
  constructor(id,model,position,heading,owner,plate,color,alpha,locked,engine,dimension,visible){
    if ((typeof id) === 'object' || (id && model && position) != null) {
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._heading = id._heading || heading;
      this._owner = id._owner || owner || false;
      this._plate = id._plate || plate || yarp.utils.randomString(8,"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
      this._color = id._color || color || [0,0,0];
      this._alpha = id._alpha || alpha || 255;
      this._locked = id._locked || locked || false;
      this._engine = id._engine || engine || false;
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || false;
      this.mp = mp.vehicles.new(mp.joaat(this._model), this._position,
      {
        heading: this._heading,
        numberPlate: this._plate,
        alpha: this._alpha,
        color: this._color,
        locked: this._locked,
        engine: this._engine,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  set position(value){
    this.mp.position = value;
    this._position = value;
  }

  set heading(value){
    this.mp.rotation = new mp.Vector3(0,0,value);
    this._heading = value;
  }

  static config(file){
    let vehicles = require(file);
    for (let id in vehicles){
      let vehicle = vehicles[id];
      for (let i=0; i < vehicle.positions.length; i++){
        new yarp.Vehicle(id+" "+(i+1),vehicle.model,vehicle.positions[i],vehicle.owner,vehicle.heading,vehicle.plate+i,vehicle.color,vehicle.alpha,vehicle.locked,vehicle.engine,vehicle.dimension,vehicle.visible)
      }
    }
  }

  static load(){
    return yarp.dbm.load(Vehicle);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    this.mp.destroy();
    yarp.dbm.remove(this);
  }
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
