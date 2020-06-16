
function getNews() {
    console.log("function works")
    $("#articlesGoHere").empty();

    $.getJSON("/all", function(data) {

        for (var i = 0; i < data.length; i++) {
            $("#articlesGoHere").prepend("<div class='card' data-id=" + data[i]._id + "><div class='card-header'><h4><a class='data-title' target=_blank href='https://espn.com/" + data[i].link + "'>" + data[i].title + "</a><button class='btn btn-primary btn-success save-btn' data-title='" + data[i].title + "' data-link='" + data[i].link + "' data-text='" + data[i].text + "'>Save Article</button></h4></div><div class='card-body'>" + data[i].text + "</div></div>");
        }

        $(".save-btn").on("click", function() {
            console.log("button works")
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/save",
                data: {
                    title: $(this).data("title"),
                    link: $(this).data("link"),
                    text: $(this).data("text")
                }
            }).then(function() {
                console.log("Saved");
                alert("Saved!");
            });
        })
    });
};

//Function being called so the news articles in our
//DB are populated onto the html page.
getNews();

$("#scrape").on("click", function() {
    console.log("click")
    $.ajax({
        type: "GET",
        url: "/scrape"
    }).then(function() {
        console.log("test")
        getNews();

    });

});


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

