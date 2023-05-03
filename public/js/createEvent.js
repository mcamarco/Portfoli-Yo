const createForm = document.getElementById("createForm")
const events = document.querySelectorAll(".events")
const newEventButton = document.getElementById("newEvent")

newEventButton.addEventListener("click", () => {
    createForm.setAttribute("style", "display:block")
    events.forEach((event) => {
        event.setAttribute("style", "display:none")
    })
    newEventButton.setAttribute("style", "display:none")
    
})

const createEventHandler = async (event) => {
    event.preventDefault()

    const eventName = document.getElementById("eventNameInput").value.trim()
    const date = document.getElementById("dateInput").value.trim()
    const location = document.getElementById("locationInput").value.trim()
    const industry = document.getElementById("industryInput").value.trim()
    const eventDescription = document.getElementById("descriptionInput").value.trim()

    if (eventName && date && location && industry && eventDescription) {
        const response = await fetch("/api/event", {
            method: "POST",
            body: JSON.stringify({ eventName, date, location, industry, eventDescription }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Failed to create new event")
        }
    }
}

document.getElementById("createButton").addEventListener("click", createEventHandler)