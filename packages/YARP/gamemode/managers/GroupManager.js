'use strict';
/**
 * @file GroupManager class
 */
export default class GroupManager{
  static save(group){
    yarp.db.insertOne("groups", group);
  }

  static findByName(name){
    return yarp.db.findOne("groups", {name: name});
  }

  static findByType(type){
    return yarp.db.findMany("groups", {type: type});
  }

  static findById(id){
    return yarp.db.findOne("groups", {_id: id});
  }

  static getNewId(){
    return yarp.db.findMany("groups", {}).length+1;
  }
}
