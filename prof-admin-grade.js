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
      var list = "";
      var table = '<table><tr><th>Username</th><th>First Name</th><th>Last Name</th><th>Assignment</th><th>Grade</th></tr>';

      $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(result) {
        for(i in data){
          for(j in result){
            if(data[i].asmtRoster.student === result[j].username){
              list += "<tr><td>" + data[i].asmtRoster.student +
              "</td><td>" + result[j].first_name +
              "</td><td>" + result[j].last_name +
              "</td><td>" + data[i].asmtRoster.asmt +
              "</td><td>" + data[i].grade + "</td></tr>";
            }
          }
        }
        document.getElementById("allGrades").innerHTML = table + list + "</table>";
      });
    });
    $(document).ready(function() {
        const aarr = window.location.href.split('/');

        const user = aarr[aarr.length -1];

        const auth_level = aarr[aarr.length-2];

        // Top Bar Navigation
        $('#home').on('click', function() {

                window.location = `adminHomepage.html?/${user}`;
        })
        $('#agrades').on('click', function() {

                    window.location = `prof-admin-aGrades.html?/${user}`;
            })
            $('#pgrades').on('click', function() {

                    window.location = `prof-admin-projectGrades.html?/${user}`;
            })
            $('#rosters').on('click', function() {

                    window.location = `admin%20-%20Rosters.html?/${user}`;
            })
            $('#projects').on('click', function() {

                    window.location = `Admin-projects.html?/${user}`;
            })
            $('#sprojects').on('click', function() {

                    window.location = `admin%20-%20subprojects.html?/${user}`;
            })
            $('#assignments').on('click', function() {

                    window.location = `Admin-assignments.html?/${user}`;
            })
            $('#users').on('click', function() {

                    window.location = `users.html?/${user}`;
            })
            $('#comments').on('click', function() {

                    window.location = `comments.html?/${user}`;
            })
    });
