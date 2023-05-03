const addCommentButton = document.getElementById("addCommentButton")

addCommentButton.addEventListener("click", () => {
    const commentForm = document.getElementById("commentForm")

    commentForm.setAttribute("style", "display:block")
})

//not posting comment correctly rn
const newCommentHandler = async (event) => {
    event.preventDefault()

    const content = document.getElementById("commentInput").value.trim()
    const postId = window.location.toString().split("/")[window.location.toString().split("/").length-1]

    if (content) {
        const response = await fetch(`/api/comments/${parseInt(postId)}`, {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert("Failed to create new comment")
        }
    }
}

document.getElementById("createButton").addEventListener("click", newCommentHandler)