const form = document.getElementById('picker-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const orderNumber = document.getElementById('order-number').value;
  const refundReason = document.getElementById('refund-reason').value;
  const dateTime = document.getElementById('datetime').value;

  const data = {
    name,
    location,
    order_numbern: orderNumber,
    refund_reason: refundReason,
    order_date_time: dateTime,
  };

flatpickr("#order-date-time", {
  enableTime: true,
  dateFormat: "m/d/Y, h:i K",
  time_24hr: false, // 12-hour format
  wrap: true,
  theme: "custom", // Use the custom theme for green styling
});
  
  try {
    const response = await fetch('/.netlify/functions/submit-refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      alert('Data sent successfully!');
    } else {
      const error = await response.text();
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    alert('An error occurred. Please try again.');
  }
});
