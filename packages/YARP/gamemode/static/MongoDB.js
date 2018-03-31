'use strict';
/**
 * @file MongoDB class
 */
var db;
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/yarp';

module.exports = class MongoDB {

  static connect(){
    return new Promise((resolve, reject) =>{
      if (db) {
        resolve(db);
      } else {
        MongoClient.connect(URL, function (err, client) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          db = client.db('yarp');
          console.log(chalk.yellowBright('[YARP] ')+'Connected to '+URL);
          resolve(db);
        });
      }
    });
  }

  static insert(collection,docs,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).insert(docs, options, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static remove(collection,selector,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).remove(selector, options, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static save(collection,doc,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).save(doc, options, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static update(collection,selector,doc,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).save(selector, doc, options, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static destinct(collection,key,query,option){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).destinct(key,query,option, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static count(collection,query,option){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).count(query,option, function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static find(collection,query,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).find(query,options).toArray(function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static indexes(collection){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).indexes(function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static aggregate(collection,query,options){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).aggregate(query,options,function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }

  static stats(collection){
    return new Promise((resolve, reject) =>{
      this.connect().then((db) => {
        db.collection(collection).stats(function(err, res) {
          if (err) console.log(chalk.redBright('[YARP] ')+err);
          resolve(res);
        });
      });
    });
  }
}

process.on('SIGHUP', function() {
  console.log(chalk.redBright('[YARP] ')+'Closing Connection. Bye-bye.');
  yarp.db.close();
  process.exit();
});
