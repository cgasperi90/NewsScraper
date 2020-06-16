
function savedEmpty() {
    var emptyCard = $("<div class='card'>");
    var emptyBody = $("<div id='emptyBody' class='card-body'><h1>You don't have any Fantasy Articles saved!</h1>");
    $(emptyCard).append(emptyBody);
    $("#savedArticlesGoHere").append(emptyCard);
};


function getNews() {
    console.log("function works")
    $("#savedArticlesGoHere").empty();

    $.getJSON("/save", function(data) {

        for (var i = 0; i < data.length; i++) {
            $("#savedArticlesGoHere").prepend("<div class='card' data-id=" + data[i]._id + "><div class='card-header'><h4><a class='data-title' target=_blank href='https://espn.com/" + data[i].link + "'>" + data[i].title + "</a><button class='btn btn-primary btn-danger delete-btn' data-id='" + data[i]._id + "' data-title='" + data[i].title + "' data-link='" + data[i].link + "' data-text='" + data[i].text + "'>Delete Article</button></h4></div><div class='card-body'>" + data[i].text + "</div></div>");
        }

        $(".delete-btn").on("click", function() {
            console.log("buttons works");

            var thisId = $(this).attr("data-id");
        
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/delete/" + thisId
            }).then(function() {
                    console.log("testing");
                    getNews();
            });
        });
    });
};



getNews();