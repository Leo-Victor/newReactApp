export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  pairs: number;
  cols: number;
  label: string;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, GameConfig> = {
  easy:   { pairs: 6,  cols: 4, label: '😊 Dễ (6 cặp)'   },
  medium: { pairs: 8,  cols: 4, label: '😤 Vừa (8 cặp)'   },
  hard:   { pairs: 12, cols: 6, label: '😰 Khó (12 cặp)'  },
};

const EMOJI_POOL = [
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',
  '🐨','🐯','🦁','🐮','🐸','🐵','🐔','🐧',
  '🐦','🦆','🦅','🦉','🦇','🐺','🐗','🐴',
];

export function createCards(pairs: number): Card[] {
  const emojis = EMOJI_POOL.slice(0, pairs);
  const doubled = [...emojis, ...emojis];

  // Shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

export function checkWin(cards: Card[]): boolean {
  return cards.every((c) => c.isMatched);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}