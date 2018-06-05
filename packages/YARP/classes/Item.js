'use strict';
/**
 * Creates a Item.
 * @namespace yarp.Item
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Item id.
 * @param {string} name - Item name.
 * @param {string} [category='None'] - Item category.
 * @param {number} [weight=0.5] - Item weight.
 * @param {number} [spoil=false] - Item spoil.
 * @param {number} [model=''] - Item model.
 * @param {object} [options={}] - Item options.
 */

class Item extends yarp.GMObject{
  constructor(
    id,
    name,
    category = 'None',
    weight = 0,
    spoil = false,
    model = 'prop_paper_bag_01',
    options = {}
  ){
    super();
    if ((id && name) != null) {
      this._id = id;
      this._name = name;
      this._category = category;
      this._weight = weight;
      this._spoil = spoil;
      this._weight = weight;
      this._model = model;
      this._options = {};
      this.options = options;
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Gets item options functions.
   * @instance
   * @function options
   * @memberof yarp.Item
   * @returns {object} - Functions indexed by option.
   */
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

  /**
   * Load from object.
   * @instance
   * @function isAmmo
   * @memberof yarp.Item
   * @returns {boolean} - If the item is weapon or not.
   */
  isWeapon() {
    return this.id.includes('WEAPON_')
  }

  /**
   * Load from object.
   * @instance
   * @function isAmmo
   * @memberof yarp.Item
   * @returns {boolean} - If the item is ammo or not.
   */
  isAmmo() {
    return this.id.includes('AMMO_')
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Item
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Item(obj._id,obj._name,obj._category,obj._weight,obj._spoil,obj._model,obj._options);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Item
   * @param {string} file - Config file path.
   */
  static config(file){
    let items = require(file);
    for (let category in items){
      for (let id in items[category]){
        let item = items[category][id];
        if (!yarp.items[id]) {
          new Item(id,item.name,category,item.weight,item.spoil,item.model,item.options);
        } else {
          yarp.items[id].name = item.name;
          yarp.items[id].category = category;
          yarp.items[id].weight = item.weight;
          yarp.items[id].spoil = item.spoil;
          yarp.items[id].weight = item.weight;
          yarp.items[id].model = item.model;
          yarp.items[id].options = item.options;
        }
      }
    }
  }
}

module.exports = Item;
