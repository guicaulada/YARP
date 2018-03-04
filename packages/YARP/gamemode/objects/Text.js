'use strict';
/**
 * @file Text class
 */
import TextManager from '../managers/TextManager';
export default class Text{
  constructor(msg,position,range,key,offset,scale,color,viewDistance,font,outline,hidden,cb){
    this._id = TextManager.getNewId();
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

  save(){
    TextManager.save(this);
  }
}
