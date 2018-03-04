'use strict';
/**
 * @file Item class
 */
import TransactionManager from '../managers/TransactionManager';
export default class Transaction{
  constructor(type,value,source,target){
    transaction._id = TransactionManager.getNewId();
    transaction.type = type;
    transaction.value = value;
    transaction.source = source;
    transaction.target = target;
  }

  save(){
    TransactionManager.save(this);
  }
}
