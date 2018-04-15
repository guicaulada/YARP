'use strict';
/**
 * Creates a Prop.
 * @namespace yarp.Prop
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Prop id.
 * @param {string} model - Prop model.
 * @param {Vector3} position - Prop position.
 * @param {string} [owner=null] - Prop owner.
 * @param {number} [alpha=255] - Prop alpha.
 * @param {Vector3} [rotation=new mp.Vector3(0,0,0)] - Prop rotation.
 * @param {number}  [dimension=0] - Prop dimension.
 * @param {boolean} [visible=true] - Prop visible.
 * @param {number} [range=3] - Prop range.
 * @param {function} [enter=() => {}] - Prop enter function.
 * @param {function} [leave=() => {}] - Prop leave function.
 * @param {Array<string>} [permissions=[]] - Prop permissions.
 * @param {Array<string>} [items=[]] - Prop items.
 */

class Prop extends yarp.GMObject{
  constructor(id,model,position,owner,alpha,rotation,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._owner = owner || null;
      this._alpha = alpha || 255;
      this._rotation = rotation || [];
      this._dimension = dimension || 0;
      this._visible = visible || true;
      this._range = range || 3;
      this._permissions = ((permissions) ? (((yarp.props && yarp.props[id]) != null) ?
        yarp.props[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.props[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.props && yarp.props[id]) != null) ?
        yarp.props[id].items.concat(items.filter(function (item) {
          return yarp.props[id].items.indexOf(item) < 0;
        })) : items) : []);
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      if (!this._visible) this._alpha = 0;
      this.players = [];
      this.mp = mp.objects.new(mp.joaat(this._model), this._position,
      {
        rotation: this._rotation,
        alpha: this._alpha,
        dimension: this._dimension
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Prop
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Prop(obj._id,obj._model,obj._position,obj._owner,obj._alpha,obj._rotation,obj._dimension,obj._visible,obj._range,obj._enter,obj._leave,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Prop
   * @param {string} file - Config file path.
   */
  static config(file){
    let props = require(file);
    for (let id in props){
      let prop = props[id];
      for (let i=0; i < prop.positions.length; i++){
        new Prop(id+' '+(i+1),prop.model,prop.positions[i],prop.owner,prop.alpha,prop.rotation,prop.dimension,prop.visible,prop.range,prop.enter,prop.leave,prop.permissions,prop.items)
      }
    }
  }
}

module.exports = Prop;
