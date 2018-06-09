'use strict';
/**
 * Implements a Location.
 * @class yarp.Location
 * @extends yarp.GMObject
 */
class Location extends yarp.GMObject {
  /**
   *Creates an instance of Location.
   * @param {*} id
   * @param {*} [inventory={}]
   * @param {boolean} [owner=false]
   * @param {number} [money=0]
   * @param {number} [price=0]
   * @memberof yarp.Location
   */
  constructor(
    id,
    inventory = {},
    owner = false,
    money = 0,
    price = 0
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        inventory: inventory,
        owner: owner,
        money: money,
        price: price,
      } = id;
      return new yarp.Location(nid, inventory, owner, money, price);
    } else if ((id) != null) {
      this._id = id;
      this._owner = owner;
      this._money = money;
      this._price = price;
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
