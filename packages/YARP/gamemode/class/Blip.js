'use strict';
/**
 * @file Blip class
 */
module.exports = class Blip{
  constructor(name,position,sprite,scale,color,alpha,viewDistance,fade,rotation,dimension,hidden){
    if (name && position && sprite && scale && color && alpha && viewDistance && fade && rotation && dimension && hidden) {
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
      this.hidden = hidden || true;
    }
  }
}
