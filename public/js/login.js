const loginButton = document.getElementById("login")
const signupButton = document.getElementById("signup")

//Show login form
loginButton.addEventListener("click", () => {
    const loginForm = document.getElementById("loginForm")
    loginForm.setAttribute("style", "display: block")
    loginButton.setAttribute("style", "display:none")
    signupButton.setAttribute("style", "display:none")
})

//Show sign up form
signupButton.addEventListener("click", () => {
    const signupForm = document.getElementById("signupForm")
    signupForm.setAttribute("style", "display: block")
    loginButton.setAttribute("style", "display:none")
    signupButton.setAttribute("style", "display:none")
})

//Login request
const loginFormHandler = async (event) => {
    event.preventDefault()

    const username = document.getElementById("username-login").value.trim()
    const email = document.getElementById("email-login").value.trim()
    const password = document.getElementById("password-login").value.trim()

    if (username && email && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.replace("/dashboard")
            console.log("LOGGED IN")
        }else {
            alert("Failed to login")
        }
    }
}

document.getElementById("loginSubmit").addEventListener("click", loginFormHandler)

//Signup request
const signupFormHandler = async (event) => {
    event.preventDefault()
  
    const username = document.getElementById("username-signup").value.trim()
    const email = document.getElementById("email-signup").value.trim()
    const password = document.getElementById("password-signup").value.trim()
  
    if (username && email && password) {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      })
  
      if (response.ok) {
        document.location.replace("/dashboard")
      } else {
        alert("Failed to sign up.")
      }
    }
  }

document.getElementById("signup-submit").addEventListener("click", signupFormHandler)