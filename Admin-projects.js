function editUser(){
  var proid= document.getElementById("pID").value;
  var owner = document.getElementById("OWNER").value;
  var pname = document.getElementById("PNAME").value;
  var dueD = document.getElementById("DUED").value;
  var stat = document.getElementById("STAT").value;

  $.getJSON("https://csc-394-backend.herokuapp.com/projects/" + proid, function(data) {
    if(owner === undefined || owner === ""){
      owner = `${data.owner}`;
    }
    if(pname === undefined || pname === ""){
      pname = `${data.pname}`;
    }
    if(dueD === undefined || dueD === ""){
      dueD = `${data.due_date}`;
    }
    if(stat === undefined || stat === ""){
      stat = `${data.status}`;
    }


    var jsonObj = {
      "pid":proid,
      "owner":owner,
      "pname":pname,
      "due_date":dueD,
      "status":stat};

      $.ajax({
        url: "https://csc-394-backend.herokuapp.com/projects/" + proid,
        contentType: "application/json",
        type: "PUT",
        data: JSON.stringify(jsonObj),
        success: function(msg){
          alert("Success");
        },
        error: function(msg){
          alert("Project not found, please enter a valid project name");
        }
      });
    });
  }
  function deletePro(){
    var pID= document.getElementById("PRO").value;
    $.ajax({
      url: "https://csc-394-backend.herokuapp.com/projects/" + pID,
      type: "DELETE",
      success: function(msg){
        alert("Project deleted: " + msg);
      },
      error: function(msg){
        alert(("Unknown project, please enter a valid project"))
      }
    });
    var url = "https://csc-394-backend.herokuapp.com/projects/" + pname;
    document.getElementById("url").innerHTML = url;
  }
  $.getJSON('https://csc-394-backend.herokuapp.com/projects/', function(data) {
    var jsonObjs = JSON.stringify(data);
    var list = "";
    var table = '<table><tr><th>PID</th><th>P Name</th><th>Owner</th><th>Status</th><th>Due Date</th></tr>';
    for(i in data){
      list += "<tr><td>" + data[i].pid + "</td><td>" + data[i].pname +
      "</td><td>" + data[i].owner + "</td><td>" + data[i].status +
      "</td><td>" + data[i].due_date + "</tr>";
    }
    document.getElementById("projectsList").innerHTML = table+ list + "</table>";
  });
