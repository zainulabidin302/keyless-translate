export function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function interpolate(
  text: string,
  replacements?: Record<string, string | number>
): string {
  if (!replacements) return text;
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (placeholder, key) => {
    return replacements[key] !== undefined
      ? String(replacements[key])
      : placeholder;
  });
}
