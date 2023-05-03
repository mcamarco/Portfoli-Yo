console.log("lets start the party")
const updateFormHandler = async (event) => {
  event.preventDefault();
console.log("lets start the party 2")
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const location = document.getElementById("location").value.trim();
  const industry = document.getElementById("industry").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const linkedinURL = document.getElementById("linkedinURL").value.trim();
  const userId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  if (firstName && lastName && location && industry && jobTitle && linkedinURL) {
    const response = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ firstName, lastName, location, industry, jobTitle, linkedinURL }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace(`/profile/${userId}`);
    } else {
      alert("Failed to update profile.");
    }
  }
};

// TODO: Add delete functionality
const deleteProfileHandler = async () => {
  const confirmed = confirm("Are you sure you want to delete your profile?");
  if (confirmed) {
    const response = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Failed to delete profile.");
    }
  }
};

document.getElementById("update-user-form").addEventListener("submit", updateFormHandler);
document.getElementById("delete-btn").addEventListener("click", deleteProfileHandler);
