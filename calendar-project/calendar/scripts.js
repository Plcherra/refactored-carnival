// Replace with your Zapier Webhook URL
const zapierWebhookURL = "https://hooks.zapier.com/hooks/catch/20946687/2sbm12t/";

document.getElementById("picker-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Collect user inputs
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const orderNumber = document.getElementById("order-number").value;
  const refundReason = document.getElementById("refund-reason").value;
  const datetime = document.getElementById("datetime").value;

  if (!name || !location || !orderNumber || !refundReason || !datetime) {
    document.getElementById("status").textContent = "Please fill in all fields.";
    return;
  }

  // Create the payload to send to Zapier
  const payload = {
    name,
    order_location: location,
    order_numbern: orderNumber,
    refund_reason: refundReason,
    order_date_time: new Date(datetime).toISOString(), // Convert to ISO8601 format
  };

  try {
    // Send data to Zapier
    const response = await fetch(zapierWebhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      document.getElementById("status").textContent =
        "Data successfully sent to Zapier!";
    } else {
      document.getElementById("status").textContent =
        "Failed to send data. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("status").textContent =
      "An error occurred. Please try again.";
  }
});
