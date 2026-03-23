const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

const buildPrompt = (user) => `
Summarize this user in 1-2 short sentences for an internal user directory.
Use only the provided data.
If making an inference, keep it cautious using words like "likely" or "may".
Do not invent facts.

Name: ${user.name}
Role: ${user.role}
Status: ${user.status}
Language: ${user.language}
`.trim();

export const generateUserInsights = async (user) => {
  const apiKey = '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';

  if (!apiKey) {
    throw new Error("Missing Groq API key.");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You write concise user insights for a React dashboard. Keep the answer factual, short, and easy to read.",
        },
        {
          role: "user",
          content: buildPrompt(user),
        },
      ],
      temperature: 0.4,
      max_tokens: 90,
    }),
  });

  if (!response.ok) {
    let message = "Unable to generate insights right now.";

    try {
      const errorPayload = await response.json();
      message = errorPayload?.error?.message || message;
    } catch (error) {
      // Fall back to the default message when the error response is not JSON.
    }

    throw new Error(message);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  return content;
};
