'use strict';
/**
 * MongoDB promise library.
 * @namespace yarp.db
 * @see https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
 */

const MongoClient = require('mongodb').MongoClient;
let _url = 'mongodb://localhost:27017/yarp';
let _db = null;
let mongo = {};

/**
 * Connects to MongoDB.
 * @function connect
 * @memberof yarp.db
 * @param {String} [url='mongodb://localhost:27017/yarp'] Connection URL.
 * @return {Promise<Object>} A promise that returns the MongoDB object if resolved.
 */
mongo.connect = (url) => {
  return new Promise((resolve, reject) => {
    if (url && (_url != url) && _db) {
      mongo.close();
      _url = url;
    }
    if (_db) {
      resolve(_db);
    } else {
      MongoClient.connect(_url, (err, client) => {
        if (err) yarp.log.danger(err);
        _db = client.db('yarp');
        yarp.log.warning('Connected to '+_url);
        resolve(_db);
      });
    }
  });
};

/**
 * Inserts a single document or a an array of documents into MongoDB.
 * @function insert
 * @memberof yarp.db
 * @param {String} collection The collection of the documents.
 * @param {Array<Object>} docs Array of objects.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.insert = (collection, docs, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).insert(docs, options, function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Removes documents specified by selector from MongoDB.
 * @function remove
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Object} selector Filter the document by parameter.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.remove = (collection, selector, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).remove(selector, options, function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Save a document. Simple full document replacement function.
 * @function save
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Object} doc The object to save.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.save = (collection, doc, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).save(doc, options, function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Updates documents.
 * @function update
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Object} selector Filter documents by parameter.
 * @param {Object} doc The fields/values to be updated.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Pbject>} A promise that returns the result from MongoDB if resolved.
 */
mongo.update = (collection, selector, doc, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).save(selector, doc, options, function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * The distinct command returns returns a list of distinct values for the given key across a collection.
 * @function destinct
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {String} key Key to run distinct against.
 * @param {Object} [query] Filter results.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.destinct = (collection, key, query, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).destinct(key, query, options, (err, res) => {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Count number of matching documents in MongoDB to a query.
 * @function count
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Object} [query] Filter results.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.count = (collection, query, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).count(query, options, (err, res) => {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Creates a cursor for a query that can be used to iterate over results from MongoDB.
 * @function find
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Object} query Query to locate the document.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Array>} A promise that returns the result from MongoDB if resolved.
 */
mongo.find = (collection, query, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).find(query, options).toArray((err, res) => {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Retrieve all the indexes on the collection.
 * @function indexes
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.indexes = (collection) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).indexes(function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Execute an aggregation framework pipeline against the collection.
 * @function aggregate
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @param {Array<String>} query Contain all the aggregation framework commands for the execution.
 * @param {Object} [options] MongoDB options.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.aggregate = (collection, query, options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).aggregate(query, options, (err, res) => {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

/**
 * Get all the collection statistics.
 * @function stats
 * @memberof yarp.db
 * @param {String} collection The collection of the document.
 * @return {Promise<Object>} A promise that returns the result from MongoDB if resolved.
 */
mongo.stats = (collection) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).stats(function(err, res) {
        if (err) yarp.log.danger(err);
        resolve(res);
      });
    });
  });
};

module.exports = mongo;
