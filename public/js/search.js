const searchButton = document.getElementById("searchBar");
const results = ["result1", "result2", "result3"];

searchButton.addEventListener("click", function() {

    // Render search results
    const filteredItems = search(results, "query");
    filteredItems.forEach(function (result) {
        $("#filteredItems").append($("<searchResults>").text(result));
    }
    Else {
        append($("<searchResults>").text(No results found))
    }
    });

function search(items, query) {
    const filteredItems = [];

    // Filter items based on query
    //Username filter search
    items.forEach(function (username) {
        if (username.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            filteredItems.push(username);
        }
    });

    return filteredItems;
};
