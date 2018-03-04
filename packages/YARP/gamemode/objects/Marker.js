'use strict';
/**
 * @file Marker class
 */
import MarkerManager from '../managers/MarkerManager';
export default class Marker{
  constructor(type, position,range,offset,scale,color,viewDistance,direction,rotation,bounce,rotate,spin,stayOnTop,hidden,cb_in,cb_out){
    this._id = MarkerManager.getNewId();
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
    this.rotate = bounce || false;
    this.spin = bounce || false;
    this.stayOnTop = bounce || false;
    this.hidden = hidden || true;
    this.cb_in = cb_in;
    this.cb_out = cb_out;
  }

  save(){
    MarkerManager.save(this);
  }
}
