import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Card } from "../../models/cards";
import { DealerHand } from "./DealerHand";
import { countHandScore } from "../../utils/utils";
import { DELAY_TIME } from "../../models/consts";
import { dealayOutput } from "../../utils/utils";

import { ScoreIndicator } from "../UI/ScoreIndicator";
import { BlackJackIndicator } from "../UI/BlackJackIndicator";
import { Message } from "../UI/Message";

import styles from "./Dealer.module.css";

export const Dealer = () => {
    const [curScore, setCurScore] = useState<number>(0);
    const dispatch = useDispatch();

    const curScoreHandler = (hand: Card[]) => {
        const curScore = countHandScore(hand);

        setCurScore(curScore);
    };

    const dealerTurnOverHandler = () => {
        dispatch({ type: "setDealersTurnIsOver" });
    };

    const {
        isStandFlag,
        dealerHand,
        isBetFlag,
        dealerScore,
        isDealerHaveBlackJack,
        isPlayerBustedFlag,
    } = useSelector((state: BlackJackState) => state);

    useEffect(() => {
        if (!isStandFlag) return;
        if (curScore === dealerScore && !isPlayerBustedFlag) {
            dealayOutput(dealerTurnOverHandler, null, DELAY_TIME * 2);
        }
        if (
            isPlayerBustedFlag &&
            curScore === dealerHand[0].getScore + dealerHand[1].getScore
        ) {
            dealayOutput(dealerTurnOverHandler, null, DELAY_TIME * 2);
        }
    }, [curScore]);

    return (
        <>
            <div className={styles.container}>
                {isBetFlag && <p className={styles.hand}>Dealer hand</p>}
                {<DealerHand curScoreHandler={curScoreHandler} />}
                {!isDealerHaveBlackJack && (
                    <ScoreIndicator
                        score={
                            (!isStandFlag && dealerHand[0]?.getScore) ||
                            curScore
                        }
                        isBetFlag={isBetFlag}
                        isPlayer={false}
                    />
                )}
                {isDealerHaveBlackJack && isStandFlag && <BlackJackIndicator />}
            </div>

            {curScore > 21 && dealerHand.length > 0 && (
                <div className={styles.message}>
                    <Message messageText="Dealer is Busted!" color="white" />
                </div>
            )}
        </>
    );
};
