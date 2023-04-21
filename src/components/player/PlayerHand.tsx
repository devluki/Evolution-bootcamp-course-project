import { useSelector } from "react-redux";
import styles from "./PlayerHand.module.css";
import PlayingCard from "../playingCards/PlayingCard";

export const PlayerHand = () => {
    const { playerHand } = useSelector((state: BlackJackState) => state);

    return (
        <>
            <div
                className={styles.container}
                // style={{
                //     display: "flex",
                //     justifyContent: "space-around",
                //     maxWidth: "70vw",
                //     margin: "0 auto",
                // }}
            >
                {playerHand.map((card, i) => (
                    <PlayingCard key={i} card={card} positionOffset={i} />
                ))}
            </div>
        </>
    );
};
