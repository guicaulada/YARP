'use strict';
/**
 * @file Prop class
 */
module.exports = class Prop extends yarp.gmo{
  constructor(id,model,position,owner,alpha,rotation,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && model && position) != null) {
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._owner = id._owner || owner || false;
      this._alpha = id._alpha || alpha || 255;
      this._rotation = id._rotation || rotation || [];
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      this._range = id._range || range || 3;
      this._permissions = id._permissions || (((yarp.props && yarp.props[id]) != null) ?
        yarp.props[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.props[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.props && yarp.props[id]) != null) ?
        yarp.props[id].items.concat(items.filter(function (item) {
          return yarp.props[id].items.indexOf(item) < 0;
        })) : (items || []));
      this._enter = id._enter || ((enter) ? enter.toString() : "() => {}");
      this._leave = id._leave || ((leave) ? leave.toString() : "() => {}");
      if (!this._visible) this._alpha = 0;
      this.players = [];
      this.mp = mp.objects.new(mp.joaat(this._model), this._position,
      {
        rotation: this._rotation,
        alpha: this._alpha,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let props = require(file);
    for (let id in props){
      let prop = props[id];
      for (let i=0; i < prop.positions.length; i++){
        new yarp.Prop(id+" "+(i+1),prop.model,prop.positions[i],prop.owner,prop.alpha,prop.rotation,prop.dimension,prop.visible,prop.range,prop.enter,prop.leave,prop.permissions,prop.items)
      }
    }
  }
}
