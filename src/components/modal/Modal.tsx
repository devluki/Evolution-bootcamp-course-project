import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { OverlayCtx } from "./ModalOverlay";
import { Button } from "../UI/Button";
import styles from "./Modal.module.css";

export const Modal = () => {
    const ctx = useContext(OverlayCtx);

    const dispatch = useDispatch();
    const hitHandler = () => {
        dispatch({ type: "hit" });
        dispatch({
            type: "setPlayersTurnIsOver",
            payload: { isOver: false },
        });
        ctx.setIsVisible(false);
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
                            are you sure you want to hit again??
                        </span>
                    </div>
                    <div className={styles.actions}>
                        <Button
                            onClick={hitHandler}
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
