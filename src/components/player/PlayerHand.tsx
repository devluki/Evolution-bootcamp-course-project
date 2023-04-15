import { Card } from "../cardDeck/cardDeck";
import PlayingCard from "../playingCards/PlayingCard";

interface PlayerHandProps {
    hand: Card[];
}

export const PlayerHand = (props: PlayerHandProps) => {
    const { hand } = props;
    return (
        <>
            {hand.map((card, i) => (
                <p key={i}>
                    <span>{card.getName} |</span>
                    <span> {card.getSuit} |</span>
                    <span> (card score:{card.getScore})</span>
                </p>
            ))}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: "70vw",
                    margin: "0 auto",
                }}
            >
                {hand.map((card, i) => (
                    <PlayingCard key={i} card={card} />
                ))}
            </div>
        </>
    );
};
