'use strict';
/**
 * @file Text class
 */
module.exports = class Text{
  constructor(id,msg,position,range,key,offset,scale,color,viewDistance,font,outline,hidden,cb){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.msg = id.msg;
      this.position = id.position;
      this.range = id.range;
      this.key = id.key;
      this.offset = id.offset;
      this.scale = id.scale;
      this.color = id.color;
      this.viewDistance = id.viewDistance;
      this.font = id.font;
      this.outline = id.outline;
      this.hidden = id.hidden;
      this.cb = id.cb;
    } else if ((id && msg && position && range && key && offset && scale && color && viewDistance && font && outline && hidden && cb) != null){
      this._id = id;
      this.msg = msg || "Press E to access";
      this.position = position;
      this.range = range || 3;
      this.key = key || 69;
      this.offset = offset || {"x": 0, "y": 0, "z": 1},
      this.scale = scale || {"x": 1.0, "y": 1.0},
      this.color = color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this.viewDistance = viewDistance || 10,
      this.font = font || 2;
      this.outline = outline || true;
      this.hidden = hidden || true;
      this.cb = cb;
    }
  }

  static load(){
    return yarp.Manager.load(Text);
  }
  save(){
    yarp.Manager.save(this);
  }
}
