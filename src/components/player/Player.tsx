import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import { ScoreIndicator } from "../UI/ScoreIndicator";
import { countHandScore } from "../../utils/utils";
import { PlayerHand } from "./PlayerHand";
import { BlackJackIndicator } from "../UI/BlackJackIndicator";
import { DELAY_TIME } from "../../models/consts";
import { dealayOutput } from "../../utils/utils";
import { Message } from "../UI/Message";

import styles from "./Player.module.css";

export const Player = () => {
    const dispatch = useDispatch();
    const {
        isBetFlag,
        isPlayerHaveBlackJack,
        playerScore,
        playerHand,
        // isPlayerBustedFlag,
    } = useSelector((state: BlackJackState) => state);

    const [curScore, setCurScore] = useState<number>(0);

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);
        // console.log(curScore);
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

    useEffect(() => {
        if (!isBetFlag) return;
        if (curScore === playerScore) {
            setTimeout(() => {
                dispatch({
                    type: "setPlayersTurnIsOver",
                    payload: { isOver: true },
                });
            }, 1000);
        }
    }, [curScore]);

    return (
        <>
            <div className={styles.container}>
                {isBetFlag && <p className={styles.hand}>Player hand</p>}
                {!isPlayerHaveBlackJack && (
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
            {curScore > 21 && playerHand.length > 0 && (
                <div className={styles.message}>
                    <Message messageText="Player is Busted!" color="white" />
                </div>
            )}
        </>
    );
};
