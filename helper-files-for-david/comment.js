var sid = 2;
const curl = 'https://csc-394-backend.herokuapp.com/subprojects/';

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
		url: curl + sid,
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

