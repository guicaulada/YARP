'use strict';
/**
 * Creates a Npc.
 * @namespace yarp.Npc
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Npc id.
 * @param {string} model - Npc model.
 * @param {Vector3} position - Npc position.
 * @param {number} [heading=0] - Npc type.
 * @param {number}  [drawDistance=100] - Npc dimension.
 * @param {boolean} [dimension=0] - Npc visible.
 * @param {function} [call=() => {}] - Npc call function.
 */

class Npc extends yarp.GMObject{
  constructor(
    id,
    model,
    position,
    heading = 0,
    drawDistance = 100,
    dimension = 0,
    call = () => {}
  ){
    super();
    if ((id && model && position) != null){
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

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Npc
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Npc(obj._id,obj._model,obj._position,obj._heading,obj._drawDistance,obj._visible,obj._call);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Npc
   * @param {string} file - Config file path.
   */
  static config(file){
    let npcs = require(file);
    for (let id in npcs){
      let npc = npcs[id];
      for (let i=0; i < npc.positions.length; i++){
        let nid = id + ' ' + (i + 1);
        if (!yarp.npcs[nid]) {
          new Npc(nid, npc.model, npc.positions[i], npc.heading, npc.drawDistance, npc.dimension, npc.call);
        } else {
          yarp.npcs[nid].model = npc.model;
          yarp.npcs[nid].position = npc.positions[i];
          yarp.npcs[nid].heading = npc.heading;
          yarp.npcs[nid].drawDistance = npc.drawDistance;
          yarp.npcs[nid].dimension = npc.dimension;
          yarp.npcs[nid].call = npc.call.toString();
        }
      }
    }
  }
}

module.exports = Npc;
