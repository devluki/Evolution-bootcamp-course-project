import { useSelector } from "react-redux";

import PlaingCard from "../playingCards/PlayingCard";
import FlippedCard from "../playingCards/FlippedCard";

import styles from "./DealerHand.module.css";

interface DealerHandProps {
    isStand: boolean;
    dealerScore: number;
}

export const DealerHand = (props: DealerHandProps) => {
    const { isStand } = props;
    const { dealerHand } = useSelector((state: BlackJackState) => state);

    return (
        <>
            <div className={styles.container}>
                {dealerHand.map((card, i) => {
                    if (!isStand) {
                        if (i === 1) {
                            return <FlippedCard key={i} />;
                        }
                    }
                    return (
                        <PlaingCard key={i} card={card} positionOffset={i} />
                    );
                })}
            </div>
        </>
    );
};
