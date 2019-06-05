function editUser(){
  var username= document.getElementById("uName").value;
  var email = document.getElementById("EMAIL").value;
  var password = "";
  var firstname = document.getElementById("FIRSTNAME").value;
  var lastname = document.getElementById("LASTNAME").value;
  var authlvl = document.getElementById("AUTHLVL").value;
  var jsonObj = '';

  $.getJSON('https://csc-394-backend.herokuapp.com/users/' + username, function(data) {
    password = `${data.password}`;
    if(email === undefined || email === ""){
      email = `${data.email}`;
    }
    if(firstname === undefined || firstname === ""){
      firstname = `${data.first_name}`;
    }
    if(lastname === undefined || lastname === ""){
      lastname = `${data.last_name}`;
    }
    if(authlvl === undefined || authlvl === ""){
      authlvl = `${data.auth_level}`;
    }
    jsonObj = '{"username":' + '"' + username + '"' + ','+
    '"email":' + '"' + email + '"' + ','+
    '"password":' + '"' + password + '"' + ',' +
    '"first_name":' + '"' + firstname + '"' + ',' +
    '"last_name":' + '"' + lastname + '"' + ',' +
    '"auth_level":' + '"' + authlvl + '"' +'}';

    $.ajax({
      url: "https://csc-394-backend.herokuapp.com/users/" + username,
      contentType: "application/json",
      type: "PUT",
      data: JSON.stringify(jsonObj),
      success: function(msg){
        alert("Success");
      },
      error: function(msg){
        alert("user not found, please enter a valid username");
      }
    });
  });

  $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
    var list = "";
    var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
    for(i in data){
      list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
      "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
      "</td><td>" + data[i].auth_level + "</td></tr>";
    }

    document.getElementById("userList").innerHTML = table+ list + "</table>";
  });
}
function deleteUser(){
  var username= document.getElementById("USERNAME").value;
  $.ajax({
    url: "https://csc-394-backend.herokuapp.com/users/" + username,
    type: "DELETE",
    success: function(msg){
      alert("User deleted: " + msg);
    },
    error: function(msg){
      alert(("Unknown user, please enter a valid username"))
    }
  });
  $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
    var list = "";
    var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
    for(i in data){
      list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
      "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
      "</td><td>" + data[i].auth_level + "</td></tr>";
    }

    document.getElementById("userList").innerHTML = table+ list + "</table>";
  });
}

$.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
  var list = "";
  var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
  for(i in data){
    list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
    "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
    "</td><td>" + data[i].auth_level + "</td></tr>";
  }

  document.getElementById("userList").innerHTML = table+ list + "</table>";
});
