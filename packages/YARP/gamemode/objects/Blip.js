'use strict';
/**
 * @file Blip class
 */
import BlipManager from '../managers/BlipManager';
export default class Blip{
  constructor(name,position,sprite,scale,color,alpha,viewDistance,fade,rotation,dimension,hidden){
    this._id = BlipManager.getNewId();
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

  save(){
    BlipManager.save(this);
  }
}
