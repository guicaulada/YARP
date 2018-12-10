'use strict';
/**
 * Implements a Item.
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
   * @param {Function} [params.options=() => {}]
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
      this._options = this.default(params.options, () => {}).toString();

      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Item class requires id and name to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }

  /**
   * Evals the options parameter.
   * @instance
   * @function options
   * @memberof Item
   */
  get options() {
    return (eval(this._options));
  }

  /**
   * Set options function as string.
   * @instance
   * @function options
   * @param {Function} value Options function.
   * @memberof Item
   */
  set options(value) {
    this._options = value.toString();
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
