function addUser(){
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var auth_level = "user";
  console.log("initial length: " + password.length)

  if(password.length <32){
    var padding = 32-password.length;
    for(i=0; i<padding; i++){
      password += " ";
      console.log(password.length)
    }
  }

  $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
    var isValid = true;
    for(i in data){
      if(data[i].username === username){
        alert("username taken, please select a new username.");
        isValid = false;
      }
      if(data[i].email === email){
        alert("email already in use");
        isValid = false
      }
    }
    if(isValid === true){
      var jsonObj = {
        "username":username,
        "email":email,
        "password":password,
        "first_name":firstName,
        "last_name":lastName,
        "auth_level":auth_level
      };

       $.ajax({
          url: "https://csc-394-backend.herokuapp.com/users/",
          contentType: "application/json",
          type: "POST",
          data: JSON.stringify(jsonObj),
          success: function(msg){
            alert("Success");
            window.location = `homepage.html?/user/${username}`;
          },
          error: function(msg){
            alert("error, try again");
          }
        });
    }
});
}
