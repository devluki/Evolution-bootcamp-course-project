import { Card } from "../cardDeck/cardDeck";
import styles from "./PlayingCard.module.css";

interface CardProps {
    card: Card;
}

// Spades,
// Clubs,
// Hearts,
// Diamonds,

const PlayingCard: React.FC<CardProps> = ({ card }) => {
    const color =
        card.getSuit === "Hearts" || card.getSuit === "Diamonds"
            ? "red"
            : "black";
    return (
        <>
            <div className={styles.container}>
                <span
                    style={{ color: color }}
                    data-rank={card.getName[0]}
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
                    data-rank={card.getName[0]}
                    className={`${styles.card} ${styles[card.getSuit]} ${
                        styles.bottom
                    }`}
                ></span>
            </div>
        </>
    );
};

export default PlayingCard;
