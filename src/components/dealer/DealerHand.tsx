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
        // isBetFlag,
        // isDealerBustedFlag,
        // isDealerWinsFlag,
        // isPlayerWinsFlag,
        // isPlayerBustedFlag,
        // isDrawFlag,
    } = useSelector((state: BlackJackState) => state);

    const dispatch = useDispatch();

    const [curHand, setCurHand] = useState<Card[]>([]);

    const dispatchHandler = () => {
        dispatch({ type: "setDealerHandCopleteFlag" });
    };

    const curHandHandler = (i: number) => {
        setCurHand((prev) => [...prev, dealerHand[i]]);
    };

    useEffect(() => {
        for (let i = curHand.length; i < dealerHand.length; i++) {
            if (curHand.length === dealerHand.length) return;
            let k = i > 1 ? i - 1 : i;

            dealayOutput(curHandHandler, i, 100 + k * DELAY_TIME);
            // setTimeout(() => {
            //     setCurHand((prev) => [...prev, dealerHand[i]]);
            // }, 100 + k * 1000);
        }
    }, [dealerHand]);

    useEffect(() => {
        dealayOutput(curScoreHandler, curHand, DELAY_TIME);
    }, [curHand]);

    useEffect(() => {
        if (isStandFlag && curHand.length === dealerHand.length) {
            dealayOutput(dispatchHandler, null, DELAY_TIME * 2);
        }
    }, [curHand, isStandFlag]);

    return (
        <>
            <div className={styles.container}>
                {curHand.map((card, i) => {
                    if (!isStandFlag) {
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
