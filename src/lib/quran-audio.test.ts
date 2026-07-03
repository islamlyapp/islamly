import test from 'node:test';
import assert from 'node:assert/strict';
import { getDefaultReciterId, getReciterLabel } from './quran-audio';

test('returns a readable label for reciters with translated names', () => {
  const reciter = {
    id: 7,
    translated_name: { name: 'Mishary Rashid al-Afasy' },
    name: 'Mishary',
  };

  assert.equal(getReciterLabel(reciter), 'Mishary Rashid al-Afasy');
});

test('falls back to the first available reciter when no preferred match exists', () => {
  const reciters = [
    { id: 12, translated_name: { name: 'Abdul Basit' } },
    { id: 33, name: 'Saud ash-Shuraim' },
  ];

  assert.equal(getDefaultReciterId(reciters, 7), 12);
});
