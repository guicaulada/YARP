'use strict';
/**
 * Implements a Label.
 * @class yarp.Label
 * @extends yarp.GMObject
 */
class Label extends yarp.GMObject {
  /**
   *Creates an instance of Label.
   * @param {*} id
   * @param {*} position
   * @param {string} [text='']
   * @param {*} [color=[51, 204, 51, 255]]
   * @param {number} [drawDistance=10]
   * @param {number} [font=2]
   * @param {boolean} [los=true]
   * @param {number} [dimension=0]
   * @param {boolean} [visible=true]
   * @param {number} [range=3]
   * @param {*} [enter=() => {}]
   * @param {*} [leave=() => {}]
   * @param {*} [permissions=[]]
   * @param {*} [items={}]
   * @memberof yarp.Label
   */
  constructor(
    id,
    position,
    text = '',
    color = [51, 204, 51, 255],
    drawDistance = 10,
    font = 2,
    los = true,
    dimension = 0,
    visible = true,
    range = 3,
    enter = () => {},
    leave = () => {},
    permissions = [],
    items = {}
  ) {
    super();
    if (typeof id === 'object') {
      let {
        id: nid,
        position: position,
        text: text,
        color: color,
        drawDistance: drawDistance,
        font: font,
        los: los,
        dimension: dimension,
        visible: visible,
        range: range,
        enter: enter,
        leave: leave,
        permissions: permissions,
        items: items,
      } = id;
      return new yarp.Label(nid, position, text, color, drawDistance, font, los, dimension, visible, range, enter, leave, permissions, items);
    } else if ((id && position) != null) {
      this._id = id;
      this._text = text;
      this._position = position;
      this._range = range;
      this._color = color;
      this._drawDistance = drawDistance;
      this._font = font;
      this._los = los;
      this._dimension = dimension;
      this._visible = visible;
      this._enter = enter.toString();
      this._leave = leave.toString();
      this._permissions = permissions;
      this._items = items;
      this.players = [];
      if (!this._visible) this._color[4] = 0;
      this.mp = mp.labels.new(this._text, this._position,
      {
        los: this._los,
        font: this._font,
        drawDistance: this._drawDistance,
        color: this._color,
        dimension: this._dimension,
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }
}

module.exports = Label;
