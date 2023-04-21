import { useSelector } from "react-redux";

import PlaingCard from "../playingCards/PlayingCard";
import FlippedCard from "../playingCards/FlippedCard";

interface DealerHandProps {
    isStand: boolean;
    dealerScore: number;
}

export const DealerHand = (props: DealerHandProps) => {
    const { isStand } = props;
    const { dealerHand } = useSelector((state: BlackJackState) => state);

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
                {dealerHand.map((card, i) => {
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
