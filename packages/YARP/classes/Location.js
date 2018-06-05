'use strict';
/**
 * Creates a Location.
 * @namespace yarp.Location
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Location id.
 * @param {object} [inventory={}] - Location inventory.
 * @param {string} [owner=null] - Location owner.
 * @param {number} [money=0] - Location radius.
 * @param {number} [price=0] - Location font.
 */

class Location extends yarp.GMObject{
  constructor(
    id,
    inventory = {},
    owner = false,
    money = 0,
    price = 0
  ){
    super();
    if ((id) != null){
      this._id = id;
      this._owner = owner;
      this._money = money;
      this._price = price ;
      this._inventory = inventory;
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Get items with price in inventory.
   * @function sale
   * @memberof yarp.Location
   * @param {object} categories - Items indexed by categories and id.
   * @instance
   */
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

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Location
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Location(obj._id,obj._inventory,obj._owner,obj._money,obj._price);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Location
   * @param {string} file - Config file path.
   */
  static config(file){
    let locations = require(file);
    for (let id in locations){
      let location = locations[id]
      if (!yarp.locations[id]){
        new Location(id,location.inventory,location.owner,location.money,location.price);
      } else {
        yarp.locations[id].owner = location.owner;
        yarp.locations[id].money = location.money;
        yarp.locations[id].price = location.price;
        yarp.locations[id].inventory = location.inventory;
      }
    }
  }
}

module.exports = Location;
