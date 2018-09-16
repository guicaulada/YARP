'use strict';
/**
 * Implements a Location.
 * @class yarp.Location
 * @extends yarp.GMObject
 */
class Location extends yarp.GMObject {
  /**
   *Creates an instance of Location.
   * @param {Object} params
   * @param {*} params.id
   * @param {*} [params.inventory={}]
   * @param {Boolean} [params.owner=false]
   * @param {Number} [params.money=0]
   * @param {Number} [params.price=0]
   * @memberof yarp.Location
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._owner = this.default(params.owner, false);
      this._money = this.default(params.money, 0);
      this._price = this.default(params.price, 0);
      this._inventory = this.default(params.inventory, {});
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Location class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Get items with price in inventory.
   * @function sale
   * @memberof yarp.Location
   * @param {Object} categories Items indexed by categories and id.
   * @instance
   */
  get sale() {
    let categories = {};
    for (let id in this.inventory) {
      if (this.inventory.hasOwnProperty(id)) {
        let item = yarp.items[id];
        let inventoryItem = this.inventory[id];
        if (inventoryItem.price) {
          if (!categories[item.category]) {
            categories[item.category] = {};
          }
          categories[item.category][item.id] = item.data;
          categories[item.category][item.id].price = inventoryItem.price;
          categories[item.category][item.id].amount = inventoryItem.amount;
        }
      }
    }
    return categories;
  }
}

module.exports = Location;
