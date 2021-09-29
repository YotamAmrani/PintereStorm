// Graph traversing functions

/**
 * The function will load  a JSON files of the graph vertices and edges
 * and parse them into a weighted graph.
 */
function load_json() {
  // loading the json pins
  window.pin_p = $.getJSON("Generated_pins.json", function(obj) {
    // items = obj;
    for (var i = 0; i < obj.length; ++i) {
      window.pins.push(obj[i]);
      window.dist[obj[i].id] = Infinity;
      window.prev[obj[i].id] = undefined;
    }
  });
  // loading the json edges

  // Generated_edges_test_less_new.json
  window.edge_p = $.getJSON("Generated_edges.json", function(obj) {
    // items = obj;
    for (var i = 0; i < obj.length; ++i) {
      window.edges.push(obj[i]);
    }
  });
}

/**
 * @param {*} v1 first vertex
 * @param {*} v2 second vertex
 * @returnes The weight of the edge that pass through v1 and v2
 */
function get_edge_weight(v1, v2) {
  var w = 100;
  for (var j = 0; j < window.edges.length; ++j) {
    if (window.edges[j].id_1 == v1 && window.edges[j].id_2 == v2) {
      w = window.edges[j].weight;
    } else if (window.edges[j].id_1 == v2 && window.edges[j].id_2 == v1) {
      w = Number(window.edges[j].weight);
    }
  }
  return w;
}

/**
 * Prepare vertices weight property before running the pathfinding algoritm.
 */
function set_nodes() {
  for (var i = 0; i < window.pins.length; i++) {
    // init start node
    if (
      window.start_id == -1 &&
      window.pins[i].tags.identical(window.start_tags)
    ) {
      window.start_id = i;
      window.dist[i] = 0;
    }
    // init end node
    if (window.end_id == -1 && window.pins[i].tags.identical(window.end_tags)) {
      window.end_id = i;
    }

    if (window.start_id != -1 && window.end_id != -1) {
      break;
    }
  }
}

/**
 * Simple hueristic calculation  made for
 * A-star algorithm path estimation.
 * @returns The heuristic estimation for two given vertices.
 */
function heuristic(v1, v2) {
  var objects = ["table", "chair", "lamp"];
  var tags = window.pins[v1].tags.diff(window.pins[v2].tags);
  // var same_obj = tags.diff(objects);
  // var estimate = ((4 - tags.length)* 4);
  var estimate = 4 - tags.length;
  var test = objects.diff(window.end_tags);

  // if((test.length == 2) &&(estimate.length != 0) ){
  //     estimate = ((4 - tags.length -1)* 4 +5);
  // }

  if (estimate != 0) {
    // return 1 / estimate;
    return (1 / 3) * estimate;
  }
  return estimate;
}

/**
 * A-star Algorithm for finding the shortest path
 * from the starting vertex to the end vertex based on a given huristic calculation.
 */
function aStar() {
  var current;
  // while end id is not included
  var counter = 0;
  while (!window.visited.includes(window.end_id)) {
    // sort by dist
    // window.dist_sorted = sort_dist(window.dist)

    /////////////////////
    // create estimation queue
    for (var j = 0; j < window.pins.length; ++j) {
      window.est[j] = window.dist[j] + heuristic(window.end_id, j);
    }
    ///////////////////////

    window.dist_sorted = sortDist(window.est);

    // choose minimal value that haven't been visited yet
    for (var k = 0; k < window.dist_sorted.length; ++k) {
      if (!window.visited.includes(Number(window.dist_sorted[k][0]))) {
        current = Number(window.dist_sorted[k][0]);
        // add to visited
        window.visited.push(current);
        break;
      }
    }

    // loop over current neighbors
    var j_id;
    var temp = 0;

    for (var j = 0; j < window.pins[current].neighbors.length; j++) {
      j_id = window.pins[current].neighbors[j];
      if (!window.visited.includes(j_id)) {
        var temp = get_edge_weight(current, j_id);
        var alt = window.dist[current] + temp;

        if (alt < window.dist[j_id]) {
          window.dist[j_id] = alt;
          window.prev[j_id] = current;
        }
      }
    }

    ++counter;
  }
  console.log(counter);
  // \nvisited " + String(counter) + " nodes."
  alert("shortest path is ready! ");
  console.log(dist[window.end_id]);
}

/**
 * Dijkstra Algorithm for finding the shortest path
 * from the starting vertex to the end vertex.
 */
function dijkstra() {
  var current;
  // while end id is not included
  var counter = 0;
  while (!window.visited.includes(end_id)) {
    // sort by dist
    window.dist_sorted = sortDist(window.dist);

    // choose minimal value havent been visited
    for (var k = 0; k < window.dist_sorted.length; ++k) {
      if (!window.visited.includes(Number(window.dist_sorted[k][0]))) {
        current = Number(window.dist_sorted[k][0]);
        // add to visited
        window.visited.push(current);
        break;
      }
    }

    // loop over current neighbors
    var j_id;
    var temp = 0;

    for (var j = 0; j < window.pins[current].neighbors.length; j++) {
      j_id = window.pins[current].neighbors[j];
      if (!window.visited.includes(j_id)) {
        var temp = get_edge_weight(current, j_id);
        var alt = window.dist[current] + temp;

        if (alt < window.dist[j_id]) {
          window.dist[j_id] = alt;
          window.prev[j_id] = current;
        }
      }
    }

    ++counter;
  }
  console.log(counter);
  // alert("shortest path is ready! (dijkstra)");
  alert(
    "shortest path is ready! \nvisited " +
      String(counter) +
      " nodes. (Dijkstra)"
  );
  console.log(dist[window.end_id]);
}

/**
 * Store the shortest path URLs
 */
function get_path_urls() {
  var curr = window.end_id;
  while (prev[curr] != undefined) {
    // add the current urls
    window.urls.push(window.pins[curr].img_url.slice(0, 4));
    // window.urls.push(window.pins[curr].id);
    curr = window.prev[curr];
  }

  // window.urls.push(window.pins[window.start_id].id);
  window.urls.push(window.pins[window.start_id].img_url.slice(0, 4));
  localStorage.setItem("urls", JSON.stringify(window.urls.reverse()));
}

/**
 * Store the shortest path tags
 */
function get_path_tags() {
  var curr = window.end_id;
  while (prev[curr] != undefined) {
    // add the current urls
    window.path_tags.push(window.pins[curr].tags);
    // window.urls.push(window.pins[curr].id);
    curr = window.prev[curr];
  }

  // window.urls.push(window.pins[window.start_id].id);
  window.path_tags.push(window.pins[window.start_id].tags);
  localStorage.setItem("path_tags", JSON.stringify(window.path_tags.reverse()));
}
