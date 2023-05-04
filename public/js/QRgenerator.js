function generateQRCode(event) {
    // Set the API key for QR Code Generator
    const apiKey = "-84PaSpz6Rtj5Zl51xyE0jeRO0j4osupkLbMU0drSFOTLcgoVXti9bAOVUvFkFtg";
  
    // Create the URL for generating the QR code
    const qrData = JSON.stringify(event);
    const apiUrl = `https://api.qr-code-generator.com/v1/create/?data=${encodeURIComponent(qrData)}&apikey=${apiKey}`;
  
    // Fetch the QR code image from the API
    return fetch(apiUrl)
      .then(response => response.blob())
      .then(qrCodeBlob => {
        // Convert the QR code blob to a data URL
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(qrCodeBlob);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      })
      .then(qrCodeUrl => {
        // Create an image element for the QR code
        const qrCodeImg = document.createElement("img");
        qrCodeImg.src = qrCodeUrl;
  
        // Append the QR code image to the event object
        event.qrCode = qrCodeUrl;
  
        // Return the QR code image element
        return qrCodeImg;
      });
  }
  