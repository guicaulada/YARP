
//This file contain examples of the data structure present on the database.
//You are free to add other atributes if necessary, these are just examples.

var srv_data = {
    key : anything
}

var user = {
  id : 1,
  last_login : getFormattedDate(),
  whitelisted : true,
  banned : false,
  identifier : "ip",
  characters : {
    1 : {
      homes : {
        1 : {
          home : "Name",
          number : 0
        }
      },
      identity : {
        registration : "4HK245",
        phone : 9949,
        firstname : "Doe",
        name : "John",
        age : 22
      },
      business : {
        1 : {
          name : "Name",
          desc : "Description",
          capital : 0,
          laundered : 0,
          last_check : getFormattedDate()
        }
      },
      vehicles : {
        1 : {
          model : "modelname",
          data : "json"
        }
      }
    }
  }
}
