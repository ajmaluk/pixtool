export async function fetchTextResponse(prompt) {
  const TEXT_API = import.meta.env.VITE_TEXT_API_URL;

  if (!TEXT_API) {
    console.error('Pix AI API Error: VITE_TEXT_API_URL is not configured');
    return 'AI service is not configured. Please set VITE_TEXT_API_URL and try again.';
  }

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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data?.status === "success" && typeof data.text === 'string') {
      return data.text;
    }
    throw new Error("API returned an unexpected response payload");

  } catch (error) {
    console.error('Pix AI API Error:', error);
    if (error.name === 'AbortError') {
      return "Request timed out. Pix AI is currently experiencing high latency. Please try again.";
    }
    return "Error getting response. Please ensure you are connected to the internet and try again.";
  } finally {
    clearTimeout(timeoutId);
  }
}
