'use strict';
/**
 * @file MongoDB class
 */
var MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/yarp";
var db;

module.exports = class MongoDB {

  static getInstance(){
    if (db != null) return db;
    await MongoClient.connect(URL, function(err, conn) {
      if (err) throw err;
      db = conn;
      console.log("\x1b[1m\x1b[33m[YARP] \x1b[0mMongoDB Connected to "+URL);
      return db;
    });
  }

  static insertOne(collection,query){
    this.getInstance().collection(collection).insertOne(query, function(err, res) {
      if (err) throw err;
    });
  }

  static insertMany(collection,query){
    this.getInstance().collection(collection).insertMany(query, function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findOne(collection,query){
    this.getInstance().collection(collection).findOne(query, function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findMany(collection,query){
    console.log(this.getInstance());
    this.(await getInstance()).collection(collection).find(query).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findSome(collection,query,values){
    this.getInstance().collection(collection).find(query,values).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findSort(collection,query,sort){
    this.getInstance().collection(collection).find(query).sort(sort).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findLimit(collection,query,limit){
    this.getInstance().collection(collection).find(query).limit(limit).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static deleteOne(collection,query){
    this.getInstance().collection(collection).deleteOne(query, function(err, obj) {
      if (err) throw err;
    });
  }

  static deleteMany(collection,query){
    this.getInstance().collection(collection).deleteMany(query, function(err, obj) {
      if (err) throw err;
      return obj.result;
    });
  }

  static updateOne(collection,query,values){
    this.getInstance().collection(collection).updateOne({$set: query}, values, function(err, res) {
      if (err) throw err;
    });
  }

  static updateMany(collection,query,values){
    this.getInstance().collection(collection).updateMany({$set: query}, values, function(err, res) {
      if (err) throw err;
      return obj.result;
    });
  }

  static joinCollection(collection,from,query,local,foreign,as){
    this.getInstance().collection(collection).aggregate([
      { $lookup:
         {
           from: from,
           localField: local,
           foreignField: foreign,
           as: as
         }
      }
    ]).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }
}
