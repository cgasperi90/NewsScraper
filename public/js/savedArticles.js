function getNews() {
    console.log("function works")
    $("#savedArticlesGoHere").empty();

    $.getJSON("/save", function(data) {

        for (var i = 0; i < data.length; i++) {
            $("#savedArticlesGoHere").prepend("<div class='card' data-id=" + data[i]._id + "><div class='card-header'><h4><a class='data-title' target=_blank href='https://espn.com/" + data[i].link + "'>" + data[i].title + "</a><button class='btn btn-primary btn-success save-btn' data-title='" + data[i].title + "'>Save Article</button></h4></div><div class='card-body'>" + data[i].text + "</div></div>");
        }

        // $(".save-btn").on("click", function() {
        //     console.log("button works")
        //     $.ajax({
        //         type: "POST",
        //         dataType: "json",
        //         url: "/savearticle",
        //         data: {
        //             title: $(this).data("title")
        //         }
        //     }).then(function() {
        //         console.log("Saved");
        //     });
        // })
    });
};

getNews();