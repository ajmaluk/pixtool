export async function fetchTextResponse(prompt) {
  const TEXT_API = import.meta.env.VITE_TEXT_API_URL;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(TEXT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (data.status === "success") {
      return data.text;
    } else {
      throw new Error("API failed");
    }

  } catch (error) {
    console.error('Pix AI API Error:', error);
    if (error.name === 'AbortError') {
      return "Request timed out. Pix AI is currently experiencing high latency. Please try again.";
    }
    return "Error getting response. Please ensure you are connected to the internet and try again.";
  }
}
