import { useSelector } from "react-redux";

import PlayingCard from "../playingCards/PlayingCard";

export const PlayerHand = () => {
    const { playerHand } = useSelector((state: BlackJackState) => state);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: "70vw",
                    margin: "0 auto",
                }}
            >
                {playerHand.map((card, i) => (
                    <PlayingCard key={i} card={card} />
                ))}
            </div>
        </>
    );
};
