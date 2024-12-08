const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the JSON body from the request
    const data = JSON.parse(event.body);

    // Validate required fields
    const { name, location, order_numbern, refund_reason, order_date_time } = data;
    if (!name || !location || !order_numbern || !refund_reason || !order_date_time) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Zapier webhook URL
    const zapierWebhookURL = 'https://hooks.zapier.com/hooks/catch/XXXXXXX/YYYYYY';

    // Send the data to Zapier
    const response = await fetch(zapierWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle Zapier response
    if (response.ok) {
      const result = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data sent successfully', result }),
      };
    } else {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to send data to Zapier', details: errorText }),
      };
    }
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
