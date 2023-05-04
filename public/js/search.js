const searchButton = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");
const userSearch = document.querySelector('#searchTerm').value.trim()

searchButton.addEventListener("click", async function () {

    // Get the search query from the input field
    const username = document.querySelector('#searchTerm').value.trim()

    const response = await fetch('/api/user/search', {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: { "Content-Type": "application/json"}
    });

    if (response.ok) {
        const userData = await response.json()
        if (userData) {
            //render search results
            const searchResults = document.getElementById("searchResults")
            const cardData = `<div class="card">
            <header class="card-header">
              <p class="card-header-title" style="font-size:25px">
                ${userData.firstName} ${userData.lastName}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <h5>Email: </h5><p>${userData.email}</p>
                <h5>Location: </h5><p>${userData.location}</p>
                <h5>Industry: </h5><p>${userData.industry}</p>
                <h5>Job Title: </h5><p>${userData.jobTitle}</p>
                <h5>LinkedIn: </h5><p>${userData.linkedinURL}</p>
              </div>
            </div>
          </div>`
          searchResults.innerHTML = cardData
            console.log(userData)
        } else {
            alert("No results found")
        }
    }

    // Render search results
//     const userSearch = search(results, query)
//     if (userSearch) {
//         userSearch.forEach(function (result) {
//             searchResults.textContent = result
//         })
//     }
//     else {
//         searchResults.textContent = "No results found"
//     }
});


// function search(items, query) {
//     const filteredItems = [];

//     // Filter items based on query
//     //Username filter search
//     items.forEach(function (username) {
//         if (username.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
//             filteredItems.push(username);
//         }
//     });

//     return filteredItems;
// };

// //Post request for search 
// const response = await fetch('/api/user/search', {
//     method: "POST",
//     body: JSON.stringify({ query }),
//     headers: { "Content-Type": "application/json"}
// });

// if (response.ok) {
//     document.location.replace('username')
// } else {
//     alert(response.statusText)

//     const searchResults = response.json()
//     const pTag = document.createElement()
//     pTag.textcontent = searchResults

//     searchResults = append(pTag)

// }



