'use strict';
/**
 * Implements a Colshape.
 * @class yarp.Colshape
 * @extends yarp.Object
 */
class Colshape extends yarp.Object {
  /**
   * Creates an instance of Colshape.
   * @param {Object} params
   * @param {String} params.id
   * @param {Vector3} params.position
   * @param {Number} [params.type=1]
   * @param {Number} [params.width=10]
   * @param {Number} [params.height=10]
   * @param {Number} [params.depth=10]
   * @param {Function} [params.enter=() => {}]
   * @param {Function} [params.leave=() => {}]
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @memberof yarp.Colshape
   */
  constructor(params) {
    super();
    if ((params.id && params.position) != null) {
      this._id = params.id;
      this._position = params.position;
      this._type = this.default(params.type, 1);
      this._width = this.default(params.width, 10);
      this._depth = this.default(params.depth, 10);
      this._height = this.default(params.height, 10);
      this._enter = this.default(params.enter, () => {}).toString();
      this._leave = this.default(params.leave, () => {}).toString();
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      switch (this._type) {
        case 1:
          this.mp = mp.colshapes.newRectangle(this._position.x, this._position.y, this._width, this._height);
          break;
        case 2:
          this.mp = mp.colshapes.newCuboid(this._position.x, this._position.y, this._position.z, this._width, this._depth, this._height);
          break;
        case 3:
          this.mp = mp.colshapes.newCircle(this._position.x, this._position.y, this._width);
          break;
        default:
          this.mp = mp.colshapes.newSphere(this._position.x, this._position.y, this._position.z, this._width);
      }
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Colshape class requires id and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Colshape;
