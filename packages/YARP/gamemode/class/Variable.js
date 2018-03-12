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
    return yarp.dbm.load(Variable);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
}
