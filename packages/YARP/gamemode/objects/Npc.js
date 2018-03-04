'use strict';
/**
 * @file Npc class
 */
module.exports = class Npc{
  constructor(id,model,position,offset,heading,despawn,viewDistance,hidden,cb){
    this._id = id;
    this.model = model || "a_c_westy";
    this.position = position;
    this.offset = offset || {"x": 0, "y": 0, "z": 0},
    this.heading = heading || 0,
    this.viewDistance = viewDistance || 100,
    this.hidden = hidden || true;
    this.cb = cb;
  }
}
