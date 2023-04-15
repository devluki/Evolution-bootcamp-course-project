import { Card } from "../cardDeck/cardDeck";
import PlaingCard from "../playingCards/PlayingCard";
import FlippedCard from "../playingCards/FlippedCard";

interface DealerHandProps {
    isStand: boolean;
    dealerScore: number;
    hand: Card[];
}

export const DealerHand = (props: DealerHandProps) => {
    const { hand, isStand } = props;
    return (
        <>
            {hand.map((card, i) => {
                if (!isStand) {
                    if (i === 1) {
                        return <p key={i}> Flipped card</p>;
                    }
                }

                return (
                    <p key={i}>
                        <span>{card.getName} |</span>
                        <span> {card.getSuit} |</span>
                        <span> (card score:{card.getScore})</span>
                    </p>
                );
            })}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: "70vw",
                    margin: "0 auto",
                }}
            >
                {hand.map((card, i) => {
                    if (!isStand) {
                        if (i === 1) {
                            return <FlippedCard key={i} />;
                        }
                    }
                    return <PlaingCard key={i} card={card} />;
                })}
            </div>
        </>
    );
};
