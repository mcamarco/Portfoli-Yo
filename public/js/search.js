const searchButton = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");
const userSearch = document.querySelector('username').value.trim

searchButton.addEventListener("click", function () {

    // Get the search query from the input field
    const query = document.getElementById("searchBar").value;

    // Render search results
    const userSearch = search(results, query)
    if (userSearch) {
        userSearch.forEach(function (result) {
            searchResults.textContent = result
        })
    }
    else {
        searchResults.textContent = "No results found"
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

//Post request for search 
const response = await fetch('/api/user/search', {
    method: "POST",
    body: JSON.stringify({ username }),
});

if (response.ok) {
    document.location.replace('username')
} else {
    alert(response.statusText)

    const searchResults = response.json()
    const pTag = document.createElement()
    pTag.textcontent = searchResults

    searchResults = append(pTag)

}



