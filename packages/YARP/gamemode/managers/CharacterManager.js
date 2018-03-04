'use strict';
/**
 * @file CharacterManager class
 */
export default class CharacterManager{
  static save(character){
    yarp.db.insertOne("characters", character);
  }

  static findBySocialClub(socialClub){
    return yarp.db.findMany("characters", {socialClub: socialClub});
  }

  static findByName(name){
    return yarp.db.findOne("characters", {name: name});
  }

  static findById(id){
    return yarp.db.findOne("characters", {_id: id});
  }

  static getNewId(){
    return yarp.db.findMany("characters", {}).length+1;
  }
}
