var start_tags = [];

/**
 * The function verifies an object was selected from the drop down menu
 * @returns true, in case that object was selected. false elsewhere.
 */
function verifySelect() {
  if (window.start_tags.includes("Objects")) {
    alert("choose start object");
    return false;
  }
  if (window.start_tags.length) {
    alert("choose 2 parameters");
    return false;
  }
  return true;
}

/**
 * The function store the users selection in the local storage of the page
 * for further use.
 */
function loadStart() {
  window.start_tags = [];
  var e = document.getElementById("cat1");
  var name_of_var = e.options[e.selectedIndex].text;
  window.start_tags.push(name_of_var);
  e = document.getElementById("cat2");
  name_of_var = e.options[e.selectedIndex].text;
  window.start_tags.push(name_of_var);
  e = document.getElementById("cat3");
  name_of_var = e.options[e.selectedIndex].text;
  window.start_tags.push(name_of_var);
  e = document.getElementById("cat4");
  name_of_var = e.options[e.selectedIndex].text;
  window.start_tags.push(name_of_var);

  // verifySelect();
  //save for next page
  localStorage.setItem("start_tags", JSON.stringify(window.start_tags));
}

/**
 *  Generates a random selection of object and properties. (in case 'Random' Button was selected)
 */
function randomStart() {
  window.start_tags = [];
  var objects = ["table", "chair", "lamp"];
  var materials = ["wood", "metal", "plastic", "ceramic", "paper", "cardboard"];
  var shapes = ["circle", "dots", "curve", "cube"];
  var colors = ["white", "black", "brown", "orange"];

  var obj_cat = objects[Math.floor(Math.random() * objects.length)];
  var mat_cat = materials[Math.floor(Math.random() * materials.length)];
  var shape_cat = shapes[Math.floor(Math.random() * shapes.length)];
  var color_cat = colors[Math.floor(Math.random() * colors.length)];
  alert([obj_cat, mat_cat, shape_cat, color_cat]);
  // window.start_tags.push();
  //save for next page
  window.start_tags.push([obj_cat, mat_cat, shape_cat, color_cat]);
  localStorage.setItem(
    "start_tags",
    JSON.stringify([obj_cat, mat_cat, shape_cat, color_cat])
  );
}
