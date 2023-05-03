const searchButton = document.getElementById("search")

searchButton.addEventListener("click" (search) {

    // Render search results
    results.forEach(function (result) {
        $("filteredItems").append($('<li>').text(result));
    });

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