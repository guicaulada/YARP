'use strict';
/**
 * @file Utility class
 */
module.exports = class Utility {
  /**
  * Get formatted date and time.
  * @param {Date} date - date
  */
  static getTimestamp(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    var date = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
    return date;
  }

  /**
  * Round numbers by the amount of decimals.
  *
  * @param {Number} value - value to be rounded
  * @param {Number} decimals - how many decimals
  */
  static round(value, decimals){
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  static getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
      result = [];
    return result;
  }
}
