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
  constructor(
    id,
    model,
    position,
    owner = false,
    alpha = 255,
    rotation = [],
    dimension = 0,
    visible = true,
    range = 3,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ){
    super();
    if ((id && model && position) != null) {
      this._id = id;
      this._model = model;
      this._position = position;
      this._owner = owner;
      this._alpha = alpha;
      this._rotation = rotation;
      this._dimension = dimension;
      this._visible = visible;
      this._range = range;
      this._permissions = permissions;
      this._items = items;
      this._enter = enter.toString();
      this._leave = leave.toString();
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
        let nid = id + ' ' + (i + 1);
        if (!yarp.props[nid]) {
          new Prop(nid,prop.model,prop.positions[i],prop.owner,prop.alpha,prop.rotation,prop.dimension,prop.visible,prop.range,prop.enter,prop.leave,prop.permissions,prop.items)
        } else {
          yarp.props[nid].model = prop.model;
          yarp.props[nid].position = prop.positions[i];
          yarp.props[nid].owner = prop.owner;
          yarp.props[nid].alpha = prop.alpha;
          yarp.props[nid].rotation = prop.rotation;
          yarp.props[nid].dimension = prop.dimension;
          yarp.props[nid].visible = prop.visible;
          yarp.props[nid].range = prop.range;
          yarp.props[nid].permissions = prop.permissions;
          yarp.props[nid].items = prop.items;
          yarp.props[nid].enter = prop.enter.toString();
          yarp.props[nid].leave = prop.leave.toString();
          if (!yarp.props[nid].visible) yarp.props[nid].alpha = 0;
        }
      }
    }
  }
}

module.exports = Prop;
