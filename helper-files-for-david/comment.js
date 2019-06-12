var sid = 2;
const geturl = 'https://csc-394-backend.herokuapp.com/subprojects/';
const posturl = 'https://csc-394-backend.herokuapp.com/comments/';
var whoami = 'ggk';

function postComment() {
	alert("Running post method.");

	// Get the body of the comment.
	var body = document.getElementById("body").value;

	// Get all the statuses (stati?), and pick the one that's selected.
	var status = document.querySelector('input[name="status"]:checked').value;

	// Get the author (somehow).
	var author = whoami;

	alert("Building JSON object.");

	var jsonObj = {
		"status": status,
		"body": body,
		"author": author,
		"sub_projects": [
			{
				"sid": sid
			}
		]
	};

	alert("Posting comment.");

	$.ajax({
		url: posturl,
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(jsonObj),
		success: function(data) {
			//location.reload();
			alert("Great success!");
		},
		error: function(data) {
			alert("Could not post comment; data transmission error.");
		}
	});

	alert("Another alert (just cause).");
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

// When the page loads,
$(document).ready( function() {
	// Make a query,
	$.ajax({
		url: geturl + sid,
        contentType: "application/json",
        type: "GET",
        // and if it succeeds, fill out our table.
        success: function(data){
            fillTable(data);
        },
        error: function(data){
            alert("Something went wrong!");
        }
	});
})

