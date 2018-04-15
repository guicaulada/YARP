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
  constructor(id,position,type,width,height,depth,enter,leave,permissions,items){
    super();
    if ((id && position) != null) {
      this._id = id;
      this._type = type || 0;
      this._position = position;
      this._width = width || 10;
      this._depth = depth || 10;
      this._height = height || 10;
      this._visible = visible || true;
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this._permissions = ((permissions) ? (((yarp.colshapes && yarp.colshapes[id]) != null) ?
        yarp.colshapes[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.colshapes[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.colshapes && yarp.colshapes[id]) != null) ?
        yarp.colshapes[id].items.concat(items.filter(function (item) {
          return yarp.colshapes[id].items.indexOf(item) < 0;
        })) : items) : []);
      switch(this._type){
        case 1:
          this.mp = mp.colshapes.newRectangle(this._position.x, this._position.y, this._width, this._height);
          break;
        case 2:
          this.mp = mp.colshapes.newCuboid(this._position.x, this._position.y, this._position.z, this._width, this._depth, this._height);
          break;
        case 3:
          this.mp = mp.colshapes.newSphere(this._position.x, this._position.y, this._position.z, this._width);
          break;
        default:
          this.mp = mp.colshapes.newCircle(this._position.x, this._position.y, this._width);
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
        new Colshape(id+' '+(i+1),colshape.positions[i],colshape.type,colshape.width,colshape.height,colshape.color,colshape.depth,colshape.enter,colshape.leave,colshape.permissions,colshape.items)
      }
    }
  }
}

module.exports = Colshape;
