const aarr = window.location.href.split('/');
const sid = aarr[aarr.length-1]
const author = aarr[aarr.length - 2];
const user = aarr[aarr.length -2];
const geturl = "https://csc-394-backend.herokuapp.com/subprojects/";
const posturl = "https://csc-394-backend.herokuapp.com/comments/";
const parent = aarr[aarr.length-3];

$(document).ready( function() {
    let statColor;
    const page = aarr[aarr.length-4];

    const auth = page.indexOf("prof");


    // Top Bar Navigation
    $('#home').on('click', function() {
        window.location = `homepage.html?/${user}`;
    });

    $('#projects').on('click', function() {
        window.location =  `userProjects.html?/${user}`;
    });

    $('#project').on('click', function() {
        window.location =  `userProject.html?/${user}/${parent}`;
    });

    //$('#1').append("penis");
    $.ajax({
        type: 'GET',
        url: `https://csc-394-backend.herokuapp.com/subprojects/${sid}`,
        success: function(subProject) {
            if(subProject.status == 'Ongoing') statColor = 'bg-warning';
            else if(subProject.status == 'Delayed') statColor = 'bg-danger';
            else if(subProject.status == 'Complete') statColor = 'bg-success';

            if(auth === -1){
                $('#header').append(`   <h1>${subProject.sname}</h1>
                                    <b>
                                    <table>
                                        <tr>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <td rowspan="2"><div class="text-center">
                                                                <div class="btn-group">
                                                                    <button type="button" class="btn btn-primary" onclick="addForm()">Edit</button>
                                                                    <button type="button" class="btn btn-danger" onclick="delSubProject()">Delete</button>
                                                                </div>
                                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>${subProject.due_date}</td>
                                            <td class="${statColor}">${subProject.status}</td>
                                        </tr>
                                    </table>
                                   `);
            }
            else{
                $('#header').append(`   <h1>${subProject.sname}</h1>
                                    <b>
                                    <table>
                                        <tr>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                        </tr>
                                        <tr>
                                            <td>${subProject.due_date}</td>
                                            <td class="${statColor}">${subProject.status}</td>
                                        </tr>
                                    </table>
                                   `);
            }
        }
    });

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

});

function myFunction() {
    var x = document.getElementById("myTextarea").value;
    document.getElementById("demo").innerHTML = x;
}

function addForm() {
    document.getElementById("editForm").style.display="block";
}

function delSubProject() {
    faith = window.confirm("Are you sure you want to delete this SubProject?")
    if (faith) {
        $.ajax({
            url: "https://csc-394-backend.herokuapp.com/subprojects/" + sid,
            type: "DELETE",
            success: function (msg) {
                alert("Sub Project deleted: " + msg);
                window.location = `userProject.html?/${parent}/${user}`;
            },
            error: function (msg) {
                alert(("Unknown sub project, please enter a valid sub project"))
            }
        });
    };
}



function editSubProject(){
    const aarr = window.location.href.split('/');
    const subid = aarr[aarr.length-1]
    var par;
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
                //alert("Success");
                location.reload();
            },
            error: function(msg){
                alert("Sub Project not found, please enter a valid sub project name");
            }
        });
    });

}

function postComment() {
    alert("Running post method.");

    // Get the body of the comment.
    var body = document.getElementById("body").value;

    // Get all the statuses (stati?), and pick the one that's selected.
    // var stati = document.getElementsById("status").value;
    var status = document.querySelector('input[name="stati"]:checked').value;

    //alert("Building JSON object.");

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

    //alert("Posting comment.");

    $.ajax({
        url: posturl,
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(jsonObj),
        success: function(data) {
            location.reload();
            //alert("Great success!");
        },
        error: function(data) {
            //alert("Could not post comment; data transmission error.");
        }
    });

    //alert("Another alert (just cause).");
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
