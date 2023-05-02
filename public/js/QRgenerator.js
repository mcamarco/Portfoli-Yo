// Get the HTML elements for the profile section
const profile = document.getElementById("profile");
const profileInput = document.getElementById("profile-input");
const profileBtn = document.getElementById("profile-btn");

// set the API key for QR Code Generator
const apiKey = "-84PaSpz6Rtj5Zl51xyE0jeRO0j4osupkLbMU0drSFOTLcgoVXti9bAOVUvFkFtg";

// generate QR code once profile has been created
profileBtn.addEventListener("click", () => {
    const profileData = profileInput.value;
    if (profileData !== "") {
        fetch("https://api.qr-code-generator.com/v1/create?access-token=" + apiKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: profileData,
                size: 200,
                margin: 0,
                download: false,
                file: "svg",
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                const qrCode = document.createElement("div");
                qrCode.innerHTML = data;
                profile.appendChild(qrCode);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

// append the generate QR code to profile section
profileInput.addEventListener("input", () => {
    profile.innerHTML = `<hr><h2 class="subtitle">Profile</h2><p>${profileInput.value}</p>`;
});


// QR CODE GENERATOR can be found here: https://www.qr-code-generator.com/qr-code-api/?gclid=CjwKCAjwo7iiBhAEEiwAsIxQEdC-GsPKLgTzMzhA6xfnCPoH_IYNdmVk-oWv1s2FA2JKyFlshKE7mxoCrygQAvD_BwE&campaignid=19720631016&adgroupid=&loc_physicall_ms=9007301&loc_interest_ms=&matchtype=&network=x&creative=&keyword=&placement=&targetid=&cpid=4bb52f59-1d43-4c8d-9658-daafede7a189&gad=1&gclid=CjwKCAjwo7iiBhAEEiwAsIxQEdC-GsPKLgTzMzhA6xfnCPoH_IYNdmVk-oWv1s2FA2JKyFlshKE7mxoCrygQAvD_BwE