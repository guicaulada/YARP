'use strict';
/**
* @file Label class
*/
module.exports = class Label extends yarp.gmo{
  constructor(id,position,text,color,drawDistance,font,los,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && position) != null){
      this._id = id._id || id;
      this._text = id._text || text || "";
      this._position = id._position || position;
      this._range = id._range || range || 3;
      this._color = id._color || color || [51, 204, 51, 255],
      this._drawDistance = id._drawDistance || drawDistance || 10,
      this._font = id._font || font || 2;
      this._los = id._los || los || true;
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : "() => {}");
      this._leave = id._leave || ((leave) ? leave.toString() : "() => {}");
      this._permissions = id._permissions || (((yarp.labels && yarp.labels[id]) != null) ?
        yarp.labels[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.labels[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.labels && yarp.labels[id]) != null) ?
        yarp.labels[id].items.concat(items.filter(function (item) {
          return yarp.labels[id].items.indexOf(item) < 0;
        })) : (items || []));
      this.players = [];
      if (!this._visible) this._color[4] = 0;
      this.mp = mp.labels.new(this._text, this._position,
      {
        los: this._los,
        font: this._font,
        drawDistance: this._drawDistance,
        color: this._color,
        dimension: this._dimension
      });
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let labels = require(file);
    for (let id in labels){
      let label = labels[id];
      for (let i=0; i < label.positions.length; i++){
        new yarp.Label(id+" "+(i+1),label.positions[i],label.text,label.color,label.drawDistance,label.font,label.los,label.dimension,label.visible,label.range,label.enter,label.leave,label.permissions,label.items)
      }
    }
  }
}
