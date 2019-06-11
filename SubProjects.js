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
})


