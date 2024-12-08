document.getElementById("submit").addEventListener("click", async () => {
  const datetime = document.getElementById("datetime-picker").value;

  // Ensure datetime is not empty
  if (!datetime) {
    alert("Please select a valid date and time.");
    return;
  }

  try {
    // Send the request to the Netlify function
    const response = await fetch("/.netlify/functions/calendar-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datetime }), // Ensure the payload is correctly formatted
    });

    // Handle response
    const result = await response.json();
    if (response.ok) {
      console.log("Voiceflow Response:", result.data);
      alert("Date and time sent successfully!");
    } else {
      console.error("Error:", result.error);
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
