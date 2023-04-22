import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "../../models/cards";
import { DealerHand } from "./DealerHand";
import { countHandScore } from "../../utils/utils";

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
            <div style={{ color: "white" }}>
                {isBetFlag && (
                    <p>
                        Dealer score:
                        {(!isStandFlag && dealerHand[0]?.getScore) || ""}
                        {isStandFlag && curScore}
                    </p>
                )}
                {<DealerHand curScoreHandler={curScoreHandler} />}
                {/* {<DealerHand isStand={isStandFlag} dealerScore={dealerScore} />} */}
            </div>
        </>
    );
};
