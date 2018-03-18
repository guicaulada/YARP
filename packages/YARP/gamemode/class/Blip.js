'use strict';
/**
 * @file Blip class
 */
module.exports = class Blip{
  constructor(id,name,sprite,position,scale,color,alpha,viewDistance,fade,rotation,dimension,hidden){
    if ((typeof id) === 'object' || (id && name && sprite && position) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._sprite = id._sprite || sprite;
      this._position = id._position || position;
      this._scale = id._scale || scale || 1;
      this._color = id._color || color || 4;
      this._alpha = id._alpha || alpha || 255;
      this._viewDistance = id._viewDistance || viewDistance || 100;
      this._fade = id._fade || fade || true;
      this._rotation = id._rotation || rotation || 0;
      this._dimension = id._dimension || dimension || 0;
      this._hidden = id._hidden || hidden || false;
      this.mp = mp.blips.new(this._sprite, this._position,
      {
        name: this._name,
        scale: this._scale,
        color: this._color,
        alpha: this._alpha,
        drawDistance: this._drawDistance,
        shortRange: this._fade,
        rotation: this._rotation,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }
  static load(){
    return yarp.dbm.load(Blip);
  }
  static config(file){
    let blips = require(file);
    for (let id in blips){
      let blip = blips[id];
      for (let i=0; i < blip.positions.length; i++){
        new yarp.Blip(id+" "+i,id,blip.sprite,blip.positions[i],blip.scale,blip.color,blip.alpha,blip.viewDistance,blip.fade,blip.rotation,blip.dimension,blip.hidden)
      }
    }
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    this.mp.destroy();
    yarp.dbm.remove(this);
  }
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
