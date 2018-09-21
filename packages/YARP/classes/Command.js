'use strict';
/**
 * Implements a Command.
 * @class yarp.Command
 * @extends yarp.Object
 */
class Command extends yarp.Object {
  /**
   * Creates an instance of Command.
   * @param {Object} params
   * @param {String} params.id
   * @param {Function} [params.call=() => {}]
   * @param {String} [params.category='None']
   * @param {String} [params.hint='There\'s no hint.']
   * @param {Array<String>} [params.permissions=[]]
   * @param {Object} [params.items={}]
   * @param {Boolean} [params.position=false]
   * @param {Boolean} [params.range=false]
   * @memberof yarp.Command
   */
  constructor(params) {
    super();
    if ((params.id) != null) {
      this._id = params.id;
      this._category = this.default(params.category, 'None');
      this._hint = this.default(params.hint, 'There\'s no hint.');
      this._call = this.default(params.call, () => {}).toString();
      this._position = this.default(params.position, false);
      this._range = this.default(params.range, false);
      this._permissions = this.default(params.permissions, []);
      this._items = this.default(params.items, {});
      yarp.mng.register(this);
      this.makeGetterSetter();
    } else {
      throw new TypeError('Command class requires id to be instantiated.\nParameters: ' + JSON.stringify(params));
    }
  }
}

module.exports = Command;
