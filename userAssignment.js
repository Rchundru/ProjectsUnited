
const aarr = window.location.href.split('/');
const aid = aarr[aarr.length -1 ];
const owner = aarr[aarr.length - 2];
const pid = aarr[aarr.length - 3];
const geturl = "https://csc-394-backend.herokuapp.com/assignments/" + aid;
const rosterurl = "https://csc-394-backend.herokuapp.com/assignmentRoster/" + owner + "/" + aid;

$(document).ready( function() {
    const page = aarr[aarr.length-4];

    const auth = page.indexOf("prof");

    // Top Bar Navigation
    $('#home').on('click', function() {
        window.location = `homepage.html?/${owner}`;
    });

    $('#projects').on('click', function() {
        window.location =  `userProjects.html?/${owner}`;
    });

    $('#project').on('click', function() {
        window.location =  `userProject.html?/${pid}/${owner}`;
    });   
    
    $('#assignments').on('click', function() {
        window.location =  `userAssignments.html?/${pid}/${owner}`;
    }); 

    //if(auth === -1){ return; }

    $.ajax({
        type: 'GET',
        url: geturl,
        contentType: "application/json",
        success: function(assignment) {
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
        success: function(assignment_roster) {
            $('#aname').append(`
                <h2>${assignment.aname}</h2>`
            );
            
            $('#table').append(`
                <tr>
                    <td>${assignment_roster.grade}</td>
                <tr>`
            );
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

function showForm() {
    document.getElementById("addForm").style.display="block";
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