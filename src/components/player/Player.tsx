import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import { ScoreIndicator } from "../UI/ScoreIndicator";
import { countHandScore } from "../../utils/utils";
import { PlayerHand } from "./PlayerHand";
import { BlackJackIndicator } from "../UI/BlackJackIndicator";
import { DELAY_TIME } from "../../models/consts";
import { dealayOutput } from "../../utils/utils";

import styles from "./Player.module.css";

export const Player = () => {
    const dispatch = useDispatch();
    const {
        isBetFlag,
        isPlayerHaveBlackJack,
        playerHand,
        isDealerHandCopmlete,
        isGameOver,
    } = useSelector((state: BlackJackState) => state);

    const [curScore, setCurScore] = useState<number>(0);

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);
        console.log(curScore);
        setCurScore(curScore);
    };

    const blackJackHandler = () => {
        dispatch({ type: "setStandFlag" });

        dispatch({ type: "dealerMustDraw" });
        dispatch({ type: "checkForWinners" });
    };

    useEffect(() => {
        if (isPlayerHaveBlackJack && curScore === 21) {
            dealayOutput(blackJackHandler, null, 2 * DELAY_TIME);
        }
    }, [curScore]);

    // useEffect(() => {
    //     // if (isGameOver && isDealerHandCopmlete) {
    //     if (isGameOver && !isDealerHandCopmlete) {
    //         setTimeout(() => {
    //             dispatch({ type: "resetGame" });
    //         }, 4500);
    //     }
    // }, [curScore]);

    return (
        <>
            <div className={styles.container}>
                {isBetFlag && <p className={styles.hand}>Player hand</p>}
                {curScore !== 21 && !isPlayerHaveBlackJack && (
                    <ScoreIndicator
                        score={curScore}
                        isBetFlag={isBetFlag}
                        isPlayer={true}
                    />
                )}
                {isPlayerHaveBlackJack && curScore === 21 && (
                    <BlackJackIndicator />
                )}

                <PlayerHand curScoreHandler={curScoreHandler} />
            </div>
        </>
    );
};
