export function extractCodeContent(content: string, type: 'html' | 'markdown' | null): string {
  if (!type) return '';

  if (type === 'markdown') {
    // Extract content between code blocks, including language specification
    const match = content.match(/```(?:\w+)?\n([\s\S]*?)```/);
    return match ? match[1].trim() : '';
  }

  if (type === 'html') {
    // Extract complete HTML document
    const match = content.match(/<html[\s\S]*<\/html>/i);
    return match ? match[0].trim() : '';
  }

  return '';
}