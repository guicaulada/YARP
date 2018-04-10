'use strict';
/**
 * @file Npc class
 */
 
module.exports = class Npc extends yarp.gmo{
  constructor(id,model,position,heading,despawn,drawDistance,visible,call){
    super();
    if ((typeof id) === 'object' || (id && model && position) != null){
      this._id = id._id || id;
      this._model = id._model || model;
      this._position = id._position || position;
      this._heading = id._heading || heading || 0;
      this._drawDistance = id._drawDistance || drawDistance || 100;
      this._visible = id._visible || visible || true;
      this._call = id._call || ((call) ? call.toString() : '() => {}');
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }
}
