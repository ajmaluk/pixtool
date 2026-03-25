export async function fetchTextResponse(prompt) {
  const TEXT_API = import.meta.env.VITE_TEXT_API_URL;

  try {
    const response = await fetch(TEXT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.status === "success") {
      return data.text;
    } else {
      throw new Error("API failed");
    }

  } catch (error) {
    console.error(error);
    return "Error getting response. Please try again later.";
  }
}
