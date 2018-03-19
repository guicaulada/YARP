'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker{
  constructor(id,position,type,radius,color,direction,rotation,visible,range,enter,leave){
    if ((typeof id) === 'object' || (id && position) != null){
      this._id = id._id || id;
      this._type = id._type || type || 1;
      this._position = id._position || yarp.utils.Vector3Offset(position,new mp.Vector3(0,0,-1));
      this._range = id._range || range || 3;
      this._radius = id._radius || radius || 1,
      this._color = id._color || color || [255,255,0,255],
      this._direction = id._direction || direction || new mp.Vector3(0, 0, 0);
      this._rotation = id._rotation || rotation || new mp.Vector3(0, 0, 0);
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : false);
      this._leave = id._leave || ((leave) ? leave.toString() : false);
      this.players = [];
      this.mp = mp.markers.new(this._type, this._position, this._radius,
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

  static config(file){
    let markers = require(file);
    for (let id in markers){
      let marker = markers[id];
      for (let i=0; i < marker.positions.length; i++){
        new yarp.Marker(id+" "+(i+1),marker.positions[i],marker.type,marker.radius,marker.color,marker.direction,marker.rotation,marker.visible,marker.range,marker.enter,marker.leave)
      }
    }
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
