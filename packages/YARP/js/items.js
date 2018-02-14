
exports.STORE = [
  {id: "fries", name: "Fries", price: 5, weight: 0.3, img:"1443311452", action: ['restoreHunger', 5]},
  {id: "burger", name: "Burger", price: 10, weight: 0.3, img:"2240524752", action: ['restoreHunger', 10]},
  {id: "hotdog", name: "Hot Dog", price: 15, weight: 0.3, img:"2565741261", action: ['restoreHunger', 15]},
  {id: "beer", name: "Beer Bottle", price: 5, weight: 0.3, img:"1350970027", action: ['restoreThirst', 5]},
  {id: "juice", name: "Juice Box", price: 10, weight: 0.3, img:"3638960837", action: ['restoreThirst', 10]},
  {id: "soda", name: "Soda Can", price: 15, weight: 0.3, img:"1020618269", action: ['restoreThirst', 15]}
];

exports.getInventoryItem = function(business, id){
   for (let i = 0; i < exports[business].length; i++){
     if(exports[business][i].id == id){
       return exports[business][i];
     }
   }
   return null;
 }
