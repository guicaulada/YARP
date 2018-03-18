'use strict';
/**
 * @file Variable class
 */
module.exports = class Variable{
  constructor(id,value){
    if ((typeof id) === 'object' || (id && value) != null){
      this._id = id._id || id;
      this._value = id._value || value;
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Variable);
  }

  static config(file){
    let variables = require(file);
    for (let id in variables){
      new yarp.Variable(id,variables[id]);
    }
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
