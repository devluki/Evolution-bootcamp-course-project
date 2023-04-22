import { useSelector } from "react-redux";
import { useState } from "react";
import { Card } from "../../models/cards";
import { ScoreIndicator } from "../UI/ScoreIndicator";
import { countHandScore } from "../../utils/utils";
import { PlayerHand } from "./PlayerHand";

import styles from "./Player.module.css";

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
            <div className={styles.container}>
                {/* {isBetFlag && <p>Your score:{playerScore}</p>} */}
                {isBetFlag && <p>Your score:{curScore}</p>}
                <ScoreIndicator
                    score={curScore}
                    isBetFlag={isBetFlag}
                    isPlayer={true}
                />
                <PlayerHand curScoreHandler={curScoreHandler} />
            </div>
        </>
    );
};
