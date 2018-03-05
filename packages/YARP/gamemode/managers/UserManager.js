'use strict';
/**
 * @file UserManager class
 */
let bcrypt = require('bcryptjs');
module.exports = class UserManager{
  static add(user){
    return yarp.db.insertOne("users", user);
  }

  static findAll(){
    return yarp.db.findMany("users", {});
  }

  static findById(id){
    return yarp.db.findOne("users", {_id: id});
  }

  static findByLogin(id, password){
    return new Promise((resolve, reject) =>{
      this.findById(id).then(user => {
        if (user === null) {
          resolve(null);
        } else if(bcrypt.compareSync(password, user.password)){
          resolve(user);
        } else {
          resolve(false);
        }
      });
    });
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
