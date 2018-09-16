'use strict';
/**
 * Implements a Marker.
 * @class yarp.Marker
 * @extends yarp.GMObject
 */
class Marker extends yarp.GMObject {
  /**
   * Creates an instance of Marker.
   * @param {Object} params
   * @param {String} params.id
   * @param {Vector3} params.position
   * @param {Number} [params.type=1]
   * @param {Number} [params.radius=1]
   * @param {Array<Number>} [params.color=[255, 255, 0, 255]]
   * @param {Vector3} [params.direction=new mp.Vector3(0, 0, 0)]
   * @param {Vector3} [params.rotation=new mp.Vector3(0, 0, 0)]
   * @param {Boolean} [params.visible=true]
   * @param {Number} [params.dimension=0]
   * @param {Number} [params.range=3]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof yarp.Marker
   */
  constructor(params) {
    super();
    if ((params.id && params.position) != null) {
      this._id = params.id;
      this._position = yarp.utils.vectorOffset(params.position, new mp.Vector3(0, 0, -1));
      this._type = this.default(params.type, 1);
      this._range = this.default(params.range, 3);
      this._radius = this.default(params.radius, 1);
      this._color = this.default(params.color, [255, 255, 0, 255]);
      this._direction = this.default(params.direction, new mp.Vector3(0, 0, 0));
      this._rotation = this.default(params.rotation, new mp.Vector3(0, 0, 0));
      this._visible = this.default(params.visible, true);
      this._dimension = this.default(params.dimension, 0);
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      if (!this._visible) this._color[4] = 0;
      this.players = [];
      this.mp = mp.markers.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        rotation: this._rotation,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Marker class requires id and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Marker;
