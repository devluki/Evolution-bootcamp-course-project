import { useDispatch, useSelector } from "react-redux";

import { Button } from "../UI/Button";

interface PlayerActionsProps {
    isGameOver: boolean;
}

export const PlayerActions: React.FC<PlayerActionsProps> = ({ isGameOver }) => {
    const dispatch = useDispatch();
    const {
        betHistory,
        isBetFlag,
        isStandFlag,
        isDealerBustedFlag,
        isPlayerBustedFlag,
        currentBet,
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
        // setTimeout(() => {
        dispatch({ type: "dealerMustDraw" });
        // }, 1500);
        // setTimeout(() => {
        dispatch({ type: "checkForWinners" });
        // }, 2000);

        setTimeout(() => {
            dispatch({ type: "resetGame" });
        }, 5000);
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
        dispatch({ type: "increaseBet" });
        setTimeout(() => {
            dispatch({ type: "hit" });
            stayHandler();
        }, 1000);
        // dispatch({ type: "setStandFlag" });
    };

    const resetGameHandler = () => {
        dispatch({ type: "resetGame" });
    };

    const getState = () => {
        dispatch({ type: "getState" });
    };

    const isBusted = isDealerBustedFlag || isPlayerBustedFlag;

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
                {isBetFlag && !isStandFlag && (
                    <button onClick={hitHandler}>Hit</button>
                )}
                {isBetFlag && !isStandFlag && (
                    <button onClick={stayHandler}>Stay</button>
                )}
                {isBetFlag && !isStandFlag && (
                    <button onClick={doubleDownHandler}>Double Down??</button>
                )}
                <button onClick={getState}>GET CURRENT STATE</button>
            </div>
        </>
    );
};
