export interface QuranReciter {
  id: number;
  name?: string;
  translated_name?: {
    name?: string;
  };
}

export function getReciterLabel(reciter: QuranReciter | null | undefined) {
  if (!reciter) return 'Default reciter';
  return reciter.translated_name?.name || reciter.name || 'Default reciter';
}

export function getDefaultReciterId(reciters: QuranReciter[] = [], preferredId?: number) {
  if (preferredId) {
    const preferred = reciters.find((reciter) => reciter.id === preferredId);
    if (preferred) return preferred.id;
  }

  return reciters[0]?.id ?? 7;
}
