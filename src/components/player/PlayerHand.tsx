import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import styles from "./PlayerHand.module.css";
import PlayingCard from "../playingCards/PlayingCard";

export const PlayerHand = () => {
    const {
        playerHand,
        isBetFlag,
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isPlayerBustedFlag,
        isDrawFlag,
    } = useSelector((state: BlackJackState) => state);

    const [curHand, setCurHand] = useState<Card[]>([]);

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
