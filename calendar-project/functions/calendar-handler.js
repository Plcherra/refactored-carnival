exports.handler = async (event) => {
  try {
    // Log the raw request body
    console.log("Raw event body:", event.body);

    // Parse the request body
    const { datetime } = JSON.parse(event.body);

    if (!datetime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing datetime parameter" }),
      };
    }

    // API key and endpoint
    const API_KEY = "Bearer VF.DM.6755293d4c417aab5a71cfd4.kCBxTlEqYBJpKFZy";
    const VOICEFLOW_API_ENDPOINT =
      "https://api.voiceflow.com/v1/project/6749c2ab4e1b0393839657d7/state/user/production/interact";

    // Log the request payload
    console.log("Request payload:", {
      state: {},
      action: { type: "text", payload: datetime },
    });

    // Forward the request to Voiceflow
    const response = await fetch(VOICEFLOW_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        state: {},
        action: { type: "text", payload: datetime },
      }),
    });

    // Log the response
    const responseBody = await response.text();
    console.log("Response status:", response.status);
    console.log("Response body:", responseBody);

    if (!response.ok) {
      throw new Error(`Voiceflow API error: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Date and time sent to Voiceflow successfully",
        data: JSON.parse(responseBody),
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
    };
  }
};
