function editSPro(){
            var subid= document.getElementById("SID").value;
            var par = document.getElementById("PARENT").value;
            var sname =   document.getElementById("SNAME").value;
            var ddate = document.getElementById("DDATE").value;
            var stat = document.getElementById("STAT").value;

              $.getJSON('https://csc-394-backend.herokuapp.com/subprojects/' + subid, function(data) {
                if(par === undefined || par === ""){
                  par = `${data.parent}`;
                }
                if(sname === undefined || sname === ""){
                  sname = `${data.sname}`;
                }
                if(ddate === undefined || ddate === ""){
                  ddate = `${data.due_date}`;
                }
                if(stat === undefined || stat === ""){
                  stat = `${data.status}`;
                }

            var jsonObj = {
                          "sid":subid,
                          "parent":par,
                          "sname":sname,
                          "due_date":ddate,
                          "status":stat};

            $.ajax({
                url: "https://csc-394-backend.herokuapp.com/subprojects/" + subid,
                contentType: "application/json",
                type: "PUT",
                data: JSON.stringify(jsonObj),
                success: function(msg){
                    alert("Success");
                },
                error: function(msg){
                    alert("Sub Project not found, please enter a valid sub project name");
                }
            });
          });
        }
        function deletePro(){
                    var sid = document.getElementById("PRO").value;
                        $.ajax({
                            url: "https://csc-394-backend.herokuapp.com/subprojects/" + sid,
                            type: "DELETE",
                            success: function(msg){
                                alert("Sub Project deleted: " + msg);
                            },
                            error: function(msg){
                                alert(("Unknown sub project, please enter a valid sub project"))
                            }
                        });
                }

$.getJSON('https://csc-394-backend.herokuapp.com/subprojects/', function(data) {
  var list = "";
  var table = '<table><tr><th>SID</th><th>Parent</th><th>S Name</th><th>Status</th><th>Due Date</th></tr>';
  for(i in data){
    list += "<tr><td>" + data[i].sid + "</td><td>" + data[i].parent +
    "</td><td>" + data[i].sname + "</td><td>" + data[i].status +
    "</td><td>" + data[i].due_date + "</td></tr>";
  }

  document.getElementById("subprojectsList").innerHTML = table+ list + "</table>";
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
