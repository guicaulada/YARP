'use strict';
/**
 * @file BankManager class
 */
export default class TransactionManager{
  static save(transaction){
    yarp.db.insertOne("transactions", transaction);
  }

  static getBalance(name){
    let as_source = yarp.db.findMany("transactions", {source: name});
    let as_target = yarp.db.findMany("transactions", {target: name});
    return as_source.concat(as_target);
  }

  static findById(id){
    return yarp.db.findOne("transactions", {_id: id});
  }

  static getNewId(){
    return yarp.db.findMany("transactions", {}).length+1;
  }
}
