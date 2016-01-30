
var force_wrap = [6, 6];
var max_force = 500;
var min_dist = 10050;

var default_size = [200, 200];
var camera = [0, 0, 1.0];
var edge_len = 250;
var graph = [];
/*[0, "hello", [0, 0], 10, [], [
  [1, "x", [200, 200], 1, [], [
    [5, "bro3", [201, 111], 1, [], []],
    [3, "bro1", [10, -100], 1, [], []],
    [4, "bro2", [100, 0], 1, [], [
      [6, "yaar", [200, 10], 1, [], []]
      ]]]
  ],
  [2, "y", [200, 100],  1, [], []],
  [10, "z", [100, 100],  1, [], []]
  ]
];*/

var focus_node = -1; // id (number) of the focused node
var camera_target = [0, 0];
var min_zoom = 0.5;
var max_zoom = 4.0;
var avg_zoom = 1.0;
var zoom_range = max_zoom - min_zoom;
var zoom_timer = Date.now() - 10000;

var x = 0;

function updateCamera() {
  var delta = [camera_target[0] - camera[0], camera_target[1] - camera[1]];
  var dist = Math.sqrt(delta[0]*delta[0] + delta[1]*delta[1]);
  var delta_time = Date.now() - zoom_timer;
  delta[0] *= 0.05;
  delta[1] *= 0.05;
  camera[0] += delta[0];
  camera[1] += delta[1];

  var zoom_target = 3/Math.max(Math.max(dist, 30) / 30, 1);
  delta_time = Math.max(delta_time, 0);
  if (delta_time > 10000)
    zoom_target = min_zoom;
  else if (delta_time > 5000)
    zoom_target = avg_zoom;
  camera[2] += (zoom_target - camera[2]) * 0.05;
/*
  delta_time = Math.max(delta_time, 0);
  if (delta_time < 1000) {
    var f = (delta_time-0) / 1000;
    camera[2] = max_zoom - zoom_range * f;
  } else if (delta_time < 2000) {

  } else if (delta_time < 3000) {
    var f = (delta_time-2000) / 1000;
    camera[2] = min_zoom + zoom_range * f;
  } else if (delta_time < 5000) {
  } else if (delta_time < 6000) {
    var f = (delta_time-5000) / 1000;
    camera[2] = max_zoom - (max_zoom - avg_zoom) * f;
  } else
    camera[2] = avg_zoom;*/
}

function virt_to_screen(pt) {
  return [(pt[0]*camera[2]) + window.innerWidth  / 2 - camera[0] * camera[2],
          (pt[1]*camera[2]) + window.innerHeight / 2 - camera[1] * camera[2]];
}

function makeGraph(g) {
  if (g.length == 0)
    return g;

  curid = "node" + g[0];
  var node = $("#" + curid);
  if (node.length == 0) {
    var content = "";
    if (g[3] == 0) {
      content = "<div class='texter'>" + g[1] + "</div>";
    }
    $("#container")[0].innerHTML += "<div id='" + curid + "' class='node'>"+content+"</div>";
    $("#container")[0].innerHTML += "<div id='edge-" + curid + "' class='edge'></div>";
    node = $("#" + curid);
    if (g[3] != 0)
      node.css("background-image", "url(" + g[1] + ")");
  }
  var size = [default_size[0] * camera[2], default_size[1] * camera[2]];
  var pos = virt_to_screen([g[2][0], g[2][1]]);
  node.css('left', pos[0] - size[0]/2 +'px');
  node.css('top', pos[1] - size[1]/2 +'px');
  node.css('width', size[0]);
  node.css('height', size[1]);
  var numKidz = g[5].length;
  for(var i = 0; i < numKidz; i++) {
    g[5][i] = computeGravitationForAllGraph(g[5][i], graph);
    g[5][i] = computeGravitation(g[5][i], g, 1);
    g = computeGravitation(g, g[5][i], 1);
    g[5][i] = makeGraph(g[5][i]);

    // set the kid's edge to point to me
    var edge = $("#edge-node"+g[5][i][0]);
    var delta = [g[2][0] - g[5][i][2][0], g[2][1] - g[5][i][2][1]];
    var dist = Math.sqrt(delta[0]*delta[0] + delta[1]*delta[1]);
    var epos = virt_to_screen([g[5][i][2][0] + (delta[0]/2), g[5][i][2][1] + (delta[1]/2)]);
    var normalized = [delta[0]/dist, delta[1]/dist];
    var angle = Math.atan2(normalized[1], normalized[0]);
    edge.css('width', (dist * camera[2]) + 'px');
    edge.css('margin-left', '-' + (dist * camera[2] * 0.5) + 'px');
    edge.css('left', epos[0] + 'px');
    edge.css('top', epos[1] + 'px');
    edge.css('transform', 'rotate(' + angle + 'rad)');
  }

  return g;
}

$(document).ready(function () {
  // Ajax setup to forward the CSRF token
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      // generate CSRF token using jQuery
      var csrftoken = $.cookie('csrftoken');
      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        // Only send the token to relative URLs i.e. locally.
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

  setInterval(function () {
    if (graph.length) {
      updateCamera();
      graph = computeGravitationForAllGraph(graph, graph);
      graph = makeGraph(graph);
      graph = applyGravitation(graph, 0.2);
    }
  }, 50);

  setInterval(function () {
    $.get("/som/poll/", {}, function (data) {
      if (data[0] == '[') {
        newgraph_bundle = JSON.parse(data);
        if (newgraph_bundle[1] != -1) {
          focus_node = newgraph_bundle[1];
          zoom_timer = Date.now();
        }
        graph = read_poll(newgraph_bundle[0]);
      }
    });
  }, 800);
});

