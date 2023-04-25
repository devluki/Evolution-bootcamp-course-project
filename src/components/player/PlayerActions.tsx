import { useDispatch, useSelector } from "react-redux";

import { dealayOutput } from "../../utils/utils";
import { DELAY_TIME } from "../../models/consts";

import { Button } from "../UI/Button";

import { useEffect, useContext } from "react";
import { OverlayCtx } from "../modal/ModalOverlay";

import styles from "./PlayerActions.module.css";

interface PlayerActionsProps {
    isGameOver: boolean;
}

export const PlayerActions: React.FC<PlayerActionsProps> = ({ isGameOver }) => {
    const ctx = useContext(OverlayCtx);
    const dispatch = useDispatch();
    const {
        betHistory,
        isBetFlag,
        isStandFlag,
        playerHand,
        currentBet,
        isPlayerBustedFlag,
        balance,
        isPlayersTurnIsOver,
        isDealersTurnIsOver,
        isDoubleDownFlag,
        isPlayerHaveBlackJack,
        playerScore,
    } = useSelector((state: BlackJackState) => state);

    const init = () => {
        dispatch({ type: "init", payload: { numberOfDecks: 6 } });
        dispatch({ type: "setBetFlag" });
    };

    const hitHandler = () => {
        if (playerScore >= 17) {
            ctx.setIsVisible(true);
        } else {
            dispatch({ type: "hit" });
            dispatch({
                type: "setPlayersTurnIsOver",
                payload: { isOver: false },
            });
        }
    };
    const stayHandler = () => {
        dispatch({ type: "setStandFlag" });

        dispatch({ type: "dealerMustDraw" });

        dispatch({
            type: "setPlayersTurnIsOver",
            payload: { isOver: false },
        });
    };

    const resetBetHandler = () => {
        dispatch({ type: "setCurToken", payload: { tokenValue: 0 } });
        if (betHistory.length === 0) return;
        dispatch({ type: "resetBet" });
    };
    const undoBetHandler = () => {
        if (betHistory.length === 0) return;
        dispatch({ type: "undoBet" });
    };

    const doubleDownHandler = () => {
        dispatch({ type: "doubleBet" });
        dispatch({ type: "setDoubleDownFlag" });

        setTimeout(() => {
            dispatch({ type: "hit" });
        }, 500);

        dealayOutput(stayHandler, null, DELAY_TIME * 3.5);
    };

    useEffect(() => {
        if (!isPlayerBustedFlag) return;
        dealayOutput(stayHandler, null, 2 * DELAY_TIME);
    }, [isPlayerBustedFlag]);

    useEffect(() => {
        if (!isDealersTurnIsOver) return;
        dispatch({ type: "checkForWinners" });
    }, [isDealersTurnIsOver]);

    return (
        <>
            <div className={styles.container}>
                {!isBetFlag && betHistory.length > 0 && (
                    <Button
                        onClick={init}
                        disabled={currentBet === 0}
                        innerText="Deal"
                        color="color2"
                    />
                )}
                {!isBetFlag && (
                    <div>
                        <Button
                            onClick={undoBetHandler}
                            disabled={currentBet === 0}
                            innerText="Undo"
                            color="color1"
                        />

                        <Button
                            onClick={resetBetHandler}
                            disabled={currentBet === 0}
                            innerText="Reset BET"
                            color="color1"
                        />
                    </div>
                )}

                {isBetFlag && (
                    <Button
                        onClick={hitHandler}
                        disabled={
                            !isPlayersTurnIsOver ||
                            isPlayerBustedFlag ||
                            isDoubleDownFlag ||
                            isPlayerHaveBlackJack
                        }
                        innerText="Hit"
                        color="color3"
                    />
                )}
                {isBetFlag && (
                    <Button
                        onClick={stayHandler}
                        disabled={
                            !isPlayersTurnIsOver ||
                            isPlayerBustedFlag ||
                            isDoubleDownFlag ||
                            isPlayerHaveBlackJack
                        }
                        innerText="stay"
                        color="color1"
                    />
                )}
                {balance > currentBet &&
                    isBetFlag &&
                    !isStandFlag &&
                    playerHand.length < 3 && (
                        <Button
                            onClick={doubleDownHandler}
                            disabled={
                                !isPlayersTurnIsOver || isPlayerBustedFlag
                            }
                            innerText="double down"
                            color="color2"
                        />
                    )}
            </div>
        </>
    );
};
