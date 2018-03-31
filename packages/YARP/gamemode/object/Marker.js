'use strict';
/**
 * @file Marker class
 */
module.exports = class Marker extends yarp.gmo{
  constructor(id,position,type,radius,color,direction,rotation,visible,range,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && position) != null){
      this._id = id._id || id;
      this._type = id._type || type || 1;
      this._position = id._position || yarp.utils.Vector3Offset(position,new mp.Vector3(0,0,-1));
      this._range = id._range || range || 3;
      this._radius = id._radius || radius || 1,
      this._color = id._color || color || [255,255,0,255],
      this._direction = id._direction || direction || new mp.Vector3(0, 0, 0);
      this._rotation = id._rotation || rotation || new mp.Vector3(0, 0, 0);
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : "() => {}");
      this._leave = id._leave || ((leave) ? leave.toString() : "() => {}");
      this._permissions = id._permissions || (((yarp.markers && yarp.markers[id]) != null) ?
        yarp.markers[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.markers[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.markers && yarp.markers[id]) != null) ?
        yarp.markers[id].items.concat(items.filter(function (item) {
          return yarp.markers[id].items.indexOf(item) < 0;
        })) : (items || []));
      this.players = [];
      if (!this._visible) this._color[4] = 0;
      this.mp = mp.markers.new(this._type, this._position, this._radius,
      {
        direction: this._direction,
        rotation: this._rotation,
        color: this._color,
        visible: this._visible,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let markers = require(file);
    for (let id in markers){
      let marker = markers[id];
      for (let i=0; i < marker.positions.length; i++){
        new yarp.Marker(id+" "+(i+1),marker.positions[i],marker.type,marker.radius,marker.color,marker.direction,marker.rotation,marker.visible,marker.range,marker.enter,marker.leave,marker.permissions,marker.items)
      }
    }
  }
}
