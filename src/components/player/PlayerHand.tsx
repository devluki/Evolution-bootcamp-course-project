import { Card } from "../cardDeck/cardDeck";

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
        </>
    );
};
