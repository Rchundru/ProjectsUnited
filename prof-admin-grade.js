function editGrade(){
  var username = document.getElementById("uName").value;
  var assignment = document.getElementById("ASSIGNMENT").value;
  var grade = document.getElementById("GRADE").value;
  var jsonObj = {
    "grade":grade ,
    "asmtRoster":{
      "asmt": assignment,
      "student":username
    }};
    $.ajax({
      url: "https://csc-394-backend.herokuapp.com/assignmentRoster/" + username + "/" + assignment,
      contentType: "application/json ",
      type: "PUT",
      data: JSON.stringify(jsonObj),
      success: function(msg){
        alert("Success");
      },
      error: function(msg){
        alert("user not found, please enter a valid username");
      }
    });
  }

  function addGrade(){
    var username = document.getElementById("uNamea").value;
    var assignment = document.getElementById("ASSIGNMENTA").value;
    var grade = document.getElementById("GRADEA").value;
    var jsonObj = {
      "grade":grade ,
      "asmtRoster":{
        "asmt": assignment,
        "student":username
      }};
      $.ajax({
        url: "https://csc-394-backend.herokuapp.com/assignmentRoster/",
        contentType: "application/json ",
        type: "POST",
        data: JSON.stringify(jsonObj),
        success: function(msg){
          alert("Success");
        },
        error: function(msg){
          alert("user not found, please enter a valid username");
        }
      });
    }

    function deleteGrade(){
      var username = document.getElementById("uNameD").value;
      var assignment = document.getElementById("ASSIGNMENTD").value;

        $.ajax({
          url: "https://csc-394-backend.herokuapp.com/assignmentRoster/" + username + "/" + assignment,
          type: "DELETE",
          success: function(msg){
            alert("Success");
          },
          error: function(msg){
            alert("user not found, please enter a valid username");
          }
        });
      }

      $.getJSON('https://csc-394-backend.herokuapp.com/assignmentRoster/', function(data) {
          var jsonObjs = JSON.stringify(data);
          var list = "";
          var table = '<table><tr><th>Username</th><th>Assignment</th><th>Grade</th></tr>';
          for(i in data){
              /* list +='<b>Username:</b> ' + data[i].username + ', <b>Email:</b> ' + data[i].email + ', <b>First Name:</b> ' + data[i].first_name+', <b>Last Name:</b> ' + data[i].last_name +
                   ', <b>Authentication Level:</b> ' +data[i].auth_level +'<br>'; */
              list += "<tr><td>" + data[i].asmtRoster.student + "</td><td>" + data[i].asmtRoster.asmt +
                  "</td><td>" + data[i].grade + "</td></tr>";

          //console.log(data[i].username +" "+ data[i].first_name);
          }
          document.getElementById("allGrades").innerHTML = table + list + "</table>";
      });
