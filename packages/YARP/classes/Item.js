'use strict';
/**
 * Implements a Item.
 * @class yarp.Item
 * @extends yarp.GMObject
 */
class Item extends yarp.GMObject {
  /**
   *Creates an instance of Item.
   * @param {*} id
   * @param {*} name
   * @param {string} [category='None']
   * @param {number} [weight=0]
   * @param {boolean} [spoil=false]
   * @param {string} [model='prop_paper_bag_01']
   * @param {*} [options={}]
   * @memberof yarp.Item
   */
  constructor(
    id,
    name,
    category = 'None',
    weight = 0,
    spoil = false,
    model = 'prop_paper_bag_01',
    options = {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        name: name,
        category: category,
        weight: weight,
        spoil: spoil,
        model: model,
        options: options,
      } = id;
      return new yarp.Item(nid, name, category, weight, spoil, model, options);
    } else if ((id && name) != null) {
      this._id = id;
      this._name = name;
      this._category = category;
      this._weight = weight;
      this._spoil = spoil;
      this._weight = weight;
      this._model = model;
      this._options = {};
      for (let id in options) {
        if (options.hasOwnProperty(id)) {
          this._options[id] = options[id].toString();
        }
      }
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Gets item options functions.
   * @instance
   * @function options
   * @memberof yarp.Item
   * @return {object} - Functions indexed by option.
   */
  get options() {
    let value = {};
    for (let id in this._options) {
      if (this._options.hasOwnProperty(id)) {
        value[id] = eval(this._options[id]);
      }
    }
    return value;
  }

  /**
   * Sets item options functions as strings.
   * @instance
   * @function options
   * @memberof yarp.Item
   * @param {Array<function>} value - Array of option functions
   */
  set options(value) {
    for (let id in value) {
      if (this._options.hasOwnProperty(id)) {
        this._options[id] = value[id].toString();
      }
    }
  }

  /**
   * Load from object.
   * @instance
   * @function isAmmo
   * @memberof yarp.Item
   * @return {boolean} - If the item is weapon or not.
   */
  isWeapon() {
    return this.id.includes('WEAPON_');
  }

  /**
   * Load from object.
   * @instance
   * @function isAmmo
   * @memberof yarp.Item
   * @return {boolean} - If the item is ammo or not.
   */
  isAmmo() {
    return this.id.includes('AMMO_');
  }
}

module.exports = Item;
