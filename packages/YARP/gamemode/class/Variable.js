'use strict';
/**
 * @file Variable class
 */
module.exports = class Variable{
  constructor(_id,value){
    if ((typeof _id) === 'object' || (_id && value) != null){
      this._id = _id._id || _id;
      this.value = _id.value || value;
    }
  }

  static load(){
    return yarp.mng.load(Variable);
  }
  save(){
    yarp.mng.save(this);
  }
}
