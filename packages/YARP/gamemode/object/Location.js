'use strict';
/**
 * @file Variable class
 */
module.exports = class Location extends yarp.gmo{
  constructor(id,inventory,owner,money,price){
    super();
    if ((typeof id) === 'object' || (id) != null){
      this._id = id._id || id;
      this._owner = id._owner || owner || null;
      this._money = id._money || money || 0;
      this._price = id._price || price || 0;
      this._inventory = id._inventory || inventory || {};
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  get sale(){
    let categories = {};
    for (let id in this.inventory){
      let item = yarp.items[id];
      let inventory_item = this.inventory[id];
      if (inventory_item.price) {
        if (!categories[item.category]){
          categories[item.category] = {}
        }
        categories[item.category][item.id] = item.data;
        categories[item.category][item.id].price = inventory_item.price;
        categories[item.category][item.id].amount = inventory_item.amount;
      }
    }
    return categories;
  }

  static config(file){
    let locations = require(file);
    for (let id in locations){
      let location = locations[id]
      if (!yarp.locations[id]){
        new yarp.Location(id,location.inventory,location.owner,location.money,location.price);
      }
    }
  }
}
