'use strict';
/**
 * Implements a Label.
 * @class yarp.Label
 * @extends yarp.GMObject
 */
class Label extends yarp.GMObject {
  /**
   *Creates an instance of Label.
   * @param {Object} params
   * @param {String} params.id
   * @param {Vector3} params.position
   * @param {String} [params.text='']
   * @param {*} [params.color=[51, 204, 51, 255]]
   * @param {Number} [params.drawDistance=10]
   * @param {Number} [params.font=2]
   * @param {Boolean} [params.los=true]
   * @param {Number} [params.dimension=0]
   * @param {Boolean} [params.visible=true]
   * @param {Number} [params.range=3]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof yarp.Label
   */
  constructor(params) {
    super();
    if ((params.id && params.position) != null) {
      this._id = params.id;
      this._position = params.position;
      this._text = this.default(params.text, '');
      this._range = this.default(params.range, 3);
      this._color = this.default(params.color, [51, 204, 51, 255]);
      this._drawDistance = this.default(params.drawDistance, 10);
      this._font = this.default(params.font, 2);
      this._los = this.default(params.los, true);
      this._dimension = this.default(params.dimension, 0);
      this._visible = this.default(params.visible, true);
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      this.players = [];
      if (!this._visible) this._color[4] = 0;
      this.mp = mp.labels.new(this._text, this._position,
      {
        los: this._los,
        font: this._font,
        drawDistance: this._drawDistance,
        color: this._color,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Label class requires id and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Label;
