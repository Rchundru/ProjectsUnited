
const aarr = window.location.href.split('/');
const aid = aarr[aarr.length -1 ];
const owner = aarr[aarr.length - 2];
const pid = aarr[aarr.length - 3];
const geturl = "https://csc-394-backend.herokuapp.com/assignments/" + aid;
const rosterurl = "https://csc-394-backend.herokuapp.com/assignmentRoster/assignment/" + aid;
const posturl = 'https://csc-394-backend.herokuapp.com/comments/';

$(document).ready( function() {
    const page = aarr[aarr.length-4];

    const auth = page.indexOf("prof");

    // Top Bar Navigation
    $('#home').on('click', function() {
        window.location = `homepage.html?/${owner}`;
    });

    $('#projects').on('click', function() {
        window.location =  `profProjects.html?/${owner}`;
    });

    $('#project').on('click', function() {
        window.location =  `profProject.html?/${pid}/${owner}`;
    });   
    
    $('#assignments').on('click', function() {
        window.location =  `profAssignments.html?/${pid}/${owner}`;
    }); 

    //if(auth === -1){ return; }

    $.ajax({
        type: 'GET',
        url: geturl,
        contentType: "application/json",
        success: function(assignment) {
            $('#aname').append(`
                    <h2>${assignment.aname}</h2>`
                );
            loadAssignment(assignment);
            fillTable(assignment);
        }
    });
});

function loadAssignment(assignment) {
    $.ajax({
        type: 'GET',
        url: rosterurl,
        contentType: "application/json",
        success: function(assignment_rosters) {
            $.each(assignment_rosters, function(i, assignment_roster) {
                
                $('#table').append(`
                    <tr>
                        <td>${assignment_roster.asmtRoster.student}</td>
                        <td>${assignment_roster.grade}</td>
                        <td>
                            <div class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary" onclick="showEditForm()">Edit Grade</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteAssignmentRoster('${assignment_roster.asmtRoster.student}')">Remove Student</button>
                                </div>
                            </div>
                        </td>
                    <tr>`
                );
            });
        }
    });
}

function routeToAssignment(aid) {
    window.location = "profAssignment.html?/" + aid;
}

function addAssignment(){
    var aname =   document.getElementById("ANAME").value;

    var jsonObj = {
        "owner":owner,
        "aname":aname,
        "parent":pid
    };

    $.ajax({
        url: "https://csc-394-backend.herokuapp.com/assignments/",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(jsonObj),
        success: function(msg){
            //alert("Success");
            location.reload();
        },
        error: function(msg){
            alert("Sub Project not found, please enter a valid sub project name");
        }
    });
}

function showAddForm() {
    document.getElementById("addForm").style.display="block";
}

function showEditForm() {
    document.getElementById("editForm").style.display="block";
}

function showEditAssignmentForm(){
    document.getElementById("editAssignmentForm").style.display="block";
}

function fillTable(data) {
	// The HTML table we'll draw.
	var table = '<table> <tr> <th>Author:</th> <th>Status:</th> <th>Comment:</th> </tr>';

	// A series of dummy table-rows.
	var list = "";
	  
	// For each comment,
	for(i in data.comments){
		// Draw a new table row,
		list += "<tr>";

		// With the author, status, and data.
		list += "<td>" + data.comments[i].author + "</td>";
		list += "<td>" + data.comments[i].status + "</td>";
	  	list += "<td>" + data.comments[i].body + "</td>";

	  	// Don't forget closing tags!
		list += "</tr>";
	}

	// Append the new rows to the table, and add a closing tag.
	table += list + "</table>";

	// Put the table into our HTML.
	document.getElementById("commentList").innerHTML = table;
}

function postComment() {
	// alert("Running post method.");

	// Get the body of the comment.
	var body = document.getElementById("body").value;

	// Get all the statuses (stati?), and pick the one that's selected.
	var stati = document.querySelector('input[name="stati"]:checked').value;

	// alert("Building JSON object.");

	var jsonObj = {
		"status": stati,
		"body": body,
		"author": owner,
		"assignments": [
			{
				"aid": aid
			}
		]
	};

	// alert("Posting comment.");

	$.ajax({
		url: posturl,
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(jsonObj),
		success: function(data) {
			alert("Great success!");
			location.reload();
		},
		error: function(data) {
			alert("Could not post comment; data transmission error.");
		}
	});

	// alert("Another alert (just cause).");
}

function addAssignmentRoster(){
    var grade = document.getElementById("AGRADE").value;
    var student = document.getElementById("ASTUDENT").value;
        
        var jsonObj = {
            "asmtRoster":{
                "asmt":aid,
                "student":student
            },
            "grade":grade
        };
        //console.log(jsonObj)

        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/assignmentRoster/",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(jsonObj),
            success: function(msg){
                //alert("Success");
                location.reload();
            },
            error: function(msg){
                alert("Assignment or User not found, please enter a valid Assignment or User name");
            }
        });
    // });

}

function editAssignmentRoster(){
    var grade = document.getElementById("GRADE").value;
    var student = document.getElementById("STUDENT").value;

    /*$.getJSON('https://csc-394-backend.herokuapp.com/subprojects/' + subid, function(data) {
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
        }*/

        var jsonObj = {
            "grade":grade
        };

        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/assignmentRoster/" + student +"/" + aid,
            contentType: "application/json",
            type: "PUT",
            data: JSON.stringify(jsonObj),
            success: function(msg){
                //alert("Success");
                location.reload();
            },
            error: function(msg){
                alert("Sub Project not found, please enter a valid sub project name");
            }
        });
    // });

}

function editAssignment(){
    var aname = document.getElementById("ANAME").value;
    
    /*$.getJSON('https://csc-394-backend.herokuapp.com/subprojects/' + subid, function(data) {
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
        }*/

        var jsonObj = {
            "aname":aname,
            "owner":owner,
            "parent": pid
        };

        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/assignments/" + aid,
            contentType: "application/json",
            type: "PUT",
            data: JSON.stringify(jsonObj),
            success: function(msg){
                //alert("Success");
                location.reload();
            },
            error: function(msg){
                alert("Assignment not found, please enter a valid Assignment name");
            }
        });
    // });

}

function deleteAssignment() {
    faith = window.confirm("Are you sure you want to delete this Assignment?")
    if (faith) {
        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/assignments/" + aid,
            type: "DELETE",
            success: function (msg) {
                alert("Assignment deleted: " + msg);
                window.location = `profAssignments.html?/${pid}/${owner}`;
            },
            error: function (msg) {
                alert(("Unknown Assignment, please enter a valid Assignment"))
            }
        });
    };
}

function deleteAssignmentRoster(student){
    faith = window.confirm("Are you sure you want to delete this Assignment?")
    if (faith) {
        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/assignmentRoster/" + student + "/" + aid,
            type: "DELETE",
            success: function (msg) {
                alert("Assignment deleted: " + msg);
                location.reload();
            },
            error: function (msg) {
                alert(("Unknown Assignment, please enter a valid Assignment"))
            }
        });
    };
}