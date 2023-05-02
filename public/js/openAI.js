// Get the HTML elements for the about me section
const aboutMe = document.getElementById("about-me");
const aboutMeInput = document.getElementById("about-me-input");
const aboutMeBtn = document.getElementById("about-me-btn");

// Set the API key for ChatGPT
const apiKey = "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";

// Check if the user wants to use ChatGPT to generate their about me section
aboutMeBtn.addEventListener("click", () => {
    const generateAboutMe = confirm("Would you like to use ChatGPT to generate your About Me section?");
    if (generateAboutMe) {
        // Check if the user has a public LinkedIn profile
        if (!user.linkedinURL || !user.linkedinURL.includes("linkedin.com/in/")) {
            alert("Please make sure you have a public LinkedIn profile before using ChatGPT to generate your About Me section.");
            return;
        }
        // Use ChatGPT to generate the about me section
        fetch("https://api.openai.com/v1/engine/davinci-codex/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "prompt": `Based on ${user.linkedinURL}, write an about me for a networking profile, no more than 2 paragraphs.`,
                "temperature": 0.7,
                "max_tokens": 1024
            })
        })
            .then(response => response.json())
            .then(data => {
                const aboutMeText = data.choices[0].text.trim();
                // Append the generated about me text to the HTML element
                aboutMe.innerHTML = `<hr><h2 class="subtitle">About Me</h2><p>${aboutMeText}</p>`;
            })
            .catch(error => console.error(error));
    }
});

// Allow the user to edit the about me section
aboutMeInput.addEventListener("input", () => {
    aboutMe.innerHTML = `<hr><h2 class="subtitle">About Me</h2><p>${aboutMeInput.value}</p>`;
});
