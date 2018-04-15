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
  constructor(id,position,text,color,drawDistance,font,los,dimension,visible,range,enter,leave,permissions,items){
    super();
    if ((id && position) != null){
      this._id = id;
      this._text = text || '';
      this._position = position;
      this._range = range || 3;
      this._color = color || [51, 204, 51, 255],
      this._drawDistance = drawDistance || 10,
      this._font = font || 2;
      this._los = los || true;
      this._dimension = dimension || 0;
      this._visible = visible || true;
      this._enter = ((enter) ? enter.toString() : '() => {}');
      this._leave = ((leave) ? leave.toString() : '() => {}');
      this._permissions = ((permissions) ? (((yarp.labels && yarp.labels[id]) != null) ?
        yarp.labels[id].permissions.concat(permissions.filter(function (permission) {
          return yarp.labels[id].permissions.indexOf(permission) < 0;
        })) : permissions) : []);
      this._items = ((items) ? (((yarp.labels && yarp.labels[id]) != null) ?
        yarp.labels[id].items.concat(items.filter(function (item) {
          return yarp.labels[id].items.indexOf(item) < 0;
        })) : items) : []);
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
        new Label(id+' '+(i+1),label.positions[i],label.text,label.color,label.drawDistance,label.font,label.los,label.dimension,label.visible,label.range,label.enter,label.leave,label.permissions,label.items)
      }
    }
  }
}

module.exports = Label;
