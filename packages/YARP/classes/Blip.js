'use strict';
/**
 * Implements a Blip.
 * @class yarp.Blip
 * @extends yarp.Object
 */
class Blip extends yarp.Object {
  /**
   * Creates an instance of Blip.
   * @param {Object} params
   * @param {String} params.id
   * @param {Vector3} params.position
   * @param {String} [params.name='Blip']
   * @param {Number} [params.sprite=1]
   * @param {Number} [params.scale=1]
   * @param {Number} [params.color=4]
   * @param {Number} [params.alpha=255]
   * @param {Number} [params.drawDistance=100]
   * @param {Boolean} [params.fade=true]
   * @param {Vector3} [params.rotation=new mp.Vector3(0, 0, 0)]
   * @param {Number} [params.dimension=0]
   * @memberof yarp.Blip
   */
  constructor(params) {
    super();
    if ((params.id && params.position) != null) {
      this._id = params.id;
      this._position = params.position;
      this._name = this.default(params.name, params.id);
      this._sprite = this.default(params.sprite, 1);
      this._scale = this.default(params.scale, 1);
      this._color = this.default(params.color, 4);
      this._alpha = this.default(params.alpha, 255);
      this._drawDistance = this.default(params.drawDistance, 100);
      this._fade = this.default(params.fade, true);
      this._rotation = this.default(params.rotation, new mp.Vector3(0, 0, 0));
      this._dimension = this.default(params.dimension, 0);
      this._visible = this.default(params.visible, true);
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
    } else {
      throw new TypeError('Blip class requires id and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Blip;
