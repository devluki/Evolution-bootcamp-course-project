import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { OverlayCtx } from "./ModalOverlay";
import { Button } from "../UI/Button";
import { DELAY_TIME } from "../../models/consts";
import { dealayOutput } from "../../utils/utils";
import styles from "./Modal.module.css";

export const Modal = () => {
    const ctx = useContext(OverlayCtx);

    const dispatch = useDispatch();

    const stayHandler = () => {
        dispatch({ type: "setStandFlag" });

        dispatch({ type: "dealerMustDraw" });

        dispatch({
            type: "setPlayersTurnIsOver",
            payload: { isOver: false },
        });
    };

    const hitHandler = () => {
        dispatch({ type: "hit" });
        dispatch({
            type: "setPlayersTurnIsOver",
            payload: { isOver: false },
        });
        ctx.setActionType(null);
        ctx.setIsVisible(false);
    };

    const doubleHandler = () => {
        dispatch({ type: "doubleBet" });
        dispatch({ type: "setDoubleDownFlag" });
        dispatch({ type: "hit" });
        dispatch({
            type: "setPlayersTurnIsOver",
            payload: { isOver: false },
        });

        ctx.setActionType(null);
        ctx.setIsVisible(false);
        dealayOutput(stayHandler, null, DELAY_TIME * 3.5);
    };

    const cancelHanlder = () => {
        ctx.setIsVisible(false);
    };

    const { playerScore } = useSelector((state: BlackJackState) => state);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        <span className={styles.txt}>
                            Your score is{" "}
                            <span className={styles.score}>{playerScore}</span>,
                            are you sure you want to draw another card??
                        </span>
                    </div>
                    <div className={styles.actions}>
                        <Button
                            onClick={
                                ctx.playerAction === "Hit"
                                    ? hitHandler
                                    : doubleHandler
                            }
                            innerText="Yes"
                            color="color1"
                            disabled={false}
                        />
                        <Button
                            onClick={cancelHanlder}
                            innerText="No"
                            color="color3"
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
