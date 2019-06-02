function editUser(){
             var username= document.getElementById("uName").value;
            var email = document.getElementById("EMAIL").value;
            var password;
            var firstname = document.getElementById("FIRSTNAME").value;
            var lastname = document.getElementById("LASTNAME").value;
            var authlvl = document.getElementById("AUTHLVL").value;
            $.getJSON('https://csc-394-backend.herokuapp.com/users/' + username, function(data) {
                password = `${data.password}`;
        });
            var jsonObj = '{"username":' + '"' + username + '"' + ','+
                '"email":' + '"' + email + '"' + ','+
                '"password":' + '"' + password + '"' + ',' +
                '"first_name":' + '"' + firstname + '"' + ',' +
                '"last_name":' + '"' + lastname + '"' + ',' +
                '"auth_level":' + '"' + authlvl + '"' +'}';
            //var json = JSON.parse(jsonObj);
            $.ajax({
                url: "https://csc-394-backend.herokuapp.com/users/" + username,
                contentType: "application/json",
                type: "PUT",
                data: JSON.stringify(jsonObj),
                success: function(msg){
                    alert("Success");
                },
                error: function(msg){
                    alert("user not found, please enter a valid username");
                }
            });
             $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
            var jsonObjs = JSON.stringify(data);
            var list = "";
            var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
            for(i in data){
                /* list +='<b>Username:</b> ' + data[i].username + ', <b>Email:</b> ' + data[i].email + ', <b>First Name:</b> ' + data[i].first_name+', <b>Last Name:</b> ' + data[i].last_name +
                     ', <b>Authentication Level:</b> ' +data[i].auth_level +'<br>'; */
                list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
                    "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
                    "</td><td>" + data[i].auth_level + "</td></tr>";

            //console.log(data[i].username +" "+ data[i].first_name);
            }

           //var json = JSON.parse(data);
            //var test = JSON.stringify(json);
            //var list = json[1].username;

            document.getElementById("userList").innerHTML = table+ list + "</table>";
        });
        }
        function deleteUser(){
            var username= document.getElementById("USERNAME").value;
                $.ajax({
                    url: "https://csc-394-backend.herokuapp.com/users/" + username,
                    type: "DELETE",
                    success: function(msg){
                        alert("User deleted: " + msg);
                    },
                    error: function(msg){
                        alert(("Unknown user, please enter a valid username"))
                    }
                });
             $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
            var jsonObjs = JSON.stringify(data);
            var list = "";
            var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
            for(i in data){
                /* list +='<b>Username:</b> ' + data[i].username + ', <b>Email:</b> ' + data[i].email + ', <b>First Name:</b> ' + data[i].first_name+', <b>Last Name:</b> ' + data[i].last_name +
                     ', <b>Authentication Level:</b> ' +data[i].auth_level +'<br>'; */
                list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
                    "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
                    "</td><td>" + data[i].auth_level + "</td></tr>";

            //console.log(data[i].username +" "+ data[i].first_name);
            }

           //var json = JSON.parse(data);
            //var test = JSON.stringify(json);
            //var list = json[1].username;

            document.getElementById("userList").innerHTML = table+ list + "</table>";
        });
        }

        $.getJSON('https://csc-394-backend.herokuapp.com/users/', function(data) {
             var jsonObjs = JSON.stringify(data);
             var list = "";
             var table = '<table><tr><th>Username</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Authentication Level</th></tr>';
             for(i in data){
                 /* list +='<b>Username:</b> ' + data[i].username + ', <b>Email:</b> ' + data[i].email + ', <b>First Name:</b> ' + data[i].first_name+', <b>Last Name:</b> ' + data[i].last_name +
                      ', <b>Authentication Level:</b> ' +data[i].auth_level +'<br>'; */
                 list += "<tr><td>" + data[i].username + "</td><td>" + data[i].email +
                     "</td><td>" + data[i].first_name + "</td><td>" + data[i].last_name +
                     "</td><td>" + data[i].auth_level + "</td></tr>";

             //console.log(data[i].username +" "+ data[i].first_name);
             }

            //var json = JSON.parse(data);
             //var test = JSON.stringify(json);
             //var list = json[1].username;

             document.getElementById("userList").innerHTML = table+ list + "</table>";
         });
