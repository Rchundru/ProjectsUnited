function editComment(){
           var CID= parseInt(document.getElementById("Cid").value);
           var author = document.getElementById("AUTHOR").value;
           var status = document.getElementById("STATUS").value;
           var body = document.getElementById("BODY").value;
           var timestamp;

           $.getJSON('https://csc-394-backend.herokuapp.com/comments/' + CID, function(data) {
               timestamp = `${data.timestamp}`;
                var jsonObj = {
                                            "cid":CID ,
                                            "status":status,
                                            "body":body,
                                            "timestamp":timestamp,
                                            "author":author};
           $.ajax({
               url: "https://csc-394-backend.herokuapp.com/comments/" + CID,
               contentType: "application/json ",
               type: "PUT",
               data: JSON.stringify(jsonObj),
               success: function(msg){
                   alert("Success");
               },
               error: function(msg){
                   alert("user not found, please enter a valid username");
               }
           });
               document.getElementById("url").innerHTML = JSON.stringify(jsonObj);
           });

       }

        $.getJSON('https://csc-394-backend.herokuapp.com/comments/', function(data) {
            var jsonObjs = JSON.stringify(data);
            var list = "";
            var table = '<table><tr><th>CID</th><th>Status</th><th>Body</th><th>Timestamp</th><th>Author</th></tr>';
            for(i in data){
                /* list +='<b>Username:</b> ' + data[i].username + ', <b>Email:</b> ' + data[i].email + ', <b>First Name:</b> ' + data[i].first_name+', <b>Last Name:</b> ' + data[i].last_name +
                     ', <b>Authentication Level:</b> ' +data[i].auth_level +'<br>'; */
                list += "<tr><td>" + data[i].cid + "</td><td>" + data[i].status +
                    "</td><td>" + data[i].body + "</td><td>" + data[i].timestamp +
                    "</td><td>" + data[i].author + "</td></tr>";

            //console.log(data[i].username +" "+ data[i].first_name);
            }
            document.getElementById("allComments").innerHTML = table + list + "</table>";
        });
