'use strict';
/**
 * @file Variable class
 */
module.exports = class Store extends yarp.gmo{
  constructor(id,name,inventory,owner,money,price,markers,labels){
    super();
    if ((typeof id) === 'object' || (id) != null){
      this._id = id._id || id;
      this._owner = id._owner || owner || null;
      this._name = id._name || name || 'Store';
      this._money = id._money || money || 0;
      this._price = id._price || price || 0;
      this._inventory = id._inventory || inventory || {};
      this._markers = id._markers || markers || {};
      this._labels = id._labels || labels || {};
      for (let mid in this._markers){
        let marker = this._markers[mid];
        for (let i=0; i < marker.positions.length; i++){
          this.addMarker(
            new yarp.Marker(
              id+' '+(i+1),
              marker.positions[i],
              marker.type,
              marker.radius,
              marker.color,
              marker.direction,
              marker.rotation,
              marker.visible,
              marker.range,
              marker.enter,
              marker.leave,
              marker.permissions,
              marker.items
            )
          );
        }
      }
      for (let lid in this._labels){
        let label = this._labels[lid];
        for (let i=0; i < label.positions.length; i++){
          this.addLabel(
            new yarp.Label(
              id+' '+(i+1),
              label.positions[i],
              label.text,
              label.color,
              label.drawDistance,
              label.font,
              label.los,
              label.dimension,
              label.visible,
              label.range,
              label.enter,
              label.leave,
              label.permissions,
              label.items
            )
          );
        }
      }
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  get categories(){
    let categories = {};
    for (let id in this.inventory){
      let item = yarp.items[id];
      if (!categories[item.category]){
        categories[item.category] = {}
      }
      categories[item.category][item.id] = item.data;
      categories[item.category][item.id].price = this.inventory[id].price;
      categories[item.category][item.id].amount = this.inventory[id].amount;
    }
    return categories;
  }

  addMarker(marker){
    marker.store = this;
    this._markers[marker.id] = marker;
  }

  addLabel(label){
    label.store = this;
    this._labels[label.id] = label;
  }

  removeMarker(id){
    this._markers[marker.id].remove();
    this._markers[marker.id] = null;
  }

  removeLabel(id){
    this._labels[label.id].remove();
    this._labels[label.id] = null;
  }

  static config(file){
    let stores = require(file);
    for (let id in stores){
      let store = stores[id]
      if (!yarp.stores[id]){
        new yarp.Store(id,store.name,store.inventory,store.owner,store.money,store.price,store.markers,store.labels);
      }
    }
  }
}
