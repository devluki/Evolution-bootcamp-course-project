import styles from "./PlayingCard.module.css";
import { Card } from "../../models/cards";

interface CardProps {
    card: Card;
    positionOffset: number;
    animationType: AnimationType;
}

const PlayingCard: React.FC<CardProps> = ({
    card,
    positionOffset,
    animationType,
}) => {
    const color =
        card.getSuit === "Hearts" || card.getSuit === "Diamonds"
            ? "red"
            : "black";

    const offset = {
        top: `${positionOffset * 5}px`,
        left: `${positionOffset * 35}px`,
    };
    return (
        <>
            <div
                className={`${styles.container} ${styles[animationType]}`}
                style={offset}
            >
                {card.getName.toLocaleLowerCase() === "ace" && (
                    <span className={styles.acescore} style={{ color: color }}>
                        Score: {card.getScore}
                    </span>
                )}
                <span
                    style={{ color: color }}
                    data-rank={
                        card.rank === 10 ? card.getName : card.getName[0]
                    }
                    className={`${styles.card} ${styles[card.getSuit]} ${
                        styles.top
                    }`}
                ></span>
                <span
                    className={`${styles.card} ${styles[card.getSuit]} ${
                        styles.center
                    }`}
                ></span>
                <span
                    style={{ color: color }}
                    data-rank={
                        card.rank === 10 ? card.getName : card.getName[0]
                    }
                    className={`${styles.card} ${styles[card.getSuit]} ${
                        styles.bottom
                    }`}
                ></span>
            </div>
        </>
    );
};

export default PlayingCard;
