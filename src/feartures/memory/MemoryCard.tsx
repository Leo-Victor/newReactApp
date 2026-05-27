import type { Card } from './memoryGame.logic';

interface MemoryCardProps {
    card: Card;
    onClick: (id: number) => void;
    disabled: boolean;
}

function MemoryCard({ card, onClick, disabled }: MemoryCardProps) {
    const handleClick = () => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
            onClick(card.id);
        }
    };

    return (
        <div
            className={`memory-card
        ${card.isFlipped ? 'flipped' : ''}
        ${card.isMatched ? 'matched' : ''}
        ${disabled && !card.isFlipped ? 'disabled' : ''}
      `}
            onClick={handleClick}
        >
            <div className="memory-card-inner">
                <div className="memory-card-front">❓</div>
                <div className="memory-card-back">{card.emoji}</div>
            </div>
        </div>
    );
}

export default MemoryCard;