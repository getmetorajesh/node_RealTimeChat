window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:4001');
    var name = document.getElementById("name");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += "<b>"+(messages[i].username ? messages[i].username:"server")+": </b>";
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight; // Won't work on ie7
        } else {
            console.log("There is a problem:", data);
        }
    });

    //sendButton.onclick = sendMessage = function() {
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text, username:name.value });
        field.value = "";
    };

}

/*
$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});
*/
