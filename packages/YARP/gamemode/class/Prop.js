'use strict';
/**
 * @file Prop class
 */
module.exports = class Prop{
  constructor(id,model,position,owner,alpha,rotation,dimension,visible){
    if ((typeof id) === 'object' || (id && model && position) != null) {
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._owner = id._owner || owner || false;
      this._alpha = id._alpha || alpha || 255;
      this._rotation = id._rotation || rotation || [];
      this._dimension = id._dimension || dimension || 0;
      this._visible = id._visible || visible || false;
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
        new yarp.Prop(id+" "+(i+1),prop.model,prop.positions[i],prop.owner,prop.alpha,prop.rotation,prop.dimension,prop.visible)
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
