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

  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/20946687/2sbm12t/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      document.querySelector('.success').textContent = 'Data sent successfully!';
      console.log('Success:', result);
    } else {
      const error = await response.text();
      document.querySelector('.error').textContent = 'An error occurred. Please try again.';
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    document.querySelector('.error').textContent = 'An error occurred. Please try again.';
  }
});
