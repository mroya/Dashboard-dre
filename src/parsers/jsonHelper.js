/**
 * Helper para extrair JSON válido de respostas de LLMs
 */
export const cleanAndExtractJSON = (text) => {
  if (!text) throw new Error('Resposta vazia da IA.');
  let cleaned = text.trim();

  // Remover marcações markdown ```json ... ```
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Tentar localizar primeiro { e último }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      const jsonCandidate = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonCandidate);
    }
    throw new Error('Não foi possível interpretar a resposta estruturada da IA.');
  }
};
