'use strict';
/**
 * Implements a Npc.
 * @class yarp.Npc
 * @extends yarp.GMObject
 */
class Npc extends yarp.GMObject {
  /**
   *Creates an instance of Npc.
   * @param {*} id
   * @param {*} model
   * @param {*} position
   * @param {number} [heading=0]
   * @param {number} [drawDistance=100]
   * @param {number} [dimension=0]
   * @param {*} [call=() => {}]
   * @memberof yarp.Npc
   */
  constructor(
    id,
    model,
    position,
    heading = 0,
    drawDistance = 100,
    dimension = 0,
    call = () => {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        model: model,
        position: position,
        heading: heading,
        drawDistance: drawDistance,
        dimension: dimension,
        call: call,
      } = id;
      return new yarp.Npc(nid, model, position, heading, drawDistance, dimension, call);
    } else if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._heading = heading;
      this._drawDistance = drawDistance;
      this._dimension = dimension;
      this._call = call.toString();
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Npc;
