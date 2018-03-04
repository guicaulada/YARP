'use strict';
/**
 * @file UserManager class
 */
export default class UserManager{
  static save(user){
    yarp.db.insertOne("users", user);
  }

  static findBySocialClub(socialClub){
    return yarp.db.findOne("users", {socialClub: socialClub});
  }

  static findById(id){
    return yarp.db.findOne("users", {_id: id});
  }

  static getNewId(){
    return yarp.db.findMany("users", {}).length+1;
  }
}
