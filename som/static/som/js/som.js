
function initiate_session() {
  var el = $('#textCanvas')[0];
  var ctx = el.getContext('2d');
  ctx.clearRect(0, 0, el.width, el.height);
  ctx.font = "32px Arial, Helvetica, sans-serif";
  ctx.fillStyle = "#FFF"
  ctx.textAlign = 'center';
  ctx.fillText($("#idea")[0].value,el.width/2, el.height/2);
  dataURL = el.toDataURL();
  console.log(dataURL);

  $.post('/som/newSession/', {
          "text": dataURL,
          "caption": $("#idea")[0].value
        }, function (data) {
          window.location = data;
        });
}