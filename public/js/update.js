const updateFormHandler = async (event) => {
    event.preventDefault()
  
    // TODO: update with fields necessary for form
    const firstName = document.getElementById("??").value.trim()
    const lastName = document.getElementById("??").value.trim()
    // const industry = document.getElementById("??").value.trim()
    // const jobTitle = document.getElementById("??").value.trim()
    const linkedinURL = document.getElementById("??").value.trim()

  
    if (firstName && lastName && linkedinURL) {
      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({ firstName, lastName, linkedinURL }),
        headers: { "Content-Type": "application/json" },
      })
  
      if (response.ok) {
        document.location.replace("/profile")
      } else {
        alert("Failed to update profile.")
      }
    }
  }

  document.getElementById("update-user-form").addEventListener("submit", updateFormHandler)