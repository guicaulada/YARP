'use strict';
/**
 * Implements a Blip.
 * @class yarp.Blip
 * @extends yarp.GMObject
 */
class Blip extends yarp.GMObject {
  /**
   *Creates an instance of Blip.
   * @param {*} id
   * @param {*} position
   * @param {string} [name='Blip']
   * @param {number} [sprite=1]
   * @param {number} [scale=1]
   * @param {number} [color=4]
   * @param {number} [alpha=255]
   * @param {number} [drawDistance=100]
   * @param {boolean} [fade=true]
   * @param {*} [rotation=new mp.Vector3(0, 0, 0)]
   * @param {number} [dimension=0]
   * @param {boolean} [visible=true]
   * @memberof yarp.Blip
   */
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
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        position: position,
        name: name,
        sprite: sprite,
        scale: scale,
        color: color,
        alpha: alpha,
        drawDistance: drawDistance,
        fade: fade,
        rotation: rotation,
        dimension: dimension,
        visible: visible,
      } = id;
      return new yarp.Blip(nid, position, name, sprite, scale, color, alpha, drawDistance, fade, rotation, dimension, visible);
    } else if ((id && position) != null) {
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
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Blip;
