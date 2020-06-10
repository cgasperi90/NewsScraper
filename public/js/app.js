console.log("everything works");

function getNews() {
    console.log("function works")
    $("#articlesGoHere").empty();

    $.getJSON("/all", function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#articlesGoHere").prepend("<div class='card' data-id=" + data[i]._id + "><div class='card-header'><h4><a class='data-title' target=_blank href='https://news.yahoo.com/" + data[i].link + "' data-id=" + data[i]._id + ">" + data[i].title + "</a><a class='btn btn-primary btn-success save-btn'>Save Article</a></h4></div></div>");
        }
    });
};

//Function being called so the news articles in our
//DB are populated onto the html page.
getNews();

$("#scrape").on("click", function() {
    console.log("click")
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/scrape",
        success: getNews(),
        error: function() {
            console.log("error");
        }
    });
    //location.reload();
    setTimeout(getNews, 3000);

});

function getResults() {
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articleGoHere").prepend()
        }
    })
}
$("#clear").on("click", function() {
    //event.preventDefault();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/clear",
        success: function(response) {
            $("#articleGoHere").empty();
        }
    });
    location.reload();
});