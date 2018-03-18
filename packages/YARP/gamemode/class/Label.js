'use strict';
/**
 * @file Label class
 */
module.exports = class Label{
  constructor(id,msg,position,range,key,offset,scale,color,viewDistance,font,outline,hidden,cb){
    if ((typeof id) === 'object' || (id && msg && position && range && key && offset && scale && color && viewDistance && font && outline && hidden && cb) != null){
      this._id = id._id || id;
      this._text = id._text || text || "Press E to access";
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._key = id._key || key || 69;
      this._offset = id._offset || offset || {"x": 0, "y": 0, "z": 1},
      this._scale = id._scale || scale || {"x": 1.0, "y": 1.0},
      this._color = id._color || color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this._viewDistance = id._drawDistance || drawDistance || 10,
      this._font = id._font || font || 2;
      this._outline = id._outline || outline || true;
      this._hidden = id._hidden || hidden || true;
      this._cb = id._cb || cb.toString();
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Label);
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
