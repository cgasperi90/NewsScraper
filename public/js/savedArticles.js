
//function to display articles on savedArticles html page
function getSavedArticles() {
    $("#savedArticlesGoHere").empty();

    $.getJSON("/savearticle", function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data);
            //$("savedArticlesGoHere").append()
        }
    });
    
}

getSavedArticles();

