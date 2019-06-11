$(document).ready( function() {
    const aarr = window.location.href.split('/');
    const sid = aarr[aarr.length-1]
    const user = aarr[aarr.length -2];
    const parent = aarr[aarr.length-3];

    let projectOwner;
    let projectStatus;
    let commentCount = 0;
    let subProjectCount = 0;
    let assignmentCount = 0;

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

            $('#header').append(`   <h1>${subProject.sname}</h1>
                                    <b>
                                    <table>
                                        <tr>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                        </tr>
                                        <tr>
                                            <td>${subProject.due_date}</td>
                                            <td>${subProject.status}</td>
                                        </tr>
                                    </table>
                                   `);
        }
    });

    /*
    $.ajax({
        type: 'GET',
        url: 'https://csc-394-backend.herokuapp.com/subprojects',
        success: function(subProjects) {
            $.each(subProjects, function(i, subProject) {
                if (subProject.parent == parent)
                    $('#header').append(`
                        <b>
                        <h1>
                            <a href="userProject.html?/${subProject.sid}/${user}"
                            style="text-align: center;color:blue;">${subProject.sname}
                            </a>
                        </h1>`
                    );
            })
        }
    }) */
});

function myFunction() {
    var x = document.getElementById("myTextarea").value;
    document.getElementById("demo").innerHTML = x;
}

function editSubProjects(){

    var assignmentid= document.getElementById("AID").value;
    var owner = document.getElementById("OWNER").value;
    var aname = document.getElementById("ANAME").value;
    var project = document.getElementById("PRO").value;
    var jsonObj = '{"aid":' + '"' + assignmentid + '"' + ','+
        '"owner":' + '"' + owner + '"' + ','+
        '"aname":' + '"' + aname + '"' + ',' +
        '"project":' + '"' + project + '"' +'}';

    $.ajax({
        url: "https://csc-394-backend.herokuapp.com/assignments/" + aname,
        contentType: "application/json",
        type: "PUT",
        data: JSON.stringify(jsonObj),
        success: function(msg){
            alert("Success");
        },
        error: function(msg){
            alert("Assignment not found, please enter a valid assignment name.");
        }
    })
    $.getJSON('https://csc-394-backend.herokuapp.com/assignments/', function(data) {
        var jsonObjs = JSON.stringify(data);
        document.getElementById("assignmentsList").innerHTML = jsonObjs;
    });

    document.getElementById("assignments").innerHTML = jsonObj;
}



