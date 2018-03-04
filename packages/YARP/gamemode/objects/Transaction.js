'use strict';
/**
 * @file Item class
 */
import TransactionManager from '../managers/TransactionManager';
export default class Transaction{
  constructor(type,value,source,target){
    this._id = TransactionManager.getNewId();
    this.type = type;
    this.value = value;
    this.source = source;
    this.target = target;
  }

  save(){
    TransactionManager.save(this);
  }
}
