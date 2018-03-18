'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker{
  constructor(id,type, position,range,offset,scale,color,viewDistance,direction,rotation,bounce,rotate,spin,stayOnTop,hidden,cb_in,cb_out){
    if ((typeof id) === 'object' || (id && type && position && range && offset && scale && color && viewDistance && direction && rotation && bounce && rotate && spin && stayOnTop && hidden && cb_in && cb_out) != null){
      this._id = id._id || id;
      this._type = id._type || type || 1;
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._offset = id._offset || offset || {"x": 0, "y": 0, "z": -1},
      this._scale = id._scale || scale || {"x": 1, "y": 1, "z": 0.5},
      this._color = id._color || color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this._viewDistance = id._viewDistance || viewDistance || 50,
      this._direction = id._direction || direction || {"x": 0, "y": 0, "z": 0};
      this._rotation = id._rotation || rotation || {"x": 0, "y": 0, "z": 0};
      this._bounce = id._bounce || bounce || false;
      this._rotate = id._rotate || rotate || false;
      this._spin = id._spin || spin || false;
      this._stayOnTop = id._stayOnTop || stayOnTop || false;
      this._hidden = id._hidden || hidden || true;
      this._cb_in = id._cb_in || cb_in.toString();
      this._cb_out = id._cb_out || cb_out.toString();
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
