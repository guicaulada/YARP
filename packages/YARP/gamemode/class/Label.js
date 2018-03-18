'use strict';
/**
 * @file Label class
 */
module.exports = class Label{
  constructor(id,position,text,range,key,color,viewDistance,font,los,dimension,visible,call){
    if ((typeof id) === 'object' || (id && position) != null){
      this._id = id._id || id;
      this._text = id._text || text || "Press E to access";
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._key = id._key || key || 69;
      this._color = id._color || color || [51, 204, 51, 255],
      this._viewDistance = id._drawDistance || drawDistance || 10,
      this._font = id._font || font || 2;
      this._los = id._los || los || true;
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      this._call = id._call || ((call) ? call.toString() : false);
      this.mp = mp.labels.new(this._text, this._position,
      {
        los: this._los,
        font: this._font,
        drawDistance: this._drawDistance,
        color: this._color,
        dimension: this._dimension
      });
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
