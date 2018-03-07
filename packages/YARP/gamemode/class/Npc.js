'use strict';
/**
 * @file Npc class
 */
module.exports = class Npc{
  constructor(id,model,position,offset,heading,despawn,viewDistance,hidden,cb){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.model = id.model;
      this.position = id.position;
      this.offset = id.offset;
      this.heading = id.heading;
      this.viewDistance = id.viewDistance;
      this.hidden = id.hidden;
      this.cb = id.cb;
    } else if((id && model && position && offset && heading && despawn && viewDistance && hidden && cb) != null){
      this._id = id;
      this.model = model || "a_c_westy";
      this.position = position;
      this.offset = offset || {"x": 0, "y": 0, "z": 0};
      this.heading = heading || 0;
      this.viewDistance = viewDistance || 100;
      this.hidden = hidden || true;
      this.cb = cb;
    }
  }

  static load(){
    return yarp.Manager.load(Npc);
  }
  save(){
    yarp.Manager.save(this);
  }
}
