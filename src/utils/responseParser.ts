interface ParsedResponse {
  reasoning: string | null;
  answer: string;
  code: string | null;
}

export function parseResponse(content: string): ParsedResponse {
  // Extract reasoning section
  const reasoningMatch = content.match(/<Reasoning>([\s\S]*?)<\/Reasoning>/);
  const reasoning = reasoningMatch ? reasoningMatch[1].trim() : null;

  // Get everything after the </Reasoning> tag as the answer
  let answer = content
    .replace(/<Reasoning>[\s\S]*?<\/Reasoning>/, '')
    .trim();

  // Extract code blocks or HTML content
  const codeMatch = answer.match(/```[\s\S]*?```|<html[\s\S]*?<\/html>/i);
  const code = codeMatch ? codeMatch[0] : null;

  // Remove code from answer if it exists
  if (code) {
    answer = answer.replace(code, '').trim();
  }

  return { reasoning, answer, code };
}