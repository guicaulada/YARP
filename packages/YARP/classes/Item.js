'use strict';
/**
 * Implements a Item.
 * @class Item
 */
class Item extends yarp.Object {
  /**
   * Creates an instance of Item.
   * @extends {yarp.Object}
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.name
   * @param {String} [params.category='None']
   * @param {Number} [params.weight=0]
   * @param {Boolean} [params.spoil=false]
   * @param {String} [params.model='prop_paper_bag_01']
   * @param {Object} [params.options={}]
   * @memberof Item
   */
  constructor(params) {
    super();
    if ((params.id && params.name) != null) {
      this._id = params.id;
      this._name = params.name;
      this._category = this.default(params.category, 'None');
      this._weight = this.default(params.weight, 0);
      this._spoil = this.default(params.spoil, false);
      this._weight = this.default(params.weight, 0);
      this._model = this.default(params.model, 'prop_paper_bag_01');
      this._options = this.default(params.options, {});

      // Turning functions into strings
      for (let id in this._options) {
        if (this._options.hasOwnProperty(id)) {
          this._options[id] = this.default(this._options[id], () => {}).toString();
        }
      }

      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Item class requires id and name to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Gets item options functions.
   * @instance
   * @function options
   * @return {Object} Functions indexed by option.
   * @memberof Item
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
   * @param {Array<function>} value Array of option functions
   * @memberof Item
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
   * @return {Boolean} If the item is weapon or not.
   * @memberof Item
   */
  isWeapon() {
    return this.id.includes('WEAPON_');
  }

  /**
   * Load from object.
   * @instance
   * @function isAmmo
   * @return {Boolean} If the item is ammo or not.
   * @memberof Item
   */
  isAmmo() {
    return this.id.includes('AMMO_');
  }
}

module.exports = Item;
