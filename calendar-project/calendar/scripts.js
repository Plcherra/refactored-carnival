// Initialize the Flatpickr date and time picker
flatpickr("#date-time-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  minDate: null,
});

// Handle the form submission
document.getElementById("calendar-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const selectedDateTime = document.getElementById("date-time-picker").value;

  if (!selectedDateTime) {
    alert("Please select a date and time!");
    return;
  }

  // Send selected date and time to Netlify serverless function
  fetch('/.netlify/functions/calendar-handler', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ datetime: selectedDateTime }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Date and time sent successfully!");
      console.log(data);
    })
    .catch((error) => {
      console.error("Error sending date and time:", error);
      alert("Error submitting the date/time. Please try again.");
    });
});