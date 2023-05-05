import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PlaingCard from "../playingCards/PlayingCard";
import FlippedCard from "../playingCards/FlippedCard";
import { Card } from "../../models/cards";
import { dealayOutput } from "../../utils/utils";
import { DELAY_TIME } from "../../models/consts";

import styles from "./DealerHand.module.css";

interface DealerHandProps {
    isStand?: boolean;
    dealerScore?: number;
    curScoreHandler: (hand: Card[]) => void;
}

export const DealerHand: React.FC<DealerHandProps> = ({ curScoreHandler }) => {
    const {
        dealerHand,
        isStandFlag,
        isBetFlag,

        isPlayerBustedFlag,
    } = useSelector((state: BlackJackState) => state);

    const [curHand, setCurHand] = useState<Card[]>([]);

    const curHandHandler = (i: number) => {
        setCurHand((prev) => [...prev, dealerHand[i]]);
    };

    // Deal cards with delay
    // Delay time depends on current iteration:
    // - first card is dealt  0 * 1000ms
    // - second card is dealt 1 * 1000ms
    // - third card is dealt 2 * 1000ms
    // etc.

    useEffect(() => {
        // Deals only two cards (i=0 and i=1) for dealer if player haven't decided what to do
        let noOfIterations = isStandFlag ? dealerHand.length : 1;

        for (let i = curHand.length; i < noOfIterations; i++) {
            if (curHand.length === dealerHand.length) return; // Check if current hand in UI equals dealer hand from Redux
            if (i === 2 && isPlayerBustedFlag) return; // Check if player is busted

            dealayOutput(curHandHandler, i, i * DELAY_TIME);
        }
    }, [dealerHand]);

    useEffect(() => {
        dealayOutput(curScoreHandler, curHand, DELAY_TIME);

        // console.log(curHand);
    }, [curHand]);

    useEffect(() => {
        if (dealerHand.length === 0) {
            setCurHand([]);
        }
    }, [dealerHand]);

    return (
        <>
            <div className={styles.container}>
                {curHand.map((card, i) => {
                    if (!isStandFlag) {
                        if (i === 1) {
                            return (
                                <FlippedCard
                                    key={i}
                                    isStandFlag={isStandFlag}
                                />
                            );
                        }
                    }
                    if (i === 1) {
                        return (
                            <PlaingCard
                                key={i}
                                card={card}
                                positionOffset={i}
                                animationType="flip"
                            />
                        );
                    }
                    return (
                        <PlaingCard
                            key={i}
                            card={card}
                            positionOffset={i}
                            animationType="slide"
                        />
                    );
                })}

                {isBetFlag && <FlippedCard isStandFlag={isStandFlag} />}
            </div>
        </>
    );
};
