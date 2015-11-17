var socket = io();

$(document).ready(function() {
  $.get('/links/all', function(data) {
    _.each(data, function(item) {
      $('#links').append($('<li>').text(item.content));
    })
  })
})

$('form').submit(function(){
  socket.emit('link', $('#send-field').val());
  $('#send-field').val('');
  return false;
});

socket.on('link', function(msg){
  $('#links').append($('<li>').text(msg));
});
