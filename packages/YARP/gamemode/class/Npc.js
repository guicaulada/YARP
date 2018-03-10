'use strict';
/**
 * @file Npc class
 */
module.exports = class Npc{
  constructor(_id,model,position,offset,heading,despawn,viewDistance,hidden,cb){
    if ((typeof _id) === 'object' || (_id && model && position && offset && heading && despawn && viewDistance && hidden && cb) != null){
      this._id = _id._id || _id;
      this.model = _id.model || model || "a_c_westy";
      this.position = _id.position || position;
      this.offset = _id.offset || offset || {"x": 0, "y": 0, "z": 0};
      this.heading = _id.heading || heading || 0;
      this.viewDistance = _id.viewDistance || viewDistance || 100;
      this.hidden = _id.hidden || hidden || true;
      this.cb = _id.cb || cb;
    }
  }

  static load(){
    return yarp.mng.load(Npc);
  }
  save(){
    yarp.mng.save(this);
  }
}
