import { useSelector, useDispatch } from "react-redux";
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

    const dispatch = useDispatch();

    const [curHand, setCurHand] = useState<Card[]>([]);

    const curHandHandler = (i: number) => {
        setCurHand((prev) => [...prev, dealerHand[i]]);
    };

    useEffect(() => {
        let noOfIterations = isStandFlag ? dealerHand.length : 1;

        for (let i = curHand.length; i < noOfIterations; i++) {
            if (curHand.length === dealerHand.length) return;
            if (i === 2 && isPlayerBustedFlag) return;
            let k: number = 0;
            i === 1 ? (k = 0.5) : (k = i > 5 ? i - 1 : i); //  TODO -> refactor this, to complex!!
            // console.log("Iterations:", i, k);
            dealayOutput(curHandHandler, i, k * DELAY_TIME);
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
