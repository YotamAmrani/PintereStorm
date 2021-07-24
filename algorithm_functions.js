// grap traversing functions
function load_json(){
    // loading the json pins
    window.pin_p = $.getJSON( "Generated_pins_test_less.json", function( obj ) {
            // items = obj;
        for(var i = 0; i< obj.length ; ++i){
            window.pins.push(obj[i]);
            window.dist[obj[i].id] = Infinity;
            window.prev[obj[i].id] = undefined;    
        }
    });
    // loading the json edges

    
    // Generated_edges_test_less_new.json
    window.edge_p = $.getJSON( "Generated_edges_new_val.json", function( obj ) {
            // items = obj;
        for(var i = 0; i< obj.length ; ++i){
            window.edges.push(obj[i])  
        }
    });

}

function get_edge_weight(v1,v2){
    var w = 100;
    for (var j = 0; j< window.edges.length; ++j){
        if ((window.edges[j].id_1 == v1) && (window.edges[j].id_2 == v2)){
            w =  window.edges[j].weight;
        }
        else if ((window.edges[j].id_1 == v2) && (window.edges[j].id_2 == v1))
        {
            w =  Number(window.edges[j].weight);
        }
    }
    return w;
}

function set_nodes( ){
    for (var i = 0; i < window.pins.length; i++) { 
        // init start node
        if(window.start_id == -1 && window.pins[i].tags.identical(window.start_tags)){
            window.start_id = i;
            window.dist[i] = 0;
        }
        // init end node
        if(window.end_id == -1 && window.pins[i].tags.identical(window.end_tags)){
            window.end_id = i;
        }

        if(window.start_id != -1 && window.end_id != -1){
           break;
          }
    }
    
}

function heuristic(v1,v2){
    var objects = ['table', 'chair', 'lamp'];
    var tags =  window.pins[v1].tags.diff(window.pins[v2].tags);
    // var same_obj = tags.diff(objects);
    // var estimate = ((4 - tags.length)* 4);
    var estimate = ((4 - tags.length));
    var test = objects.diff(window.end_tags);

    // if((test.length == 2) &&(estimate.length != 0) ){
    //     estimate = ((4 - tags.length -1)* 4 +5);
    // }

    if (estimate != 0){
        // return 1 / estimate;
        return (1 / 3)* estimate;
    }
    return estimate;
    
}


function aStar(){
    
    var current;
    // while end id is not included
    var counter = 0;
    while ( !window.visited.includes(window.end_id)  ){
        // sort by dist
        // window.dist_sorted = sort_dist(window.dist)
        
        /////////////////////
        // create estimation queue
        for(var j = 0; j< window.pins.length; ++j){
            window.est[j] = window.dist[j] + heuristic(window.end_id,j);
        }
        ///////////////////////


        window.dist_sorted = sort_dist(window.est);

        // choose minimal value that haven't been visited yet
        for (var k = 0; k < window.dist_sorted.length; ++k )
        {
            if(!window.visited.includes(Number(window.dist_sorted[k][0]))) 
            {
                current = Number(window.dist_sorted[k][0]);
                // add to visited
                window.visited.push(current);
                break;
            }
        }
        
        // loop over current neghbors
        var j_id;
        var temp = 0;
        
        for (var j = 0; j < window.pins[current].neighbors.length ; j++){
             j_id = window.pins[current].neighbors[j];
            if(!window.visited.includes(j_id)){
                var temp = get_edge_weight(current, j_id);
                var alt = window.dist[current]  + temp;
                
                if (alt < window.dist[j_id] ){
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
    
};

function dijkstra(){
    
    var current;
    // while end id is not included
    var counter = 0;
    while ( !window.visited.includes(end_id)  ){
        // sort by dist
        window.dist_sorted = sort_dist(window.dist)
        
        // choose minimal value havent been visited
        for (var k = 0; k < window.dist_sorted.length; ++k )
        {
            if(!window.visited.includes(Number(window.dist_sorted[k][0]))) 
            {
                current = Number(window.dist_sorted[k][0]);
                // add to visited
                window.visited.push(current);
                break;
            }
        }
        
        // loop over current neghbors
        var j_id;
        var temp = 0;
        
        for (var j = 0; j < window.pins[current].neighbors.length ; j++){
             j_id = window.pins[current].neighbors[j];
            if(!window.visited.includes(j_id)){
                var temp = get_edge_weight(current, j_id);
                var alt = window.dist[current]  + temp;
                
                if (alt < window.dist[j_id] ){
                    window.dist[j_id] = alt;
                    window.prev[j_id] = current;
                }
                
            }
        }

        ++counter;
    }
    console.log(counter);
    // alert("shortest path is ready! (dijkstra)");
    alert("shortest path is ready! \nvisited " + String(counter) + " nodes. (Dijkstra)");
    console.log(dist[window.end_id]);
};


function get_path_urls(){
    
    var curr = window.end_id;
    while(prev[curr] != undefined)
    {   
        // add the current urls
        window.urls.push(window.pins[curr].img_url.slice(0,4));
        // window.urls.push(window.pins[curr].id);
        curr = window.prev[curr];
    }

    // window.urls.push(window.pins[window.start_id].id);
    window.urls.push(window.pins[window.start_id].img_url.slice(0,4));
    localStorage.setItem('urls', JSON.stringify(window.urls.reverse()));
    

};


function get_path_tags(){
    
    var curr = window.end_id;
    while(prev[curr] != undefined)
    {
        
        // add the current urls
        window.path_tags.push(window.pins[curr].tags);
        // window.urls.push(window.pins[curr].id);
        curr = window.prev[curr];
    }

    // window.urls.push(window.pins[window.start_id].id);
    window.path_tags.push(window.pins[window.start_id].tags);
    localStorage.setItem('path_tags', JSON.stringify(window.path_tags.reverse()));

};





