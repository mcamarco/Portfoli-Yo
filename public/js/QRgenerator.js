// set the API key for QR Code Generator
const apiKey = "-84PaSpz6Rtj5Zl51xyE0jeRO0j4osupkLbMU0drSFOTLcgoVXti9bAOVUvFkFtg";

const QRCodeHandler = async () => {

    const eventURL = window.location.toString()
    // const apiUrl = `https://api.qr-code-generator.com/v1/create/?data=${encodeURIComponent(eventURL)}&apikey=${apiKey}`
    const coors = "https://cors-anywhere.herokuapp.com/"
    const apiURL = `${coors}https://api.qr-code-generator.com/v1/create?access-token=${apiKey}`

    const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            frame_name: "no-frame",
            qr_code_text: eventURL,
            image_format: "SVG",
            qr_code_logo: "scan-me-square"
        }),
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        const data = await response.blob()
        console.log(`${URL.createObjectURL(data)}`)
        const imgURL = document.createElement("img")
        imgURL.setAttribute("src", `${URL.createObjectURL(data)}`)
        document.getElementById("qrImage").append(imgURL)
    } else {
        console.log("fail")
    }
}

QRCodeHandler()


// QR CODE GENERATOR can be found here: https://www.qr-code-generator.com/qr-code-api/?gclid=CjwKCAjwo7iiBhAEEiwAsIxQEdC-GsPKLgTzMzhA6xfnCPoH_IYNdmVk-oWv1s2FA2JKyFlshKE7mxoCrygQAvD_BwE&campaignid=19720631016&adgroupid=&loc_physicall_ms=9007301&loc_interest_ms=&matchtype=&network=x&creative=&keyword=&placement=&targetid=&cpid=4bb52f59-1d43-4c8d-9658-daafede7a189&gad=1&gclid=CjwKCAjwo7iiBhAEEiwAsIxQEdC-GsPKLgTzMzhA6xfnCPoH_IYNdmVk-oWv1s2FA2JKyFlshKE7mxoCrygQAvD_BwE