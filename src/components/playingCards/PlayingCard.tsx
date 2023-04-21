import styles from "./PlayingCard.module.css";
import { Card } from "../../utils/utils";

interface CardProps {
    card: Card;
}

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
