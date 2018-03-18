'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker{
  constructor(id,position,type,range,scale,color,viewDistance,direction,rotation,visible,enter,leave){
    if ((typeof id) === 'object' || (id && position) != null){
      this._id = id._id || id;
      this._type = id._type || type || 1;
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._scale = id._scale || scale || new mp.Vector3(1, 1, 0.5),
      this._color = id._color || color || [255,255,0,255],
      this._viewDistance = id._viewDistance || viewDistance || 50,
      this._direction = id._direction || direction || new mp.Vector3(0, 0, 0);
      this._rotation = id._rotation || rotation || new mp.Vector3(0, 0, 0);
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : false);
      this._leave = id._leave || ((leave) ? leave.toString() : false);
      this.mp = mp.markers.new(this._type, this._position, this._scale,
      {
        direction: this._direction,
        rotation: this._rotation,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Marker);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
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
