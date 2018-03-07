'use strict';
/**
 * @file Blip class
 */
module.exports = class Blip{
  constructor(id,name,position,sprite,scale,color,alpha,viewDistance,fade,rotation,dimension,hidden){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.name = id.name;
      this.position = id.position;
      this.sprite = id.sprite;
      this.scale = id.scale;
      this.color = id.color;
      this.alpha = id.alpha;
      this.viewDistance = id.viewDistance;
      this.fade = id.fade;
      this.rotation = id.rotation;
      this.dimension = id.dimension;
      this.hidden = id.hidden;
    } else if ((id && name && position && sprite && scale && color && alpha && viewDistance && fade && rotation && dimension && hidden) != null) {
      this._id = id;
      this.name = name;
      this.position = position;
      this.sprite = sprite;
      this.scale = scale;
      this.color = color;
      this.alpha = alpha;
      this.viewDistance = viewDistance;
      this.fade = fade;
      this.rotation = rotation;
      this.dimension = dimension;
      this.hidden = hidden;
    }
  }

  static load(){
    return yarp.Manager.load(Blip);
  }
  save(){
    yarp.Manager.save(this);
  }
}
