'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker{
  constructor(_id,type, position,range,offset,scale,color,viewDistance,direction,rotation,bounce,rotate,spin,stayOnTop,hidden,cb_in,cb_out){
    if ((typeof _id) === 'object' || (_id && type && position && range && offset && scale && color && viewDistance && direction && rotation && bounce && rotate && spin && stayOnTop && hidden && cb_in && cb_out) != null){
      this._id = _id._id || _id;
      this.type = _id.type || type || 1;
      this.position = _id.position || position;
      this.range = _id.range || range || 3;
      this.offset = _id.offset || offset || {"x": 0, "y": 0, "z": -1},
      this.scale = _id.scale || scale || {"x": 1, "y": 1, "z": 0.5},
      this.color = _id.color || color || {"r": 51, "g": 204, "b": 51, "a": 255},
      this.viewDistance = _id.viewDistance || viewDistance || 50,
      this.direction = _id.direction || direction || {"x": 0, "y": 0, "z": 0};
      this.rotation = _id.rotation || rotation || {"x": 0, "y": 0, "z": 0};
      this.bounce = _id.bounce || bounce || false;
      this.rotate = _id.rotate || rotate || false;
      this.spin = _id.spin || spin || false;
      this.stayOnTop = _id.stayOnTop || stayOnTop || false;
      this.hidden = _id.hidden || hidden || true;
      this.cb_in = _id.cb_in || cb_in;
      this.cb_out = _id.cb_out || cb_out;
    }
  }

  static load(){
    return yarp.mng.load(Marker);
  }
  save(){
    yarp.mng.save(this);
  }
}
