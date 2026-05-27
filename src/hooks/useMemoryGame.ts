import { useState, useEffect, useCallback } from 'react';
import {
  type Card, type Difficulty, DIFFICULTY_CONFIG,
  createCards, checkWin, formatTime,
} from '../feartures/memory/memoryGame.logic';

function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<Record<Difficulty, number | null>>({
    easy: null, medium: null, hard: null,
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  // Khởi tạo game
  const initGame = useCallback((diff: Difficulty = difficulty) => {
    const { pairs } = DIFFICULTY_CONFIG[diff];
    setCards(createCards(pairs));
    setFlippedIds([]);
    setMoves(0);
    setSeconds(0);
    setIsRunning(false);
    setIsWon(false);
    setDisabled(false);
  }, [difficulty]);

  // Khởi tạo lần đầu
  useEffect(() => {
    initGame();
  }, []);

  // Timer
  useEffect(() => {
    if (!isRunning || isWon) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, isWon]);

  // Xử lý khi lật 2 thẻ
  useEffect(() => {
    if (flippedIds.length !== 2) return;

    setDisabled(true);
    const [id1, id2] = flippedIds;
    const card1 = cards.find((c) => c.id === id1)!;
    const card2 = cards.find((c) => c.id === id2)!;

    if (card1.emoji === card2.emoji) {
      // Khớp!
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
          )
        );
        setFlippedIds([]);
        setDisabled(false);
      }, 500);
    } else {
      // Không khớp → úp lại
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedIds([]);
        setDisabled(false);
      }, 900);
    }

    setMoves((m) => m + 1);
  }, [flippedIds]);

  // Kiểm tra thắng
  useEffect(() => {
    if (cards.length > 0 && checkWin(cards)) {
      setIsWon(true);
      setIsRunning(false);
      // Lưu best score
      setBestScore((prev) => {
        const current = prev[difficulty];
        if (current === null || moves < current) {
          return { ...prev, [difficulty]: moves };
        }
        return prev;
      });
    }
  }, [cards]);

  // Bấm thẻ
  const handleCardClick = useCallback((id: number) => {
    if (!isRunning) setIsRunning(true);

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    setFlippedIds((prev) => [...prev, id]);
  }, [isRunning]);

  // Đổi độ khó
  const handleDifficulty = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    initGame(diff);
  }, [initGame]);

  return {
    cards,
    moves,
    time: formatTime(seconds),
    seconds,
    isWon,
    isRunning,
    disabled,
    difficulty,
    bestScore,
    config: DIFFICULTY_CONFIG[difficulty],
    handleCardClick,
    handleDifficulty,
    restartGame: () => initGame(difficulty),
  };
}

export default useMemoryGame;