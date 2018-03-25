'use strict';
/**
 * @file Blip class
 */
module.exports = class Blip{
  constructor(id,position,name,sprite,scale,color,alpha,drawDistance,fade,rotation,dimension,visible){
    if ((typeof id) === 'object' || (id && position) != null) {
      this._id = id._id || id;
      this._name = id._name || name || "Blip";
      this._sprite = id._sprite || sprite || 1;
      this._position = id._position || position;
      this._scale = id._scale || scale || 1;
      this._color = id._color || color || 4;
      this._alpha = id._alpha || alpha || 255;
      this._drawDistance = id._drawDistance || drawDistance || 100;
      this._fade = id._fade || fade || true;
      this._rotation = id._rotation || rotation || 0;
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      if (!this._visible) this._aplha = 0;
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

  static config(file){
    let blips = require(file);
    for (let id in blips){
      let blip = blips[id];
      for (let i=0; i < blip.positions.length; i++){
        new yarp.Blip(id+" "+(i+1),blip.positions[i],id,blip.sprite,blip.scale,blip.color,blip.alpha,blip.drawDistance,blip.fade,blip.rotation,blip.dimension,blip.visible)
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
