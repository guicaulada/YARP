'use strict';
/**
 * Creates a Label.
 * @namespace yarp.Label
 * @class
 * @extends yarp.GMObject
 * @param {string} id - Label id.
 * @param {Vector3} position - Label position.
 * @param {string} [text=''] - Label text.
 * @param {number} [range=3] - Label range.
 * @param {Array<number>} [color=[251, 204, 51, 255]] - Label color.
 * @param {number} [drawDistance=10] - Label radius.
 * @param {number} [font=10] - Label font.
 * @param {boolean} [los=true] - Label line of sight.
 * @param {number}  [dimension=0] - Label dimension.
 * @param {boolean} [visible=true] - Label visible.
 * @param {function} [enter=() => {}] - Label enter function.
 * @param {function} [leave=() => {}] - Label leave function.
 * @param {Array<string>} [permissions=[]] - Label permissions.
 * @param {Array<string>} [items=[]] - Label items.
 */

class Label extends yarp.GMObject{
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
  ){
    super();
    if ((id && position) != null){
      this._id = id;
      this._text = text;
      this._position = position;
      this._range = range;
      this._color = color;
      this._drawDistance = drawDistance;
      this._font = font;
      this._los = los;
      this._dimension = dimension ;
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
        dimension: this._dimension
      });
      yarp.mng.register(this);
      this.makeGetterSetter();
    }
  }

  /**
   * Load from object.
   * @static
   * @function load
   * @memberof yarp.Label
   * @param {object} object - Class object.
   */
  static load(obj){
    return new Label(obj._id,obj._position,obj._text,obj._color,obj._drawDistance,obj._font,obj._los,obj._dimension,obj._visible,obj._range,obj._enter,obj._leave,obj._permissions,obj._items);
  }

  /**
   * Load from config.
   * @static
   * @function config
   * @memberof yarp.Label
   * @param {string} file - Config file path.
   */
  static config(file){
    let labels = require(file);
    for (let id in labels){
      let label = labels[id];
      for (let i=0; i < label.positions.length; i++){
        let nid = id + ' ' + (i + 1);
        if (!yarp.labels[nid]) {
          new Label(nid,label.positions[i],label.text,label.color,label.drawDistance,label.font,label.los,label.dimension,label.visible,label.range,label.enter,label.leave,label.permissions,label.items)
        } else {
          yarp.labels[nid].text = label.text;
          yarp.labels[nid].position = label.positions[i];
          yarp.labels[nid].range = label.range;
          yarp.labels[nid].color = label.color;
          yarp.labels[nid].drawDistance = label.drawDistance;
          yarp.labels[nid].font = label.font;
          yarp.labels[nid].los = label.los;
          yarp.labels[nid].dimension = label.dimension;
          yarp.labels[nid].visible = label.visible;
          yarp.labels[nid].enter = label.enter.toString();
          yarp.labels[nid].leave = label.leave.toString();
          yarp.labels[nid].permissions = label.permissions;
          yarp.labels[nid].items = label.items;
        }
      }
    }
  }
}

module.exports = Label;
