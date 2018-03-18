'use strict';
/**
 * @file Checkpoint class
 */
module.exports = class Checkpoint{
  constructor(id,position,type,radius,direction,color,dimension,visible,enter,leave){
    if ((typeof id) === 'object' || (id && position) != null) {
      this._id = id._id || id;
      this._type = id._type || type || 0;
      this._position = id._position || position;
      this._radius = id._radius || radius || 3;
      this._direction = id._direction || direction || new mp.Vector3(0,0,0);
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : false);
      this._leave = id._leave || ((leave) ? leave.toString() : false);
      this.mp = mp.checkpoints.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        color: this._color,
        visible: this._visible,
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
