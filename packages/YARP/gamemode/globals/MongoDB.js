'use strict';
/**
 * @file MongoDB class
 */
var db;
var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/yarp';
const chalk = require('chalk');

module.exports = class MongoDB {

  static getInstance(){
    return new Promise((resolve, reject) =>{
      if (db) {
        resolve(db);
      } else {
        MongoClient.connect(URL, function (err, client) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          db = client.db('yarp');
          console.log(chalk.yellowBright("[YARP] ")+"MongoDB Connected to "+URL);
          resolve(db);
        });
      }
    });
  }

  static insertOne(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).insertOne(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static insertMany(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).insertMany(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findOne(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).findOne(query, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findMany(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).find(query).toArray(function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findSome(collection,query,values,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).find(query,values).toArray(function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findSort(collection,query,sort,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).find(query).sort(sort).toArray(function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static findLimit(collection,query,limit,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).find(query).limit(limit).toArray(function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static deleteOne(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).deleteOne(query, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static deleteMany(collection,query,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).deleteMany(query, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static updateOne(collection,query,values,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).updateOne({$set: query}, values, function(err, res) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(res);
        });
      });
    });
  }

  static updateMany(collection,query,values,cb){
    return new Promise((resolve, reject) =>{
      this.getInstance().then((db) => {
        db.collection(collection).updateMany({$set: query}, values, function(err, obj) {
          if (err) console.log(chalk.redBright("[YARP] ")+err);
          resolve(obj.result);
        });
      });
    });
  }

  static joinCollection(collection,from,query,local,foreign,as,cb){
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
