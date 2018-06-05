'use strict';
/**
 * Creates a Colshape.
 * @namespace yarp.Colshape
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Colshape id.
 * @param {Vector3} position - Colshape position.
 * @param {number} [type=0] - Colshape type.
 * @param {number} [width=10] - Colshape width.
 * @param {number} [height=10] - Colshape height.
 * @param {number} [depth=10] - Colshape depth.
 * @param {function} [enter=() => {}] - Colshape enter function.
 * @param {function} [leave=() => {}] - Colshape leave function.
 * @param {Array<string>} [permissions=[]] - Colshape permissions.
 * @param {Array<string>} [items=[]] - Colshape items.
 */

class Colshape extends yarp.GMObject{
  constructor(
    id,
    position,
    type = 1,
    width = 10,
    height = 10,
    depth = 10,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ){
    super();
    if ((id && position) != null) {
      this._id = id;
      this._type = type;
      this._position = position;
      this._width = width;
      this._depth = depth;
      this._height = height;
      this._visible = visible;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this._permissions = permissions;
      this._items = items;
      switch(this._type){
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
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Colshape
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Colshape(obj._id,obj._position,obj._type,obj._width,obj._height,obj._depth,obj._enter,obj._leave,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Colshape
   * @param {string} file - Config file path.
   */
  static config(file){
    let colshapes = require(file);
    for (let id in colshapes){
      let colshape = colshapes[id];
      for (let i=0; i < colshape.positions.length; i++){
        let nid = id +' ' + (i + 1);
        if (!yarp.colshapes[nid]){
          new Colshape(nid,colshape.positions[i],colshape.type,colshape.width,colshape.height,colshape.color,colshape.depth,colshape.enter,colshape.leave,colshape.permissions,colshape.items)
        } else {
          yarp.colshapes[nid].type = colshape.type;
          yarp.colshapes[nid].position = colshape.positions[i];
          yarp.colshapes[nid].width = colshape.width;
          yarp.colshapes[nid].depth = colshape.depth;
          yarp.colshapes[nid].height = colshape.height;
          yarp.colshapes[nid].visible = colshape.visible;
          yarp.colshapes[nid].enter = colshape.enter.toString();
          yarp.colshapes[nid].leave = colshape.leave.toString();
          yarp.colshapes[nid].permissions = colshape.permissions;
          yarp.colshapes[nid].items = colshape.items;
        }
      }
    }
  }
}

module.exports = Colshape;
