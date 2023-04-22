import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import { DealerHand } from "./DealerHand";
import { countHandScore } from "../../utils/utils";
import styles from "./Dealer.module.css";
import { ScoreIndicator } from "../UI/ScoreIndicator";

export const Dealer = () => {
    const [curScore, setCurScore] = useState<number>(0);

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);
        console.log(curScore);
        setCurScore(curScore);
    };
    const { isStandFlag, dealerHand, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );

    // useEffect(()=>{},[])// -> When cur Score === dealer Score ???

    return (
        <>
            <div className={styles.container}>
                {isBetFlag && (
                    <p>
                        Dealer score:
                        {(!isStandFlag && dealerHand[0]?.getScore) || ""}
                        {isStandFlag && curScore}
                    </p>
                )}
                {<DealerHand curScoreHandler={curScoreHandler} />}
                <ScoreIndicator
                    score={curScore}
                    isBetFlag={isBetFlag}
                    isPlayer={false}
                />
                {/* {<DealerHand isStand={isStandFlag} dealerScore={dealerScore} />} */}
            </div>
        </>
    );
};
