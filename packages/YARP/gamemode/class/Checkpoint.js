'use strict';
/**
 * @file Checkpoint class
 */
module.exports = class Checkpoint{
  constructor(id,type,position,radius,direction,color,dimension,hidden,cb){
    if ((typeof id) === 'object' || (id && type && position && radius) != null) {
      this._id = id._id || id;
      this._type = id._type || type;
      this._position = id._position || position;
      this._radius = id._radius || radius;
      this._direction = id._direction || direction;
      this._dimension = id._dimension || dimension || 0;
      this._hidden = id._hidden || hidden || false;
      this._cb = id._cb || cb || false;
      this.mp = mp.checkpoints.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        color: this._color,
        visible: !this._hidden,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Checkpoint);
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
