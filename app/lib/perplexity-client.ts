export interface PerplexityResponse {
  choices: Array<{ message: { content: string } }>;
}

export async function callPerplexityAPI(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!response.ok) throw new Error(`Error en Perplexity API: ${response.statusText}`);
  const data: PerplexityResponse = await response.json();
  return data.choices[0].message.content;
}