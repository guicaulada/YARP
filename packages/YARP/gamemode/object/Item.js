'use strict';
/**
 * @file Item class
 */

module.exports = class Item extends yarp.gmo{
  constructor(id,name,category,weight,spoil,model,options){
    super();
    if ((typeof id) === 'object' || (id && name) != null) {
      this._id = id._id || id;
      this._name = id._name || name;
      this._category = id._category || category || 'None';
      this._weight = id._weight || weight || 0.5;
      this._spoil = id._spoil || spoil || false;
      this._weight = id._weight || weight || 0.5;
      this._model = id._model || model || '';
      this._options = id._options || {};
      this.options = options;
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  get options() {
    let value = {};
    for (let id in this._options) {
      value[id] = eval(this._options[id]);
    }
    return value
  }

  set options(value) {
    for (let id in value) {
      this._options[id] = value[id].toString();
    }
  }

  isWeapon() {
    return this.id.includes('WEAPON_')
  }

  isAmmo() {
    return this.id.includes('AMMO_')
  }

  static config(file){
    let items = require(file);
    for (let category in items){
      for (let id in items[category]){
        let item = items[category][id];
        new yarp.Item(id,item.name,category,item.weight,item.spoil,item.model,item.options);
      }
    }
  }
}
