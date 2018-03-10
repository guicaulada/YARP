'use strict';
/**
 * @file Blip class
 */
module.exports = class Blip{
  constructor(_id,name,position,sprite,scale,color,alpha,viewDistance,fade,rotation,dimension,hidden){
    if ((typeof _id) === 'object' || (_id && name && position && sprite && scale && color && alpha && viewDistance && fade && rotation && dimension && hidden) != null) {
      this._id = _id._id || _id;
      this.name = _id.name || name;
      this.position = _id.position || position;
      this.sprite = _id.sprite || sprite;
      this.scale = _id.scale || scale;
      this.color = _id.color || color;
      this.alpha = _id.alpha || alpha;
      this.viewDistance = _id.viewDistance || viewDistance;
      this.fade = _id.fade || fade;
      this.rotation = _id.rotation || rotation;
      this.dimension = _id.dimension || dimension;
      this.hidden = _id.hidden || hidden;
    }
  }

  static load(){
    return yarp.mng.load(Blip);
  }
  save(){
    yarp.mng.save(this);
  }
}
