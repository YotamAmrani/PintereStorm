// prepare algorithm  structure:

// init start node
var start_tags = [];
var end_tags = [];
var pins = [];
var edges = [];
var dist = {};
var dist_sorted = [];
var est = {};
var est_sorted = [];
var prev = {};
var visited = [];
var urls = [];
var path_tags = [];
var start_id = -1;
var end_id = -1;
var pin_p;
var edge_p;

/**
 * The function store the users selection in the local storage of the page
 * for further use.
 */
function loadEnd() {
  window.end_tags = [];
  var e = document.getElementById("cat1.2");
  var name_of_var = e.options[e.selectedIndex].text;
  window.end_tags.push(name_of_var);
  e = document.getElementById("cat2.2");
  name_of_var = e.options[e.selectedIndex].text;
  window.end_tags.push(name_of_var);
  e = document.getElementById("cat3.2");
  name_of_var = e.options[e.selectedIndex].text;
  window.end_tags.push(name_of_var);
  e = document.getElementById("cat4.2");
  name_of_var = e.options[e.selectedIndex].text;
  window.end_tags.push(name_of_var);

  //save for next page
  localStorage.setItem("end_tags", JSON.stringify(window.end_tags));
}

/**
 *  Generates a random selection of object and properties. (in case 'Random' Button was selected)
 */
function randomEnd() {
  window.end_tags = [];
  var objects = ["table", "chair", "lamp"];
  var materials = ["wood", "metal", "plastic", "ceramic", "paper", "cardboard"];
  var shapes = ["circle", "dots", "curve", "cube"];
  var colors = ["white", "black", "brown", "orange"];

  var obj_cat = objects[Math.floor(Math.random() * objects.length)];
  var mat_cat = materials[Math.floor(Math.random() * materials.length)];
  var shape_cat = shapes[Math.floor(Math.random() * shapes.length)];
  var color_cat = colors[Math.floor(Math.random() * colors.length)];

  // window.start_tags.push();

  // alert([obj_cat,mat_cat, shape_cat, color_cat]);
  window.end_tags = [obj_cat, mat_cat, shape_cat, color_cat];
  localStorage.setItem(
    "end_tags",
    JSON.stringify([obj_cat, mat_cat, shape_cat, color_cat])
  );
  var check = JSON.parse(localStorage.getItem("end_tags"));
  runAlgo(window.end_tags);
  alert(window.end_tags);
}

/**
 * The function verifies an object was selected from the drop down menu
 * @returns true, in case that object was selected. false elsewhere.
 */
function verifySelect2() {
  if (window.end_tags.includes("Objects")) {
    alert("choose end object");
  }
  if (window.end_tags.length) {
    alert("choose 2 parameters");
  }
}

/**
 * The function removes fields that were not selected for the start/end vertices.
 */
function clearTags() {
  var toRemove = ["Materials", "Shape", "Color", "Objects"];

  // remove from irrelevant tags
  window.start_tags = window.start_tags.filter(function(el) {
    return !toRemove.includes(el);
  });

  window.end_tags = window.end_tags.filter(function(el) {
    return !toRemove.includes(el);
  });
}

/**
 * The function load the user objects choise from the local storage,
 * initialize the graph vertices (given a prepared JSON file)
 * And run the pathfinding algorithm.
 *
 * @param {*} end_tags_random (optional) In case the end vertex was chosen randomly,
 * load properties, properties will be loaded from here.
 */
function runAlgo(end_tags_random) {
  // load the chosen start and end tags
  loadEnd();
  // load nodes tags
  window.start_tags = JSON.parse(localStorage.getItem("start_tags"));
  window.end_tags = JSON.parse(localStorage.getItem("end_tags"));
  if (end_tags_random.length != 0) {
    window.end_tags = end_tags_random;
  }

  // clear tags that were not selected
  clearTags();

  // main running
  $(document).ready(function() {
    // load the current graph:
    // edges,pins, dist, prev
    load_json();

    Promise.all([pin_p, edge_p]).then(set_nodes);
    Promise.all([pin_p, edge_p]).then(aStar);
    // Promise.all([pin_p, edge_p]).then(dijkstra);
    Promise.all([pin_p, edge_p]).then(get_path_tags);
    Promise.all([pin_p, edge_p]).then(get_path_urls);
  });
}
