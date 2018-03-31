'use strict';
/**
 * @file Item class
 */
module.exports = class Item extends yarp.gmo{
  constructor(id,name,category,weight,price,spoil,model,call){
    super();
    if ((typeof id) === 'object' || (id && name) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category || 'None';
      this._weight = id._weight || weight || 0.5;
      this._spoil = id._spoil || spoil || false;
      this._weight = id._weight || weight || 0.5;
      this._model = id._model || model || '';
      this._call = id._call || ((call) ? call.toString() : '() => {}');
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static config(file){
    let items = require(file);
    for (let category in items){
      for (let id in items[category]){
        let item = items[category][id];
        new yarp.Item(id,item.name,category,item.weight,item.price,item.spoil,item.model,item.call);
      }
    }
  }
}
