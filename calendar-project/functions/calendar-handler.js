exports.handler = async (event) => {
  try {
    const { datetime } = JSON.parse(event.body);
    if (!datetime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing datetime parameter" }),
      };
    }

    // API key securely handled in the backend
    const API_KEY = "VF.DM.6755293d4c417aab5a71cfd4.kCBxTlEqYBJpKFZy"; // Keep this private!

    // Log the request payload before sending it
    console.log("Request payload:", {
      state: {},
      action: { type: "text", payload: datetime },
    });

    // Log the headers to inspect the Authorization and Content-Type
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };
    console.log("Request Headers:", headers);

    const response = await fetch('https://api.voiceflow.com/v1/project/6749c2ab4e1b0393839657d7/state/user/production/interact', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        state: {}, 
        action: { type: 'text', payload: datetime },
      }),
    });

    // Log the response status and body after receiving it
    console.log("Response status:", response.status);
    console.log("Response body:", await response.text());

    if (!response.ok) {
      throw new Error(`Voiceflow API error: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Date and time sent to Voiceflow", data: result }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
