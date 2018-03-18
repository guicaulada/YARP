'use strict';
/**
 * @file Item class
 */
module.exports = class Item{
  constructor(id,name,category,weight,model,call){
    if ((typeof id) === 'object' || (id && name && category && weight && model && cb) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category;
      this._weight = id._weight || weight;
      this._model = id._model || model;
      this._call = id._call || ((call) ? call.toString() : false);
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Item);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
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
