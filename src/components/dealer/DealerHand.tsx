import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PlaingCard from "../playingCards/PlayingCard";
import FlippedCard from "../playingCards/FlippedCard";
import { Card } from "../../models/cards";

import styles from "./DealerHand.module.css";

interface DealerHandProps {
    isStand: boolean;
    dealerScore: number;
}

export const DealerHand = (props: DealerHandProps) => {
    const { isStand } = props;
    const {
        dealerHand,
        isBetFlag,
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isPlayerBustedFlag,
        isDrawFlag,
    } = useSelector((state: BlackJackState) => state);

    const [curHand, setCurHand] = useState<Card[]>([]);

    useEffect(() => {
        for (let i = curHand.length; i < dealerHand.length; i++) {
            if (curHand.length === dealerHand.length) return;
            let k = i > 1 ? 1 : i;
            // console.log(isBetFlag, k, i);
            setTimeout(() => {
                setCurHand((prev) => [...prev, dealerHand[i]]);
            }, 100 + k * 1000);
        }
    }, [dealerHand]);

    useEffect(() => {
        if (
            isDealerBustedFlag ||
            isDealerWinsFlag ||
            isPlayerWinsFlag ||
            isPlayerBustedFlag ||
            isDrawFlag
        ) {
            setTimeout(() => {
                setCurHand([]);
            }, 3000);
        }
    }, [
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isPlayerBustedFlag,
        isDrawFlag,
    ]);

    return (
        <>
            <div className={styles.container}>
                {curHand.map((card, i) => {
                    if (!isStand) {
                        if (i === 1) {
                            return <FlippedCard key={i} />;
                        }
                    }
                    return (
                        <PlaingCard key={i} card={card} positionOffset={i} />
                    );
                })}
                {/* {dealerHand.map((card, i) => {
                    if (!isStand) {
                        if (i === 1) {
                            return <FlippedCard key={i} />;
                        }
                    }
                    return (
                        <PlaingCard key={i} card={card} positionOffset={i} />
                    );
                })} */}
            </div>
        </>
    );
};
