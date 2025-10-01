export function queryElement<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    throw new Error(`element not found: el`, { cause: el });
  }
  return el;
}
