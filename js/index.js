$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();

    $("#resultsList").html("");

    $.ajax({
      type: "GET",
      url: "https:en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=2&exlimit=10&exintro=1&gsrsearch=" + encodeURIComponent($("#wikiQuery").val()) + "&callback=?",
      dataType: "json",
      success: function (data) {

        var results = [];

        // loop through each object
        for (var key in data.query.pages) {
          // skip loop if the property is from prototype
          if (!data.query.pages.hasOwnProperty(key)) continue;

          // push the data to the results array
          results.push('<a href="https:en.wikipedia.org/?curid=' + data.query.pages[key].pageid + '" class="list-group-item active">' + '<h4 class="list-group-item-heading">' + data.query.pages[key].title + '</h4>' + '<p class="list-group-item-text">' + data.query.pages[key].extract + '</p>' + '</a>');
        }

        // give the results array to the list group
        $("#resultsList").html(results.join(""));
      },
      error: function (data) {
        console.log(data.statusText);
      }
    });

    $("#resultsList").show();
  });
});
