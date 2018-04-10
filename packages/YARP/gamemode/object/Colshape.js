'use strict';
/**
 * @file Colshape class
 */
 
module.exports = class Colshape extends yarp.gmo{
  constructor(id,position,type,width,height,depth,enter,leave,permissions,items){
    super();
    if ((typeof id) === 'object' || (id && position) != null) {
      this._id = id._id || id;
      this._type = id._type || type || 0;
      this._position = id._position || position;
      this._width = id._width || width || 10;
      this._depth = id._depth || depth || 10;
      this._height = id._height || height || 10;
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : '() => {}');
      this._leave = id._leave || ((leave) ? leave.toString() : '() => {}');
      this._permissions = id._permissions || (((yarp.doors && yarp.doors[id]) != null) ?
        yarp.doors[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.doors[id].permissions.indexOf(permission) < 0;
        })) : (permissions || []));
      this._items = id._items || (((yarp.doors && yarp.doors[id]) != null) ?
        yarp.doors[id].items.concat(items.filter(function (item) {
          return yarp.doors[id].items.indexOf(item) < 0;
        })) : (items || []));
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
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let colshapes = require(file);
    for (let id in colshapes){
      let colshape = colshapes[id];
      for (let i=0; i < colshape.positions.length; i++){
        new yarp.Colshape(id+' '+(i+1),colshape.positions[i],colshape.type,colshape.width,colshape.height,colshape.color,colshape.depth,colshape.enter,colshape.leave,colshape.permissions,colshape.items)
      }
    }
  }
}
