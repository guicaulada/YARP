'use strict';
/**
 * @file ItemManager class
 */
export default class ItemManager{
  static save(item){
    yarp.db.insertOne("items", item);
  }

  static findByName(name){
    return yarp.db.findOne("items", {name: name});
  }

  static findById(id){
    return yarp.db.findOne("items", {_id: id});
  }

  static getNewId(){
    return yarp.db.findMany("items", {}).length+1;
  }
}
