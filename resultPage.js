// alert('yo');
window.urls = JSON.parse(localStorage.getItem('urls'));
window.path_tags =  JSON.parse(localStorage.getItem('path_tags'));


$( window ).ready(function() {
    for(var i = 0; i< window.urls.length; ++i){
        
        image_string = "";
        joined = path_tags[i].join(", ")
        for(var j = 0; j< window.urls[i]. length; ++j){
            image_string += `<img class='hover_img' src='` + window.urls[i][j] +   `'>`;
        }
        
        $( "#nodes_container" ).append( 
            "<div class='node'>"+
                "<div class='image_container'>"+
                    image_string +
                     "<div><p><br>" + joined + "</p></div>"+
                "</div>"+
                "<div class='vertix'>" +
                "<i class='fas fa-arrow-right'></i>" +
                "</div>" +
            "</div>");
    }
});

