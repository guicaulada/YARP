'use strict';
/**
 * @file BankManager class
 */
module.exports = class TransactionManager{
  static add(transaction){
    return yarp.db.insertOne("transactions", transaction);
  }

  static getBalance(name){
    return new Promise((resolve, reject) =>{
      yarp.db.findMany("transactions", {source: name}).then((as_source) => {
        yarp.db.findMany("transactions", {target: name}).then((as_target) => {
          resolve(as_source.concat(as_target));
        });
      });
    });
  }

  static findAll(){
    return yarp.db.findMany("transactions", {});
  }

  static findById(id){
    return yarp.db.findOne("transactions", {_id: id});
  }

  static indexById(){
    return new Promise((resolve, reject) =>{
      let result = {};
      this.findAll().then((collection) =>{
        if (!collection) reject(collection);
        for (let i = 0; i < collection.length; i++){
          result[collection[i]._id] = collection[i];
        }
        resolve(result);
      });
    });
  }

  static getNewId(){
    return this.findAll().length+1;
  }
}
