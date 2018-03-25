'use strict';
/**
 * @file Colshape class
 */
module.exports = class Colshape{
  constructor(id,position,type,width,height,depth,enter,leave){
    if ((typeof id) === 'object' || (id && position) != null) {
      this._id = id._id || id;
      this._type = id._type || type || 0;
      this._position = id._position || position;
      this._width = id._width || width || 10;
      this._depth = id._depth || depth || 10;
      this._height = id._height || height || 10;
      this._visible = id._visible || visible || true;
      this._enter = id._enter || ((enter) ? enter.toString() : null);
      this._leave = id._leave || ((leave) ? leave.toString() : null);
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
        new yarp.Colshape(id+" "+(i+1),colshape.positions[i],colshape.type,colshape.width,colshape.height,colshape.color,colshape.depth,colshape.enter,colshape.leave)
      }
    }
  }

  save(){
    yarp.dbm.save(this);
  }

  remove(){
    this.mp.destroy();
    yarp.dbm.remove(this);
  }

  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
