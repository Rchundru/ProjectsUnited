const aarr = window.location.href.split('/');
const owner = aarr[aarr.length - 1];
const pid = aarr[aarr.length - 2];
const geturl = "https://csc-394-backend.herokuapp.com/projects/" + pid + "/assignments/";
const rosterurl = "https://csc-394-backend.herokuapp.com/assignmentRoster/" + owner + "/";

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
        },
        error: function(data) {
            alert("Oh god it's all on fire help!")
        }
    });
});

function loadAssignments(assignments) {
    console.log(assignments)
	$.each(assignments, function(i, assignment) {
        console.log(assignment);

        $.ajax({
            type: 'GET',
            url: rosterurl + assignment.aid,
            contentType: "application/json",
            success: function(data) {
                var toLoad = assignment;
                loadAssignment(data, toLoad)
            },
            error: function(data) {
                alert("Oh god it's all on fire help!")
            }
        })
    })
}

function loadAssignment(data, toLoad) {
    console.log(typeof data);
    console.log(data);
    if(data == "") return;
    else {
        $('#table').append(`     
            <tr onclick="routeToAssignment(${toLoad.aid})">
                <td>${toLoad.aname}</td>
            </tr> `);
    }
}

function routeToAssignment(aid) {
    window.location = "userAssignment.html?/" + aid;
}