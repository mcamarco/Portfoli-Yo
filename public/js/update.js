const updateFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const location = document.getElementById("location").value.trim();
  const industry = document.getElementById("industry").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const linkedinURL = document.getElementById("linkedinURL").value.trim();

  if (firstName && lastName && email && location && industry && jobTitle && linkedinURL) {
    const response = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ firstName, lastName, email, location, industry, jobTitle, linkedinURL }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to update profile.");
    }
  }
};

document.getElementById("update-user-form").addEventListener("submit", updateFormHandler);
