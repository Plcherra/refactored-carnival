exports.handler = async (event) => {
  try {
    const { datetime } = JSON.parse(event.body);
    if (!datetime) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing datetime parameter" }),
      };
    }

    const response = await fetch('https://api.voiceflow.com/v1/project/6749c2ab4e1b0393839657d7/state/user/production/interact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer VF.DM.6749c5dda5a9ece76fd9d888.biKhIpaPvRpnMH1u',
      },
      body: JSON.stringify({
        state: {}, 
        action: { type: 'text', payload: datetime },
      }),
    });

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



