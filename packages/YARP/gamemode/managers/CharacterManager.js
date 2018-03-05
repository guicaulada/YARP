'use strict';
/**
 * @file CharacterManager class
 */
module.exports = class CharacterManager{
  static add(character){
    return yarp.db.insertOne("characters", character);
  }

  static findAll(){
    return yarp.db.findMany("characters", {});
  }

  static findById(id){
    return yarp.db.findOne("characters", {_id: id});
  }

  static findBySocialClub(socialClub){
    return yarp.db.findMany("characters", {socialClub: socialClub});
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
}
