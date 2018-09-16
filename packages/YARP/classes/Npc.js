'use strict';
/**
 * Implements a Npc.
 * @class yarp.Npc
 * @extends yarp.GMObject
 */
class Npc extends yarp.GMObject {
  /**
   *Creates an instance of Npc.
   * @param {Object} params
   * @param {String} params.id
   * @param {*} params.model
   * @param {Vector3} params.position
   * @param {Number} [params.heading=0]
   * @param {Number} [params.drawDistance=100]
   * @param {Number} [params.dimension=0]
   * @param {*} [params.call=() => {}]
   * @memberof yarp.Npc
   */
  constructor(params) {
    super();
    if ((params.id && params.model && params.position) != null) {
      this._id = params.id;
      this._model = params.model;
      this._position = params.position;
      this._heading = this.default(params.heading, 0);
      this._drawDistance = this.default(params.drawDistance, 100);
      this._dimension = this.default(params.dimension, 0);
      this._call = this.default(params.call, () => {}).toString();
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Npc class requires id, model and position to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Npc;
