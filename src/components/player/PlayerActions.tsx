import { useDispatch, useSelector } from "react-redux";

import { dealayOutput } from "../../utils/utils";
import { DELAY_TIME } from "../../models/consts";

import { Button } from "../UI/Button";
import { PlayerHand } from "./PlayerHand";
import { useEffect } from "react";

interface PlayerActionsProps {
    isGameOver: boolean;
}

export const PlayerActions: React.FC<PlayerActionsProps> = ({ isGameOver }) => {
    const dispatch = useDispatch();
    const {
        betHistory,
        isBetFlag,
        isStandFlag,
        playerHand,
        currentBet,
        isPlayerBustedFlag,
        balance,

        isDealerBustedFlag,
        isDealerWinsFlag,
        isDrawFlag,
        isPlayerWinsFlag,
    } = useSelector((state: BlackJackState) => state);

    const init = () => {
        dispatch({ type: "init", payload: { numberOfDecks: 6 } });
        dispatch({ type: "setBetFlag" });
    };

    const hitHandler = () => {
        dispatch({ type: "hit" });
    };
    const stayHandler = () => {
        dispatch({ type: "setStandFlag" });

        dispatch({ type: "dealerMustDraw" });
        dispatch({ type: "checkForWinners" });
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

    const resetGameHandler = () => {
        dispatch({ type: "resetGame" });
    };

    const getState = () => {
        dispatch({ type: "getState" });
    };

    useEffect(() => {
        if (!isPlayerBustedFlag) return;
        dealayOutput(stayHandler, null, 2 * DELAY_TIME);
        // stayHandler();
    }, [isPlayerBustedFlag]);

    // const isBusted = isDealerBustedFlag || isPlayerBustedFlag;

    // useEffect(() => {
    //     if (
    //         isDealerBustedFlag ||
    //         isPlayerBustedFlag ||
    //         isDealerWinsFlag ||
    //         isDrawFlag ||
    //         isPlayerWinsFlag
    //     ) {
    //         setTimeout(() => {
    //             dispatch({ type: "resetGame" });
    //         }, 4000);
    //     }
    // }, [
    //     isDealerBustedFlag,
    //     isPlayerBustedFlag,
    //     dispatch,
    //     isDealerWinsFlag,
    //     isDrawFlag,
    //     isPlayerWinsFlag,
    // ]);

    return (
        <>
            <div>
                {isGameOver && (
                    <Button onClick={resetGameHandler} innerText="Reset" />
                )}
                {!isBetFlag && (
                    <div>
                        <button
                            onClick={undoBetHandler}
                            disabled={currentBet === 0}
                        >
                            Undo BET
                        </button>
                        <button
                            onClick={resetBetHandler}
                            disabled={currentBet === 0}
                        >
                            Reset BET
                        </button>
                    </div>
                )}
                {!isBetFlag && betHistory.length > 0 && (
                    <button onClick={init}>Deal cards!</button>
                )}
                {!isPlayerBustedFlag && isBetFlag && !isStandFlag && (
                    <button onClick={hitHandler}>Hit</button>
                )}
                {isBetFlag && !isStandFlag && (
                    <button onClick={stayHandler}>Stay</button>
                )}
                {balance > currentBet &&
                    isBetFlag &&
                    !isStandFlag &&
                    playerHand.length < 3 && (
                        <button onClick={doubleDownHandler}>Double Down</button>
                    )}
                <button onClick={getState}>GET CURRENT STATE</button>
            </div>
        </>
    );
};
