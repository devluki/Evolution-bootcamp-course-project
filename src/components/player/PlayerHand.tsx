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
    const { playerHand, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );

    const [curHand, setCurHand] = useState<Card[]>([]);

    // Rewrite for one card dealt, reset additional step for a

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

    useEffect(() => {
        dealayOutput(curScoreHandler, curHand, DELAY_TIME);
    }, [curHand]);

    return (
        <>
            <div className={styles.container}>
                {/* {playerHand.map((card, i) => (
                    <PlayingCard key={i} card={card} positionOffset={i} />
                ))} */}
                {curHand.map((card, i) => (
                    <PlayingCard key={i} card={card} positionOffset={i} />
                ))}
            </div>
            {/* <button onClick={() => setCurHand([])}>ResetHand</button> */}
        </>
    );
};
