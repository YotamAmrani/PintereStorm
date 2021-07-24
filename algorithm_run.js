//  prepare algorithm  structure:
// init start node
var start_tags = [];
var end_tags  = [];
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




function load_end(){
    window.end_tags = [];
    var e = document.getElementById('cat1.2');
    var name_of_var = e.options[e.selectedIndex].text;
    window.end_tags.push(name_of_var); 
    e = document.getElementById('cat2.2');
    name_of_var = e.options[e.selectedIndex].text;
    window.end_tags.push(name_of_var); 
    e = document.getElementById('cat3.2');
    name_of_var = e.options[e.selectedIndex].text;
    window.end_tags.push(name_of_var); 
    e = document.getElementById('cat4.2');
    name_of_var = e.options[e.selectedIndex].text;
    window.end_tags.push(name_of_var);
    
    //save for next page
    localStorage.setItem('end_tags', JSON.stringify(window.end_tags));
}

function random_end(){
    window.end_tags = [];
    var objects = ['table', 'chair', 'lamp'];
    var materials = ['wood', 'metal', 'plastic', 'ceramic', 'paper', 'cardboard'];
    var shapes = ['circle', 'dots', 'curve', 'cube'];
    var colors = ['white', 'black', 'brown', 'orange'];

    var obj_cat = objects[Math.floor(Math.random() * objects.length)];
    var mat_cat = materials[Math.floor(Math.random() * materials.length)];
    var shape_cat = shapes[Math.floor(Math.random() * shapes.length)];
    var color_cat = colors[Math.floor(Math.random() * colors.length)];

    // window.start_tags.push(); 
    
    // alert([obj_cat,mat_cat, shape_cat, color_cat]);
    window.end_tags = [obj_cat,mat_cat, shape_cat, color_cat];
    localStorage.setItem('end_tags', JSON.stringify([obj_cat,mat_cat, shape_cat, color_cat]));
    var check = JSON.parse(localStorage.getItem('end_tags'));
    run_algo(window.end_tags);
    alert(window.end_tags);
    // callback();
}

function verifySelect2(){
    
    if (window.end_tags.includes('Objects')){
        alert('choose end object')
    }
    if (window.end_tags.length){
        alert('choose 2 parameters')
    }

}


function clear_tags(){
    var toRemove = ['Materials','Shape','Color','Objects'];

    // remove from irrelevant tags
    window.start_tags =  window.start_tags.filter( function( el ) {
        return !toRemove.includes( el );
      } );

      window.end_tags =  window.end_tags.filter( function( el ) {
        return !toRemove.includes( el );
      } );
}


function run_algo(end_tags_random){
    // load the chosen start and end tags
    load_end();
    // load nodes tags
    window.start_tags = JSON.parse(localStorage.getItem('start_tags'));
    window.end_tags  = JSON.parse(localStorage.getItem('end_tags'));
    if(end_tags_random.length != 0){
        window.end_tags = end_tags_random;
    }
    
    // clear onchosen tags
    clear_tags();
    // main running
    $( document ).ready(function() {
        // load the current graph:
        // edges,pins, dist, prev
        load_json();

        Promise.all([pin_p, edge_p]).then(set_nodes);
        Promise.all([pin_p, edge_p]).then(aStar);
        // Promise.all([pin_p, edge_p]).then(dijkstra);
        Promise.all([pin_p, edge_p]).then(get_path_tags);
        Promise.all([pin_p, edge_p]).then(get_path_urls);


    })



}

