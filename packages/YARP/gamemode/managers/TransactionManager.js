'use strict';
/**
 * @file BankManager class
 */
module.exports = class TransactionManager{
  static add(transaction){
    yarp.db.insertOne("transactions", transaction);
  }

  static getBalance(name){
    let as_source = yarp.db.findMany("transactions", {source: name});
    let as_target = yarp.db.findMany("transactions", {target: name});
    return as_source.concat(as_target);
  }

  static findAll(){
    return yarp.db.findMany("transactions", {});
  }

  static findById(id){
    return yarp.db.findOne("transactions", {_id: id});
  }

  static indexById(){
    let result = {};
    let collection = this.findAll();
    for (object of collection){
      result[object._id] = object;
    }
    return result;
  }

  static getNewId(){
    return this.findAll().length+1;
  }
}
