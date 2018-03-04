'use strict';
/**
 * @file Npc class
 */
import NpcManager from '../managers/NpcManager';
export default class Npc{
  constructor(model,position,offset,heading,despawn,viewDistance,hidden,cb){
    this._id = NpcManager.getNewId();
    this.model = model || "a_c_westy";
    this.position = position;
    this.offset = offset || {"x": 0, "y": 0, "z": 0},
    this.heading = heading || 0,
    this.viewDistance = viewDistance || 100,
    this.hidden = hidden || true;
    this.cb = cb;
  }

  save(){
    NpcManager.save(this);
  }
}
