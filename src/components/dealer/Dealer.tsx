import { useSelector } from "react-redux";
import { useState } from "react";
import { Card } from "../../models/cards";
import { DealerHand } from "./DealerHand";
import { countHandScore } from "../../utils/utils";

interface DealerProps {
    isBet: boolean;
    isStand: boolean;
}

export const Dealer = (props: DealerProps) => {
    const { isBet, isStand } = props;
    const [curScore, setCurScore] = useState<number>(0);

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);
        console.log(curScore);
        setCurScore(curScore);
    };
    const { isStandFlag, dealerScore, dealerHand, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );

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
