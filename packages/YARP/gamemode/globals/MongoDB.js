'use strict';
/**
 * @file MongoDB class
 */
var MongoClient = require('mongodb').MongoClient;
export default class MongoDB {
  const URL = "mongodb://localhost:27017/yarp";
  var _db;

  static getInstance(){
    if (!_db) {
      MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        _db = db;
      });
    }
    return _db
  }

  static insertOne(collection,query){
    MongoDB.getInstance().collection(collection).insertOne(query, function(err, res) {
      if (err) throw err;
    });
  }

  static insertMany(collection,query){
    MongoDB.getInstance().collection(collection).insertMany(query, function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findOne(collection,query){
    MongoDB.getInstance().collection(collection).findOne(query, function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findMany(collection,query){
    MongoDB.getInstance().collection(collection).find(query).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findSome(collection,query,values){
    MongoDB.getInstance().collection(collection).find(query,values).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findSort(collection,query,sort){
    MongoDB.getInstance().collection(collection).find(query).sort(sort).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static findLimit(collection,query,limit){
    MongoDB.getInstance().collection(collection).find(query).limit(limit).toArray(function(err, res) {
      if (err) throw err;
      return res;
    });
  }

  static deleteOne(collection,query){
    MongoDB.getInstance().collection(collection).deleteOne(query, function(err, obj) {
      if (err) throw err;
    });
  }

  static deleteMany(collection,query){
    MongoDB.getInstance().collection(collection).deleteMany(query, function(err, obj) {
      if (err) throw err;
      return obj.result;
    });
  }

  static updateOne(collection,query,values){
    MongoDB.getInstance().collection(collection).updateOne({$set: query}, values, function(err, res) {
      if (err) throw err;
    });
  }

  static updateMany(collection,query,values){
    MongoDB.getInstance().collection(collection).updateMany({$set: query}, values, function(err, res) {
      if (err) throw err;
      return obj.result;
    });
  }

  static joinCollection(collection,from,query,local,foreign,as){
    MongoDB.getInstance().collection(collection).aggregate([
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
