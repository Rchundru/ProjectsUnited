
const aarr = window.location.href.split('/');
const owner = aarr[aarr.length - 1];
const pid = aarr[aarr.length - 2];
const geturl = "https://csc-394-backend.herokuapp.com/projects/" + pid + "/assignments/";

$(document).ready( function() {
    const page = aarr[aarr.length-3];

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

    $('.clickable-row').on('click', function($) {
        window.location = $(this).data("href");
    })

    //if(auth === -1){ return; }

    $.ajax({
        type: 'GET',
        url: geturl,
        contentType: "application/json",
        success: function(assignments) {
            loadAssignments(assignments);
        }
    });
});

function loadAssignments(assignments) {
	$.each(assignments, function(i, assignment) {
        $('#table').append(`     
            <tr onclick="routeToAssignment(${assignment.aid})">
                <td>${assignment.aname}</td>
            </tr> `);
    })
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