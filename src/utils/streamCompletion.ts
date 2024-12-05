interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
interface StreamCompletionOptions {
  baseUrl: string;
  messages: Message[];
  onChunk: (chunk: string) => void;
  signal?: AbortSignal;
}
export async function streamCompletion({ 
  baseUrl, 
  messages, 
  onChunk,
  signal 
}: StreamCompletionOptions) {
  // Verificar se a chave de API está definida
  const authToken = import.meta.env.VITE_TOKEN;
  if (!authToken) {
    throw new Error('TOKEN is not defined in .env file');
  }
  try {
    // Corrigir a interpolação da string de cabeçalho de autorização
    //const authToken = `${TOKEN}`; // Certifique-se de que TOKEN está definido
    //const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    const response = await fetch(`${baseUrl}/chat/completions`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${authToken}`, // Corrigir a chave e a interpolação
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        messages,
        model: 'model-SRM',
        stream: true,
        temperature: 1.5,
        max_tokens: 8192,
      }),
      signal, // Adicionar chaves de fechamento ausentes
    });
    if (!response.ok) {
      let errorMessage = `Server responded with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData?.error?.message || errorMessage;
      } catch {
        // If JSON parsing fails, use the default error message
      }
      throw new Error(errorMessage);
    }
    if (!response.body) {
      throw new Error('Response body is null');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;
            try {
              const json = JSON.parse(jsonStr);
              const content = json.choices?.[0]?.delta?.content; // Optional chaining
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              console.error('Error parsing stream chunk:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    if (signal?.aborted && error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while streaming the response');
  }
}