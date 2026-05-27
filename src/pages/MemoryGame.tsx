import './MemoryGame.css';
//import { useCallback } from 'react';
import useMemoryGame from '../hooks/useMemoryGame';
import MemoryCard from '../feartures/memory/MemoryCard';
import type { Difficulty } from '../feartures/memory/memoryGame.logic';
import { DIFFICULTY_CONFIG } from '../feartures/memory/memoryGame.logic';

function MemoryGame() {
    const {
        cards, moves, time, isWon,
        disabled, difficulty, bestScore, config,
        handleCardClick, handleDifficulty, restartGame,
    } = useMemoryGame();

    const matchedCount = cards.filter((c) => c.isMatched).length / 2;
    const totalPairs = config.pairs;

    return (
        <div className="game-page">
            <div className="game-container">

                {/* Header */}
                <div className="game-header">
                    <h1 className="game-title">🃏 Memory Card</h1>
                    <p className="game-subtitle">Lật thẻ tìm cặp giống nhau</p>
                </div>

                {/* Chọn độ khó */}
                <div className="difficulty-row">
                    {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => (
                        <button
                            key={diff}
                            className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
                            onClick={() => handleDifficulty(diff)}
                        >
                            {DIFFICULTY_CONFIG[diff].label}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="game-stats">
                    <div className="stat-item">
                        <span className="stat-label">⏱ Thời gian</span>
                        <span className="stat-value">{time}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">🎯 Lượt</span>
                        <span className="stat-value">{moves}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">✅ Cặp</span>
                        <span className="stat-value">{matchedCount}/{totalPairs}</span>
                    </div>
                    {bestScore[difficulty] !== null && (
                        <div className="stat-item">
                            <span className="stat-label">🏆 Kỷ lục</span>
                            <span className="stat-value">{bestScore[difficulty]} lượt</span>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="game-progress-track">
                    <div
                        className="game-progress-fill"
                        style={{ width: `${(matchedCount / totalPairs) * 100}%` }}
                    />
                </div>

                {/* Win screen */}
                {isWon && (
                    <div className="win-overlay">
                        <div className="win-card">
                            <div className="win-emoji">🎉</div>
                            <h2 className="win-title">Xuất sắc!</h2>
                            <p className="win-desc">
                                Hoàn thành trong <strong>{moves} lượt</strong> và <strong>{time}</strong>
                            </p>
                            {bestScore[difficulty] === moves && (
                                <p className="win-record">🏆 Kỷ lục mới!</p>
                            )}
                            <div className="win-buttons">
                                <button className="win-btn primary" onClick={restartGame}>
                                    Chơi lại
                                </button>
                                <button
                                    className="win-btn secondary"
                                    onClick={() => handleDifficulty(
                                        difficulty === 'easy' ? 'medium' :
                                            difficulty === 'medium' ? 'hard' : 'easy'
                                    )}
                                >
                                    Độ khó khác
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Board */}
                <div
                    className="memory-board"
                    style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
                >
                    {cards.map((card) => (
                        <MemoryCard
                            key={card.id}
                            card={card}
                            onClick={handleCardClick}
                            disabled={disabled}
                        />
                    ))}
                </div>

                {/* Restart */}
                <button className="restart-btn" onClick={restartGame}>
                    🔄 Chơi lại
                </button>

            </div>
        </div>
    );
}

export default MemoryGame;