'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker{
  constructor(id,type, position,range,offset,scale,color,viewDistance,direction,rotation,bounce,rotate,spin,stayOnTop,hidden,cb_in,cb_out){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.type = id.type;
      this.position = id.position;
      this.range = id.range;
      this.offset = id.offset;
      this.scale = id.scale;
      this.color = id.color;
      this.viewDistance = id.viewDistance;
      this.direction = id.direction;
      this.rotation = id.rotation;
      this.bounce = id.bounce;
      this.rotate = id.rotate;
      this.spin = id.spin;
      this.stayOnTop = id.stayOnTop;
      this.hidden = id.hidden;
      this.cb_in = id.cb_in;
      this.cb_out = id.cb_out;
    } else if ((id && type && position && range && offset && scale && color && viewDistance && direction && rotation && bounce && rotate && spin && stayOnTop && hidden && cb_in && cb_out) != null){
      this._id = id;
      this.type = type || 1;
      this.position = position;
      this.range = range || 3;
      this.offset = offset || {"x": 0, "y": 0, "z": -1},
      this.scale = scale || {"x": 1, "y": 1, "z": 0.5},
      this.color = color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this.viewDistance = viewDistance || 50,
      this.direction = direction || {"x": 0, "y": 0, "z": 0};
      this.rotation = rotation || {"x": 0, "y": 0, "z": 0};
      this.bounce = bounce || false;
      this.rotate = rotate || false;
      this.spin = spin || false;
      this.stayOnTop = stayOnTop || false;
      this.hidden = hidden || true;
      this.cb_in = cb_in;
      this.cb_out = cb_out;
    }
  }

  save(){
    yarp.Manager.save(this);
  }
}
