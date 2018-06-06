'use strict';
/**
 * Creates a Blip.
 * @namespace yarp.Blip
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Blip id.
 * @param {Vector3} position - Blip position.
 * @param {string} [name='Blip'] - Blip name.
 * @param {number} [sprite=1] - Blip sprite.
 * @param {Float} [scale=1] - Blip scale.
 * @param {number} [color=4] - Blip color.
 * @param {number}  [alpha=255] - Blip alpha.
 * @param {Float} [drawDistance=100] - Blip draw distance.
 * @param {boolean} [fade=true] - Blip fade.
 * @param {Vector3} [rotation=new mp.Vector3(0,0,0)] - Blip rotation.
 * @param {number} [dimension=0] - Blip dimension.
 */

class Blip extends yarp.GMObject{
  constructor(
    id,
    position,
    name = 'Blip',
    sprite = 1,
    scale = 1,
    color = 4,
    alpha = 255,
    drawDistance = 100,
    fade = true,
    rotation = new mp.Vector3(0, 0, 0),
    dimension = 0,
    visible = true
  ){
    super();
    if ((id && position) != null) {
      this._id = id;
      this._name = name;
      this._sprite = sprite;
      this._position = position;
      this._scale = scale;
      this._color = color;
      this._alpha = alpha;
      this._drawDistance = drawDistance;
      this._fade = fade;
      this._rotation = rotation;
      this._dimension = dimension;
      this._visible = visible;
      if (!this._visible) this._alpha = 0;
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
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Blip
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Blip(obj._id,obj._position,obj._name,obj._sprite,obj._scale,obj._color,obj._alpha,obj._drawDistance,obj._fade,obj._rotation,obj._dimension,obj._visible);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Blip
   * @param {string} file - Config file path.
   */
  static config(file){
    let blips = require(file);
    for (let id in blips){
      let blip = blips[id];
      for (let i=0; i < blip.positions.length; i++){
        let nid = id + ' ' + (i + 1);
        if (!yarp.blips[nid]){
          new Blip(nid,blip.positions[i],id,blip.sprite,blip.scale,blip.color,blip.alpha,blip.drawDistance,blip.fade,blip.rotation,blip.dimension)
        }
      }
    }
  }
}

module.exports = Blip;
