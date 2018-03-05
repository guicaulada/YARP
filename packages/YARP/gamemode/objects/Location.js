'use strict';
/**
 * @file Location class
 */
export default class Location{
  constructor(name,position){
    this._id = LocationManager.getNewId();
    this.name = name;
    this.position = position;
    this.markers = [];
    this.texts = [];
    this.npcs = [];
    this.blips = [];
  }
}
