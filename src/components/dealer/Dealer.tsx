import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Card } from "../../models/cards";
import { DealerHand } from "./DealerHand";
import { countHandScore } from "../../utils/utils";

import { ScoreIndicator } from "../UI/ScoreIndicator";
import { BlackJackIndicator } from "../UI/BlackJackIndicator";

import styles from "./Dealer.module.css";

export const Dealer = () => {
    const [curScore, setCurScore] = useState<number>(0);
    const dispatch = useDispatch();

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);

        setCurScore(curScore);
    };

    const {
        isStandFlag,
        dealerHand,
        isBetFlag,
        isGameOver,
        isDrawFlag,
        dealerScore,
        isDealerHaveBlackJack,
        isDealerHandCopmlete,
    } = useSelector((state: BlackJackState) => state);

    //   Dealer draws cards

    useEffect(() => {
        // if (isGameOver && isDealerHandCopmlete) {
        if (isGameOver) {
            setTimeout(() => {
                dispatch({ type: "resetGame" });
            }, 4500);
        }
    }, [curScore]);

    return (
        <>
            <div className={styles.container}>
                {isBetFlag && <p className={styles.hand}>Dealer hand</p>}
                {<DealerHand curScoreHandler={curScoreHandler} />}
                {curScore !== 21 && (
                    <ScoreIndicator
                        score={
                            (!isStandFlag && dealerHand[0]?.getScore) ||
                            curScore
                        }
                        isBetFlag={isBetFlag}
                        isPlayer={false}
                    />
                )}
                {isDealerHaveBlackJack &&
                    curScore === 21 &&
                    dealerHand.length === 2 && <BlackJackIndicator />}
            </div>
        </>
    );
};
