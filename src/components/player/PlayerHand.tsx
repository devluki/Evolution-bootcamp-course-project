import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import styles from "./PlayerHand.module.css";
import PlayingCard from "../playingCards/PlayingCard";
import { dealayOutput } from "../../utils/utils";
import { DELAY_TIME } from "../../models/consts";

interface PlayerHandProps {
    curScoreHandler: (hand: Card[]) => void;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ curScoreHandler }) => {
    const { playerHand, isBetFlag, isDoubleDownFlag } = useSelector(
        (state: BlackJackState) => state,
    );

    const [curHand, setCurHand] = useState<Card[]>([]);

    // Rewrite for one card dealt, reset additional step for a//
    // Updates UI hand in delay
    useEffect(() => {
        for (let i = curHand.length; i < playerHand.length; i++) {
            if (curHand.length === playerHand.length) return;
            let k = i > 1 ? 0.5 : i;
            console.log(isBetFlag, k, i);
            setTimeout(() => {
                setCurHand((prev) => [...prev, playerHand[i]]);
            }, k * 1000);
        }
    }, [playerHand]);

    // Updates score when local curHand gets updated
    useEffect(() => {
        dealayOutput(curScoreHandler, curHand, 1.3 * DELAY_TIME);
    }, [curHand]);

    // Resets local state (curHand) when game is over
    useEffect(() => {
        if (playerHand.length === 0) {
            setCurHand([]);
        }
    }, [playerHand]);

    return (
        <>
            <div className={styles.container}>
                {curHand.map((card, i) => {
                    if (i === 2 && isDoubleDownFlag) {
                        return (
                            <PlayingCard
                                key={i}
                                card={card}
                                positionOffset={i}
                                animationType="rotate90"
                            />
                        );
                    }

                    return (
                        <PlayingCard
                            key={i}
                            card={card}
                            positionOffset={i}
                            animationType="slide"
                        />
                    );
                })}
            </div>
        </>
    );
};
