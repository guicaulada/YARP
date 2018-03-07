'use strict';
/**
 * @file Config class
 */
module.exports = class Config{
  constructor(id,value){
    if ((typeof id) === 'object'){
      this._id = id._id;
      this.value = id.value;
    } else if ((id && value) != null){
      this._id = id;
      this.value = value;
    }
  }

  static load(){
    return yarp.Manager.load(Config);
  }
  save(){
    yarp.Manager.save(this);
  }
}
