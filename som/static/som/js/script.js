

var selected_node = -1;

// var num_sent = 0;
// var start_time = new Date();
// var avg = -1;
// var mx = 0;
// var mn = 1000000;

// var graph = [0, "hello", 0, 0, [[1, "x", 200, 200, []], [2, "y", 500, 100, []]]];

// function makeGraph(id, g) {
//   curid = "node" + g[0];
//   var node = $("#" + curid);
//   if (!node) {
//     $("#container")[0].innerHTML += "<div id='" + curid + "' class='node'>" + g[1] + "</div>";
//     node = $("#" + curid);
//   }
//   node.css('left', g[2] +'px');
//   node.css('top', g[3] +'px');
//   var numKidz = g[4].length;
//   for(var i = 0; i < numKidz; i++) {
//     makeGraph(curid, g[4][i]);
//   }
// }

// $(document).ready(function () {
//     // Ajax setup to forward the CSRF token
//     $.ajaxSetup({
//         beforeSend: function (xhr, settings) {
//             // generate CSRF token using jQuery
//             var csrftoken = $.cookie('csrftoken');
//             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
//                 // Only send the token to relative URLs i.e. locally.
//                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//         }
//     });

//     makeGraph("container", graph);

//     // TABS

//     $("#textTabBtn").click(function(){
//         $("#textTab").show();
//         $("#imageTab").hide();
//         $("#doodleTab").hide();
//     });

//     $("#imageTabBtn").click(function(){
//         $("#textTab").hide();
//         $("#imageTab").show();
//         $("#doodleTab").hide();
//     });

//     $("#doodleTabBtn").click(function(){
//         $("#textTab").hide();
//         $("#imageTab").hide();
//         $("#doodleTab").show();
//     });

//   // CANVAS

//   var el = $('#canvas')[0];
//   var ctx = el.getContext('2d');

//   ctx.lineWidth = 10;
//   ctx.lineJoin = ctx.lineCap = 'round';
//   ctx.shadowBlur = 10;
//   ctx.shadowColor = 'rgb(0, 0, 0)';

//   var isDrawing, points = [ ];

//   el.onmousedown = function(e) {
//     isDrawing = true;
//     var pos = getMousePos(canvas, e);
//     points.push({ x: pos.x, y: pos.y });
//   };

//   el.onmousemove = function(e) {
//     if (!isDrawing) return;

//     // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     var pos = getMousePos(canvas, e);
//     points.push({ x: pos.x, y: pos.y });

//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);
//     for (var i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//     }
//     ctx.stroke();
//   };

//   el.onmouseup = function() {
//     isDrawing = false;
//     points.length = 0;
//   };


// });

// function getMousePos(canvas, evt) {
//     var rect = canvas.getBoundingClientRect();
//     return {
//       x: evt.clientX - rect.left,
//       y: evt.clientY - rect.top
//     };
// }

// function poll() {
//   start_time = new Date();
//   setInterval(function () {
//     var send = new Date();
//     $.get('/som/poll', {
//           "me": "poll"
//         }, function (data) {
//           if (data == "ok") {
//             num_sent += 1;
//             var diff = new Date() - send;
//             if (avg == -1)
//               avg = diff;
//             else
//               avg = (avg + diff) / 2;
//             mx = diff > mx ? diff : mx;
//             mn = diff < mn ? diff : mn;
//             $("#poll")[0].innerHTML = "average is " + avg + " over " + num_sent + " requests\n max is " + mx + " min is " + mn;
//           }
//         });
//   }, 200);
// }

function submitText () {
  // var selectedNode = $("#nodeSelection")[0].value;
  var textInput = $("#textInput")[0].value;
  var el = $('#textCanvas')[0];
  var ctx = el.getContext('2d');
  ctx.clearRect(0, 0, el.width, el.height);
  ctx.font = "32px Arial, Helvetica, sans-serif";
  ctx.fillStyle = "#FFF"
  ctx.textAlign = 'center';
  ctx.fillText(textInput,el.width/2, el.height/2);
  dataURL = el.toDataURL();
  console.log(dataURL);

  $.get('/som/getTextInput/', {
          "text": dataURL,
          "caption": textInput,
          "selectedNode": selected_node
        }, function (data) {
          selected_node = data;
          console.log("made it " + data);
        });
}

