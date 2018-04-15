'use strict';
/**
 * Holds utility functions.
 * @module utils
 * @namespace yarp.utils
 */

let utils = {};

/**
 * Format dates to dd/mm/yy h:m:s.
 * @function getTimestamp
 * @memberof yarp.utils
 * @param {Date} date - new Date().
 * @returns {string} - The formatted date.
 */
utils.getTimestamp = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth()+1; //January is 0!
  let yyyy = date.getFullYear();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  date = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
  return date;
}

/**
 * Round numbers by the amount of decimals.
 * @function round
 * @memberof yarp.utils
 * @param {number} value - Value to be rounded.
 * @param {number} decimals - How many decimals.
 * @returns {number} - The rounded number.
 */
utils.round = (value, decimals) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * Offset a Vector3.
 * @function Vector3Offset
 * @memberof yarp.utils
 * @param {Vector3} vector - Vector3 to be offset.
 * @param {Vector3} offset - Vector3 offset amount.
 * @returns {Vector3} - Offset Vector3.
 */
utils.Vector3Offset = (vector,offset) => {
  return new mp.Vector3(vector.x+offset.x,vector.y+offset.y,vector.z+offset.z);
}

/**
 * Get the distance between two Vector3.
 * @function Vector3Distance
 * @memberof yarp.utils
 * @param {Vector3} vector1 - First Vector3.
 * @param {Vector3} vector2 - Second Vector3.
 * @returns {number} - Distance between them.
 */
utils.Vector3Distance = (vector1,vector2) => {
  let dx = vector1.x - vector2.x;
  let dy = vector1.y - vector2.y;
  let dz = vector1.z - vector2.z;
  return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

/**
 * Generate a random string.
 * @function randomString
 * @memberof yarp.utils
 * @param {number} digits - Amaount of symbols on the string.
 * @param {string} possible - String with possible symbols.
 * @returns {string} - Randomly generated string.
 */
utils.randomString = (digits,possible) => {
  let text = '';
  for (let i = 0; i < digits; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/**
 * Get substrings from string.
 * @function getSubstrings
 * @memberof yarp.utils
 * @param {string} string - String to analyze.
 * @returns {Array} - Array of substrings.
 */
utils.getSubstrings = (string,symbol) => {
  let current;
  let pattern = new RegExp('\\'+symbol+'(.*?)'+'\\'+symbol, 'g');
  let result = [];
  while(current = pattern.exec(string)) {
    if (current) {
      result.push(current[0].replace(new RegExp('\'', 'g'), ''));
    }
  }
  return result;
}

/**
 * Offsets a Vector3.
 * @function getParamNames
 * @memberof yarp.utils
 * @param {function} func - The function to be analyzed.
 * @returns {Array} - Array of parameter names.
 */
utils.getParamNames = (func) => {
  let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  let ARGUMENT_NAMES = /([^\s,]+)/g;
  let fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
    result = [];
  return result;
}

/**
 * Offsets a Vector3.
 * @function paramsToString
 * @memberof yarp.utils
 * @param {object} obj - The object to be analyzed.
 * @returns {string} - Object representation in string.
 */
utils.paramsToString = (obj) => {
  let obj_p = '';
  if (typeof obj === 'string') {
    return '\''+obj+'\'';
  }
  else if (typeof obj === 'boolean' || typeof obj === 'number') {
    return obj.toString();
  }
  else if (obj instanceof Array) {
      obj_p = '['
    for (let o of obj){
      obj_p = obj_p+' '+this.parseParams(o)+','
    }
    if (obj.length > 0){
      obj_p = obj_p.slice(0, -1);
    }
    return obj_p+' ]';
  }
  else if (obj instanceof Object) {
    obj_p = '{'
    for (let k in obj) {
      obj_p = obj_p+' \''+k+'\': '+this.parseParams(obj[k])+',';
    }
    if (Object.keys(obj).length > 0){
      obj_p = obj_p.slice(0, -1);
    }
    return obj_p+' }';
  }
  else if (obj instanceof Function) {
    return obj.toString();
  }
  return obj_p;
}

/**
 * Returns the time in a set timezone.
 * @function getTimezoneDate
 * @memberof yarp.utils
 * @param {number} timezone - The timezone difference to GMT.
 * @returns {Date} - Timezone date.
 */
utils.getTimezoneDate = (timezone) => {
  let date = new Date();
  let h = date.getUTCHours() + timezone;
  let m = date.getUTCMinutes();
  let s = date.getUTCSeconds();
  let dd = date.getUTCDate();
  let mm = date.getUTCMonth()+1; // January is 0
  let yy = date.getUTCFullYear();
  if (timezone < 0) {
    if (h < 0) {
      h = 24 + h;
      dd--;
    }
    if (dd == 0) {
      mm--;
      if (mm == 0) {
        mm = 12;
        yy--;
      }
      if (mm == 2) {
        if (yy % 100 != 0 && yy % 4 == 0 || yy % 400 == 0) {
          dd = 29;
        } else {
          dd = 28;
        }
      } else if (mm % 2 == 0) {
        dd = 30;
      } else {
        dd = 31;
      }
    }
  } else if (timezone > 0) {
    if (h > 23) {
      h = h - 24;
      dd++;
    }
    if (mm == 2) {
      if (yy % 100 != 0 && yy % 4 == 0 || yy % 400 == 0) {
        if (dd > 29) {
          dd = 1;
          mm++;
        }
      } else {
        if (dd > 28) {
          dd = 1;
          mm++;
        }
      }
    } else if (mm % 2 == 0) {
      if (dd > 30) {
        dd = 1;
        mm++; // ^
      }
    } else {
      if (dd > 31) {
        dd = 1;
        mm++;
      }
    }
    if (mm > 12) {
      mm = 1;
      yy++
    }
  }
  return new Date(yy,mm,dd,h,m,s);
}

module.exports = utils;
