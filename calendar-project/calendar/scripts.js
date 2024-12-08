// Handle the "Send Date and Time" button click
async function handleSend() {
  const datetime = document.getElementById("datetime").value;

  // Check if the field is filled
  if (!datetime) {
    alert("Please select a date and time.");
    return;
  }

  try {
    // Send the data to the backend (Netlify function)
    const response = await fetch("/.netlify/functions/calendar-handler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ datetime }),
    });

    const result = await response.json();

    // Display the response
    const responseList = document.getElementById("response");
    if (response.ok) {
      responseList.innerHTML += `<li>${result.message}</li>`;
    } else {
      responseList.innerHTML += `<li>Error: ${result.error}</li>`;
    }
  } catch (error) {
    console.error("Error:", error);
    const responseList = document.getElementById("response");
    responseList.innerHTML += `<li>Error sending data</li>`;
  }
}

// Register the event listener
document.getElementById("send").addEventListener("click", handleSend);