function fill_dick_tionary(g, dick_tionary) {
  dick_tionary.push([g[0], g[2]]);
  var numKidz = g[5].length;
  for(var i = 0; i < numKidz; i++) {
    dick_tionary = fill_dick_tionary(g[5][i], dick_tionary);
  }
  return dick_tionary;
}

function find_in_dicktionary(dick_tionary, key) {
  for (var i = 0; i < dick_tionary.length; i++) {
    if (dick_tionary[i][0] == key)
      return dick_tionary[i][1];
  }
  return null;
}

function fix_graph(g, dick_tionary_old, parent_pos) {
  var pos = find_in_dicktionary(dick_tionary_old, g[0]);
  if (pos)
    g[2] = pos;
  else {
    // focus on this node, its new
    focus_node = g[0];
    zoom_timer = Date.now();
    g[2] = [parent_pos[0] + Math.random() * 200 -100, parent_pos[1] + Math.random() * 200 -100];
    console.log("focusing! " + g[2]);
  }

  var numKidz = g[5].length;
  for(var i = 0; i < numKidz; i++) {
    g[5][i] = fix_graph(g[5][i], dick_tionary_old, g[2]);
  }
  return g;
}

function read_poll(g) {
  if (graph.length == 0)
    return fix_graph(g, [], [0, 0]);

  dick_tionary_new = [];
  dick_tionary_old = [];
  dick_tionary_new = fill_dick_tionary(g, dick_tionary_new);
  dick_tionary_old = fill_dick_tionary(graph, dick_tionary_old);

  var nodes = $(".node");
  for (var i = 0; i < nodes.length; i++) {
    var id = nodes[i].id;
    var iid = parseInt(id.substring(4, id.length));
    if (!find_in_dicktionary(dick_tionary_new, iid)) {
      $("#"+id).remove();
      $("#edge-"+id).remove();
      if (iid == focus_node)
        focus_node = -1;
    }
  }

  return fix_graph(g, dick_tionary_old, [0, 0]);
}

function computeGravitationForAllGraph(source, g) {
  var numKidz = g[5].length;
  for(var i = 0; i < numKidz; i++) {
    if (source[0] != g[5][i][0])
      source = computeGravitation(source, g[5][i], -1);
    source = computeGravitationForAllGraph(source, g[5][i]);
  }

  return source;
}

function computeGravitation(source, target, dir) {
  if (source[0] == graph[0])
    return source;

  var delta = [target[2][0] - source[2][0], target[2][1] - source[2][1]];
  var lenSq = delta[0]*delta[0] + delta[1]*delta[1];
  var len = Math.sqrt(lenSq);
  var target_lenSq = edge_len;
  var power = (len - target_lenSq) * 0.001;

  if (dir > 0 || power < 0)
    source[4].push([delta[0] * power,
                    delta[1] * power]);

  var G = 9.8;
  var lenSq = delta[0]*delta[0] + delta[1]*delta[1];
  var len = Math.sqrt(lenSq);

  var fdir;

  if (dir > 0) { // target is pulling source
    fdir = [delta[0] * len * 0.0001, delta[1] * len * 0.0001];
    console.log(target[0] + " is pulling " + source[0]);
  } else { // target is repelling source
    fdir = [-delta[0] * 10000 / lenSq, -delta[1] * 10000 / lenSq];
    console.log(target[0] + " is repelling " + source[0]);
  }
  if (fdir[0] && fdir[1]) {
    source[4].push(fdir);
  }


  /*var delta = [target[2][0] - source[2][0], target[2][1] - source[2][1]];
  var G = 9.8;
  var lenSq = delta[0]*delta[0] + delta[1]*delta[1];
  var len = Math.sqrt(lenSq);
  var F = (G*source[3]*target[3]) / (lenSq);
  if (dir > 0)
    F = 0.01 / F;
  else
    F *= lenSq;
  F = Math.min(F, max_force);
  var fdir = [delta[0] * force_wrap[0] / len, delta[1] * force_wrap[1] / len];

  source[4].push([fdir[0] * F * dir, fdir[1] * F * dir]);*/

  /*if (dir > 0) {
    if (len < min_dist)
      F  = 0;
    else
      F = 1 / F;
  }
  if (dir > 0)
    F = Math.min(F, max_force);
  else
    F = Math.min(F, max_force / 3);
  var fdir = [delta[0] / len, delta[1] / len];
  if (dir < 0) {
    fdir[0] *= force_wrap[0];
    fdir[1] *= force_wrap[1];
  }
  source[4].push([fdir[0] * F * dir, fdir[1] * F * dir]);*/


  return source;
}

function applyGravitation(source, delta_time) {
  var newPos = source[2];
  for (var i in source[4]) {
    newPos[0] += source[4][i][0] * delta_time;
    newPos[1] += source[4][i][1] * delta_time;
  }
  //newPos[0] += velocity.x * delta_time;
  //newPos[1] += velocity.y * delta_time;
  if (newPos[0] != NaN && newPos[1] != NaN)
    source[2] = newPos;
  if (focus_node == -1) {
    focus_node = source[0];
    zoom_timer = Date.now();
    console.log("resetting node!");
  }
  if (source[0] == focus_node)
    camera_target = source[2];
  source[4] = [];

  var numKidz = source[5].length;
  for(var i = 0; i < numKidz; i++)
    applyGravitation(source[5][i], delta_time);

  return source;
}