function selectPic (index, urlImg) {
  id = "#pic" + index;
  $(id).css({"margin": "0px"});
  $(".pic > img").css({"border-style": ""});
  $(id + "> img").css({"border-style": "solid", "border-width": "8px", "border-color": "#f1103a"});
  $("#imageInput")[0].value = urlImg;

}



function searchImage () {
  var searchQuery = $("#searchImage")[0].value;
  $.get('/som/searchImage/', {
          "searchQuery": searchQuery,
          "selectedNode": selected_node
        }, function (data) {
          if (data != null) {
            console.log(JSON.parse(data));
            // console.log(JSON.parse(data)['images']);
            $("#khara")[0].innerHTML = "";
            for (var i = 0; i < JSON.parse(data)['images'].length ; i++) {
              url = JSON.parse(data)['images'][i]['display_sizes'][0]['uri'];
              console.log(JSON.parse(data)['images'][i]['display_sizes'][0]['uri']);
              $("#khara")[0].innerHTML += "<div id='pic" + i + "' class='pic' onclick='selectPic(" + i + ",\"" + url +"\")'> <img src=\'" +JSON.parse(data)['images'][i]['display_sizes'][0]['uri'] + "'> </div>";
            };


          }
        });
}


function submitImage () {
  // var selectedNode = $("#nodeSelection")[0].value;
  var imageInput = $("#imageInput")[0].value;
  var caption = $("#searchImage")[0].value;
  console.log(imageInput);
  $.get('/som/getImageInput/', {
          "image": imageInput,
          "caption": caption,
          "selectedNode": selected_node
        }, function (data) {
          selected_node = data;
        });
}

function submitDoodle () {
  // var selectedNode = $("#nodeSelection")[0].value;
  var canvas = $('#draw')[0];
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  $.get('/som/getDoodleInput/', {
          "doodle": dataURL,
          "selectedNode": selected_node
        }, function (data) {
          if (data == "ok") {
            console.log("recieved ok");
          }
        });
}





// DAAAAAUUUUUUUUNNNNNNNNN ///////////////////////////////

function load_navbar_helper(g) {
  var ret = '<li><i class="fa fa-trash fa-lg" onclick="del(\''+g[0]+'\')"></i><a href="#" class="node" onclick="cool(\''+g[0]+'\')">'+g[1]+'</a></li>';
  var numKidz = g[5].length;
  for (var i = 0; i < numKidz; i++)
    ret += load_navbar_helper(g[5][i]);
  return ret;
}

function load_navbar(g) {
  $(".sidebar-nav")[0].innerHTML =
               '<li class="sidebar-brand">\
                    <a href="#" onclick="cool(\''+g[0]+'\')">\
                        '+ g[1] +'\
                    </a>\
                </li>';
                 + load_navbar_helper(g);
  var numKidz = g[5].length;
  for (var i = 0; i < numKidz; i++) {
    $(".sidebar-nav")[0].innerHTML += load_navbar_helper(g[5][i]);
  }
  console.log("cool");
}

function cool(s){
  $("#child")[0].innerHTML = s;
  selected_node = s;
  console.log("khara");
  $.get('/som/focus/', {
          "target": s
        }, function (data) {

          $("#wrapper").toggleClass("toggled");
          // selected_node = data;
        });
}

function del(s){

  // var selectedNode = $("#nodeSelection")[0].value;
  var deleteNode = s;
  console.log(imageInput);
  $.get('/som/deleteNode/', {
          "deleteNode": deleteNode,
        }, function (data) {

          $("#wrapper").toggleClass("toggled");
          selected_node = -1;
        });
}

