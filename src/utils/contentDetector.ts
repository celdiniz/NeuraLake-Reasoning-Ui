export function detectContentType(content: string): 'html' | 'markdown' | null {
  // Check for HTML content first
  if (/<html[\s\S]*<\/html>/i.test(content)) {
    return 'html';
  }
  
  // Check for code blocks with language specification
  if (/```[\s\S]*?```/.test(content)) {
    return 'markdown';
  }
  
  return null;
}