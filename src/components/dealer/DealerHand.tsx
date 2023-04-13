import { Card } from "../cardDeck/cardDeck";

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
        </>
    );
};
