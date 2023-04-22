import { useSelector } from "react-redux";
import { useState } from "react";
import { Card } from "../../models/cards";

import { countHandScore } from "../../utils/utils";
// import { Card } from "../../models/cards";

import { PlayerHand } from "./PlayerHand";

export const Player = () => {
    const { isBetFlag } = useSelector((state: BlackJackState) => state);

    const [curScore, setCurScore] = useState<number>(0);

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);
        console.log(curScore);
        setCurScore(curScore);
    };

    return (
        <>
            <div style={{ color: "white" }}>
                {/* {isBetFlag && <p>Your score:{playerScore}</p>} */}
                {isBetFlag && <p>Your score:{curScore}</p>}
                <PlayerHand curScoreHandler={curScoreHandler} />
            </div>
        </>
    );
};
