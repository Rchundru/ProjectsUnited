function editComment(){
  var CID= parseInt(document.getElementById("Cid").value);
  var author = document.getElementById("AUTHOR").value;
  var status = document.getElementById("STATUS").value;
  var body = document.getElementById("BODY").value;
  var timestamp;

  $.getJSON('https://csc-394-backend.herokuapp.com/comments/' + CID, function(data) {
    timestamp = `${data.timestamp}`;
    if(status === undefined || status === ""){
      status = `${data.status}`;
    }
    if(body === undefined || body === ""){
      body = `${data.body}`;
    }
    if(author === undefined || author === ""){
      author = `${data.author}`;
    }
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

  function deleteComment(){
    var cid = document.getElementById("CID").value;
    $.ajax({
      url: "https://csc-394-backend.herokuapp.com/comments/" + cid,
      type: "DELETE",
      success: function(msg){
        alert("Comment deleted: " + msg);
      },
      error: function(msg){
        alert(("Unknown comment, please enter a valid CID"))
      }
    });
  }

  $.getJSON('https://csc-394-backend.herokuapp.com/comments/', function(data) {
    var list = "";
    var table = '<table><tr><th>CID</th><th>Status</th><th>Body</th><th>Timestamp</th><th>Author</th></tr>';
    for(i in data){
      list += "<tr><td>" + data[i].cid + "</td><td>" + data[i].status +
      "</td><td>" + data[i].body + "</td><td>" + data[i].timestamp +
      "</td><td>" + data[i].author + "</td></tr>";
    }
    document.getElementById("allComments").innerHTML = table + list + "</table>";
  });
