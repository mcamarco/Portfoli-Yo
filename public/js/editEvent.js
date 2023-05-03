const editEventButton = document.getElementById("editEventButton")
const updateButton = document.getElementById("updateButton")
const deleteButton = document.getElementById("deleteButton")
const eventId = window.location.toString().split("/")[window.location.toString().split("/").length - 1]

editEventButton.addEventListener("click", () => {
    const updateForm = document.getElementById("updateForm")
    const event = document.getElementById("event")
    updateForm.setAttribute("style", "display:block")
    event.setAttribute("style", "display:none")
})

const updateEventHandler = async (event) => {
    event.preventDefault()

    const eventName = document.getElementById("eventNameInput").value.trim()
    const date = document.getElementById("dateInput").value.trim()
    const location = document.getElementById("locationInput").value.trim()
    const industry = document.getElementById("industryInput").value.trim()
    const eventDescription = document.getElementById("descriptionInput").value.trim()

    if (eventName && date && location && industry && eventDescription) {
        const response = await fetch(`api/event/${parseInt(eventId)}`, {
            method: "PUT",
            body: JSON.stringify({ eventName, date, location, industry, eventDescription }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert("Failed to update event")
        }
    }
}

updateButton.addEventListener("click", updateEventHandler)



