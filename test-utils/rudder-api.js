import fetch from "node-fetch";

async function sendRudderEvent(writeKey, dataPlaneUrl) {
  const url = `${dataPlaneUrl}/v1/track`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${writeKey}:`).toString("base64"),
    },
    body: JSON.stringify({
      userId: "test_user_1",
      event: "Sample Event",
      properties: { test: true },
    }),
  });

  if (response.ok) {
    //const resBody = await response.json();
    console.log("Event sent successfully:", response);
  } else {
    console.log("Failed to send event. Status:", response.status);
  }
}

export default sendRudderEvent;
