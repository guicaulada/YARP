'use strict';
/**
 * @file MongoDB class
 */
var db;
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/yarp';

module.exports = class MongoDB {

  static getInstance(){
    return new Promise((resolve, reject) =>{
      if (db) {
        resolve(db);
      } else {
        MongoClient.connect(URL, function (err, client) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          db = client.db('yarp');
          console.log(chalk.yellowBright("[YARP] ")+"Connected to "+URL);
          resolve(db);
        });
      }
    });
  }

  static save(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).save(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static insertOne(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).insertOne(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static insertMany(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).insertMany(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findOne(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).findOne(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static find(collection,query,values,option){
    if (values == null && option == null){
      return new Promise((resolve, reject) =>{
        this.getInstance().then((db) => {
          db.collection(collection).find(query).toArray(function(err, res) {
            if (err) console.log(chalk.redBright("[YARP] ")+err);
            resolve(res);
          });
        });
      });
    } else if (option == null){
      return new Promise((resolve, reject) =>{
        this.getInstance().then((db) => {
          db.collection(collection).find(query,values).toArray(function(err, res) {
            if (err) console.log(chalk.redBright("[YARP] ")+err);
            resolve(res);
          });
        });
      });
    } else if ((typeof option) === 'object'){
      return new Promise((resolve, reject) =>{
        this.getInstance().then((db) => {
          db.collection(collection).find(query).sort(sort).toArray(function(err, res) {
            if (err) console.log(chalk.redBright("[YARP] ")+err);
            resolve(res);
          });
        });
      });
    } else if ((typeof option) === 'number'){
      return new Promise((resolve, reject) =>{
        this.getInstance().then((db) => {
          db.collection(collection).find(query).limit(limit).toArray(function(err, res) {
            if (err) console.log(chalk.redBright("[YARP] ")+err);
            resolve(res);
          });
        });
      });
    }
  }

  static deleteOne(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).deleteOne(query, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static deleteMany(collection,query){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).deleteMany(query, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static updateOne(collection,query,values){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).updateOne({$set: query}, values, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static updateMany(collection,query,values){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).updateMany({$set: query}, values, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static aggregate(collection,from,query,local,foreign,as){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).aggregate([
        {
          $lookup:
          {
            from: from,
            localField: local,
            foreignField: foreign,
            as: as
          }
        }
      ]).toArray(function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }
}

process.on('SIGHUP', function() {
  console.log(chalk.redBright("[YARP] ")+"Closing Connection. Bye-bye.");
  yarp.db.close();
  process.exit();
});
