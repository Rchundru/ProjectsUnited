function editAssignment(){

  var assignmentid= document.getElementById("AID").value;
  var owner = document.getElementById("OWNER").value;
  var aname = document.getElementById("ANAME").value;
  var project = document.getElementById("PRO").value;

  $.getJSON("https://csc-394-backend.herokuapp.com/assignments/" + assignmentid, function(data) {
    if(owner === undefined || owner === ""){
      owner = `${data.owner}`
    }
    if(aname === undefined || aname === ""){
      aname = `${data.aname}`
    }
    if(project === undefined || project === ""){
      project = `${data.parent}`
    }
    var jsonObj = {
      "aid":assignmentid,
      "owner":owner,
      "aname":aname,
      "parent":project};

      $.ajax({
        url: "https://csc-394-backend.herokuapp.com/assignments/" + assignmentid,
        contentType: "application/json",
        type: "PUT",
        data: JSON.stringify(jsonObj),
        success: function(msg){
          alert("Success");
        },
        error: function(msg){
          alert("Assignment not found, please enter a valid assignment name.");
        }
      });
    });
  }

  function deletePro(){
    var aid= document.getElementById("AIDD").value;
    $.ajax({
      url: "https://csc-394-backend.herokuapp.com/assignments/" + aid,
      type: "DELETE",
      success: function(msg){
        alert("Assignment deleted");
      },
      error: function(msg){
        alert(("Unknown Assignment, please enter a valid Assignment"))
      }
    });
    var url = "https://csc-394-backend.herokuapp.com/assignments/" + aname;
    document.getElementById("url").innerHTML = url;
    $.getJSON('https://csc-394-backend.herokuapp.com/assignments/', function(data) {
      var jsonObjs = JSON.stringify(data);
      document.getElementById("assignmentsList").innerHTML = jsonObjs;
    });
  }

  $.getJSON('https://csc-394-backend.herokuapp.com/assignments/', function(data) {
    var jsonObjs = JSON.stringify(data);
    var list = "";
    var table = '<table><tr><th>AID</th><th>A Name</th><th>Owner</th><th>Parent</th></tr>';
    for(i in data){
      list += "<tr><td>" + data[i].aid + "</td><td>" + data[i].aname +
      "</td><td>" + data[i].owner + "</td><td>" + data[i].parent +"</td></tr>";
    }
    document.getElementById("assignmentsList").innerHTML = table+ list + "</table>";
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

                  window.location = `Admin-Rosters.html?/${user}`;
          })
          $('#projects').on('click', function() {

                  window.location = `Admin-projects.html?/${user}`;
          })
          $('#sprojects').on('click', function() {

                  window.location = `Admin-subprojects.html?/${user}`;
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
