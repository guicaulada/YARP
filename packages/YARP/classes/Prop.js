'use strict';
/**
 * Implements a Prop.
 * @class Prop
 */
class Prop extends yarp.Object {
  /**
   * Creates an instance of Prop.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.model
   * @param {Vector3} params.position
   * @param {Boolean} [params.owner=false]
   * @param {Number} [params.alpha=255]
   * @param {Array<Number>} [params.rotation=[]]
   * @param {Number} [params.dimension=0]
   * @param {Boolean} [params.visible=true]
   * @param {Number} [params.range=3]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof Prop
   */
  constructor(params) {
    super();
    if ((params.id && params.model && params.position) != null) {
      this._id = params.id;
      this._model = params.model;
      this._position = params.position;
      this._owner = this.default(params.owner, false);
      this._alpha = this.default(params.alpha, 255);
      this._rotation = this.default(params.rotation, []);
      this._dimension = this.default(params.dimension, 0);
      this._visible = this.default(params.visible, true);
      this._range = this.default(params.range, 3);
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      if (!this._visible) this._alpha = 0;
      this.players = [];
      this.mp = mp.objects.new(mp.joaat(this._model), this._position,
      {
        rotation: this._rotation,
        alpha: this._alpha,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Prop class requires id, model and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Prop;
