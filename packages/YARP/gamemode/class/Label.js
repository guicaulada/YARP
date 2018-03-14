'use strict';
/**
 * @file Label class
 */
module.exports = class Label{
  constructor(_id,msg,position,range,key,offset,scale,color,viewDistance,font,outline,hidden,cb){
    if ((typeof _id) === 'object' || (_id && msg && position && range && key && offset && scale && color && viewDistance && font && outline && hidden && cb) != null){
      this._id = _id._id || _id;
      this.text = _id.text || text || "Press E to access";
      this.position = _id.position || position;
      this.range = _id.range || range || 3;
      this.key = _id.key || key || 69;
      this.offset = _id.offset || offset || {"x": 0, "y": 0, "z": 1},
      this.scale = _id.scale || scale || {"x": 1.0, "y": 1.0},
      this.color = _id.color || color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this.viewDistance = _id.drawDistance || drawDistance || 10,
      this.font = _id.font || font || 2;
      this.outline = _id.outline || outline || true;
      this.hidden = _id.hidden || hidden || true;
      this.cb = _id.cb || cb.toString();
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
}
