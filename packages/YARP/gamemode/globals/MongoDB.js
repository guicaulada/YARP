'use strict';
/**
 * @file MongoDB class
 */
export default class MongoDB {
  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://localhost:27017/yarp";

  static insertOne(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).insertOne(query, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });
  }

  static insertMany(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).insertMany(query, function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static findOne(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).findOne(query, function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static findMany(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).find(query).toArray(function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static findSome(collection,query,values){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).find(query,values).toArray(function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static findSort(collection,query,sort){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).find(query).sort(sort).toArray(function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static findLimit(collection,query,limit){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).find(query).limit(limit).toArray(function(err, res) {
        if (err) throw err;
        return res;
        db.close();
      });
    });
  }

  static deleteOne(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).deleteOne(query, function(err, obj) {
        if (err) throw err;
        db.close();
      });
    });
  }

  static deleteMany(collection,query){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).deleteMany(query, function(err, obj) {
        if (err) throw err;
        return obj.result;
        db.close();
      });
    });
  }

  static updateOne(collection,query,values){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).updateOne({$set: query}, values, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });
  }

  static updateMany(collection,query,values){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).updateMany({$set: query}, values, function(err, res) {
        if (err) throw err;
        return obj.result;
        db.close();
      });
    });
  }

  static joinCollection(collection,from,query,local,foreign,as){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection(collection).aggregate([
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
        db.close();
      });
    });
  }
}