$(document).ready(function(){

    $("#menu-toggle1").click(function(e) {
      console.log("asdas");
      $.get("/som/poll/", {"no_content": true}, function (data) {
        if (data[0] == '[') {
          load_navbar(JSON.parse(data));
          $("#wrapper").toggleClass("toggled");
        }
      });
    });
  $("#menu-toggle2").click(function(e) {
      console.log("something 2");
      e.preventDefault();
      $.get("/som/poll/", {"no_content": true}, function (data) {
        if (data[0] == '[') {
          load_navbar(JSON.parse(data));
          $("#wrapper").toggleClass("toggled");
        }
      });
    });
  $("#menu-toggle3").click(function(e) {
      e.preventDefault();
      $.get("/som/poll/", {"no_content": true}, function (data) {
        if (data[0] == '[') {
          load_navbar(JSON.parse(data));
          $("#wrapper").toggleClass("toggled");
        }
      });
    });

  $("#Noshift").click(function(){
    $("#hack").text("2");
    $("#mapp").html('<i class="fa fa-picture-o fa-2x">');
    $('#page-content-wrapper2').css("display","block");
    $('#page-content-wrapper').css("display", "none")
    $("#page-content-wrapper2").animate({
      marginLeft: "0",
    },500);
  });
  $("#Noshift2").click(function(){
    $("#hack").text("3");
    $("#mapp").html('<i class="fa fa-text-width fa-2x">');
    $('#page-content-wrapper3').css("display","block");
    $('#page-content-wrapper2').css("display","none");
    $("#page-content-wrapper3").animate({
      marginLeft: "0",
    },500);

  });
  $("#shift2").click(function(){
    $("#hack").text("1");
    $("#mapp").html('<i class="fa fa-pencil fa-2x">');
    $("#page-content-wrapper2").animate({
      marginLeft: "-100%",
    },500, function(){
      $('#page-content-wrapper2').css("display","none");
      $('#page-content-wrapper').css("display","block");
    });

  });
  $("#shift3").click(function(){
    $("#hack").text("2");
    $("#mapp").html('<i class="fa fa-picture-o fa-2x">');
    $("#page-content-wrapper3").animate({
      marginLeft: "-100%",
    },500, function() {
    // Animation complete.
      $('#page-content-wrapper3').css("display","none");
    $('#page-content-wrapper2').css("display","block");
    });
  });

  $("#submit").click(function(){
    var val = $("#hack").text();
    var x = parseInt(val);
    if (x == 1){
      console.log("it is 1")
      submitDoodle();
      $("#page-content-wrapper").animate({
        marginTop: "-100%",
      },500);
      $("#page-content-wrapper").animate({
        marginTop: "0%",
      },10);
    }
    if (x == 2){
      console.log("it is 2")
      submitImage();

      $("#page-content-wrapper2").animate({
        marginTop: "-100%",
      },500);
      $("#page-content-wrapper2").animate({
        marginTop: "0%",
      },10);
    }
    if (x == 3){
      console.log("it is 3")

      submitText ();
      $("#textInput")[0].value = "";
      $("#page-content-wrapper3").animate({
        marginTop: "-100%",
      },500);
      $("#page-content-wrapper3").animate({
        marginTop: "0%",
      },10);
    }
  });

  $(".fa-trash").click(function(){
    alert('delete clicked');
  });

  $("#page-content-wrapper").css({
    "height":$(window).height()
  });
  $("#page-content-wrapper2").css({
    "height":$(window).height()
  });
  $("#page-content-wrapper3").css({
    "height":$(window).height()
  });

// // // // // // // CANVAS // // // // // // // //

  // var el = $('#draw')[0];
  // var ctx = el.getContext('2d');

  // ctx.lineWidth = 10;
  // ctx.lineJoin = ctx.lineCap = 'round';
  // ctx.shadowBlur = 10;
  // ctx.shadowColor = 'rgb(0, 0, 0)';

  // var isDrawing, points = [ ];

  // el.onmousedown = function(e) {
  //   isDrawing = true;
  //   var pos = getMousePos(el, e);
  //   points.push({ x: pos.x, y: pos.y });
  // };

  // el.onmousemove = function(e) {
  //   if (!isDrawing) return;

  //   // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   var pos = getMousePos(el, e);
  //   points.push({ x: pos.x, y: pos.y });

  //   ctx.beginPath();
  //   ctx.moveTo(points[0].x, points[0].y);
  //   for (var i = 1; i < points.length; i++) {
  //     ctx.lineTo(points[i].x, points[i].y);
  //   }
  //   ctx.stroke();
  // };

  // el.onmouseup = function() {
  //   isDrawing = false;
  //   points.length = 0;
  // };


  ////////////////////////////////////////////////////////


 // var can, ctx, canX, canY, mouseIsDown = 0;

 //        function init() {
 //            can = $("#draw")[0];
 //            ctx = can.getContext("2d");

 //            can.addEventListener("mousedown", mouseDown, false);
 //            can.addEventListener("mousemove", mouseXY, false);
 //            can.addEventListener("touchstart", touchDown, false);
 //            can.addEventListener("touchmove", touchXY, true);
 //            can.addEventListener("touchend", touchUp, false);

 //            document.body.addEventListener("mouseup", mouseUp, false);
 //            document.body.addEventListener("touchcancel", touchUp, false);
 //        }
 //       init();
 //        function mouseUp() {
 //            mouseIsDown = 0;
 //            mouseXY();
 //        }

 //        function touchUp() {
 //            mouseIsDown = 0;
 //            // no touch to track, so just show state
 //            showPos();
 //        }

 //        function mouseDown() {
 //            mouseIsDown = 1;
 //            mouseXY();
 //        }

 //        function touchDown() {
 //            mouseIsDown = 1;
 //            touchXY();
 //        }

 //        function mouseXY(e) {
 //            if (!e)
 //                var e = event;
 //            canX = e.pageX - can.offsetLeft;
 //            canY = e.pageY - can.offsetTop;
 //            showPos();
 //        }

 //        function touchXY(e) {
 //            if (!e)
 //                var e = event;
 //            e.preventDefault();
 //            canX = e.targetTouches[0].pageX - can.offsetLeft;
 //            canY = e.targetTouches[0].pageY - can.offsetTop;
 //            showPos();
 //        }

 //        function showPos() {
 //            // large, centered, bright green text
 //            ctx.font = "24pt Helvetica";
 //            ctx.textAlign = "center";
 //            ctx.textBaseline = "middle";
 //            ctx.fillStyle = "rgb(64,255,64)";
 //            var str = canX + ", " + canY;
 //            if (mouseIsDown)
 //                str += " down";
 //            if (!mouseIsDown)
 //                str += " up";
 //            ctx.clearRect(0, 0, can.width, can.height);
 //            // draw text at center, max length to fit on canvas
 //            ctx.fillText(str, can.width / 2, can.height / 2, can.width - 10);
 //            // plot cursor
 //            ctx.fillStyle = "white";
 //            ctx.fillRect(canX -5, canY -5, 10, 10);
 //        }





 //  ////////////////////////////////////////////////////////




 //  function getMousePos(canvas, evt) {
 //      var rect = canvas.getBoundingClientRect();
 //      return {
 //        x: evt.clientX - rect.left,
 //        y: evt.clientY - rect.top
 //      };
 //  }



$(function() {
    $('#draw').sketch();
});




// // // // // // Canvas // // // // // // //




(function () {
        detectPortrait();
        $(window).resize(function() {
            detectPortrait("#mainView");
        });


        function detectPortrait(mainDiv) {
            if (screen.width < screen.height) {
                $(mainDiv).addClass("portrait_mode");
            }
            else {
                $(mainDiv).removeClass("portrait_mode");
            }
        }
    })();

});










