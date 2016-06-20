$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    event.preventDefault();

    $.ajax({
            type: "GET",
            url: "https:en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + encodeURIComponent($("#wikiQuery").val()) + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
              var results = [];
              data.query.search.forEach(function(result) {
                results.push('<a href="' + "#" + '" class="list-group-item active">' + '<h4 class="list-group-item-heading">' + result.title + '</h4>' + '<p class="list-group-item-text">' + result.snippet + '</p>' + '</a>');
              });
              $("#resultsList").append(results.join(""));
            },
            error: function (errorMessage) {
            }
          });
          $("#resultsList").show();
  });
});
