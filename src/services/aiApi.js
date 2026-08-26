/**
 * PixTool AI Gateway Service
 * Powered by NVIDIA Nemotron (High-Performance GPU Computing API)
 */

const DEFAULT_INVOKE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-lightning-30b-a3b';
const DEFAULT_FALLBACK_KEY = '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';

const cleanAiOutput = (text) => {
  if (!text || typeof text !== 'string') return '';
  // Strip any internal thought tags if present
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  // Remove markdown code fence if it wraps the entire response as a single raw block
  if (cleaned.startsWith('```markdown\n') && cleaned.endsWith('\n```')) {
    cleaned = cleaned.slice(12, -4).trim();
  }
  return cleaned;
};

const DEFAULT_SYSTEM_PROMPT = `You are Pix AI, the intelligent assistant built into PixTool.
PixTool (https://www.pixtool.in) is an ultra-fast, 100% privacy-first browser productivity suite with 73+ free tools spanning Image manipulation, PDF management, Mathematical calculations, AI generation, and Utilities.
All file operations in PixTool run locally on user devices via WebAssembly and HTML5 Canvas with zero cloud uploads.

Ecosystem & Creator Context:
- Creator & Lead Architect: Ajmal U K (Muhammed Ajmal U K, https://ajmal.uthakkan.in), a senior software architect and full-stack engineer.
- Parent Brand / Technology Studio: UTHAKKAN (https://uthakkan.in).
- Other Projects: Climbo (web-based high-performance browser racing game).

Guidelines:
- Provide direct, concise, and helpful answers formatted in clean GitHub Markdown.
- When recommending PixTool tools, always use direct markdown links like [Image Resizer](/image-tools/resize), [PDF Merger](/pdf-tools/merge), [Temp Mail](/temp-mail), [AI Resume Builder](/ai-tools/resume-generator), [Scientific Calculator](/math-tools/scientific-calculator), or [Kanban Board](/productivity-tools/kanban).
- Always champion local browser privacy and high speed.`;

/**
 * Fetch AI completion from NVIDIA AI API
 * @param {string|object} promptOrOptions - User prompt or options payload
 * @param {object} [customOptions] - Additional parameters (temperature, max_tokens, etc.)
 * @returns {Promise<string>} Generated text response
 */
export async function fetchTextResponse(promptOrOptions, customOptions = {}) {
  const isObject = typeof promptOrOptions === 'object' && promptOrOptions !== null;
  const prompt = isObject ? (promptOrOptions.prompt || promptOrOptions.content || '') : String(promptOrOptions || '');
  const systemPrompt = (isObject ? promptOrOptions.systemPrompt : customOptions.systemPrompt) || DEFAULT_SYSTEM_PROMPT;

  const getEnvVar = (key) => {
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
      }
    } catch { /* ignore */ }
    try {
      if (typeof globalThis !== 'undefined' && globalThis.process?.env?.[key]) {
        return globalThis.process.env[key];
      }
    } catch { /* ignore */ }
    return '';
  };

  const apiKey = getEnvVar('VITE_NVIDIA_API_KEY') || DEFAULT_FALLBACK_KEY;
  const invokeUrl = getEnvVar('VITE_NVIDIA_INVOKE_URL') || DEFAULT_INVOKE_URL;
  const model = getEnvVar('VITE_NVIDIA_MODEL') || DEFAULT_MODEL;

  if (!apiKey) {
    console.error('Pix AI API Error: NVIDIA API Key is not configured.');
    return 'AI service is currently not configured. Please ensure VITE_NVIDIA_API_KEY is set in your environment.';
  }

  const temperature = isObject ? (promptOrOptions.temperature ?? 0.7) : (customOptions.temperature ?? 0.7);
  const maxTokens = isObject ? (promptOrOptions.max_tokens ?? 4096) : (customOptions.max_tokens ?? 4096);
  const enableThinking = isObject ? Boolean(promptOrOptions.enable_thinking) : Boolean(customOptions.enable_thinking);

  const controller = new AbortController();
  const timeoutMs = Number(getEnvVar('VITE_API_TIMEOUT')) || 45000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const payload = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature,
      top_p: 0.95,
      max_tokens: maxTokens,
      chat_template_kwargs: { enable_thinking: enableThinking }
    };

    const response = await fetch(invokeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorJson = null;
      try { errorJson = JSON.parse(errorText); } catch { /* ignore */ }
      const errMessage = errorJson?.error?.message || errorJson?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errMessage);
    }

    const data = await response.json();
    const messageContent = data?.choices?.[0]?.message?.content;

    if (typeof messageContent === 'string' && messageContent.length > 0) {
      return cleanAiOutput(messageContent);
    }

    // Fallback if content was returned in reasoning_content
    const reasoningContent = data?.choices?.[0]?.message?.reasoning_content;
    if (typeof reasoningContent === 'string' && reasoningContent.length > 0) {
      return cleanAiOutput(reasoningContent);
    }

    throw new Error('NVIDIA API returned an empty or unexpected choices payload.');

  } catch (error) {
    console.error('Pix AI NVIDIA Gateway Error:', error);
    if (error.name === 'AbortError') {
      return 'The AI request timed out. High network load detected — please try your request again.';
    }
    if (/quota|rate limit|429/i.test(error.message)) {
      return 'AI request limit reached. Please wait a few seconds before trying again.';
    }
    return `Error generating response: ${error.message || 'Please check your connection and try again.'}`;
  } finally {
    clearTimeout(timeoutId);
  }
}
