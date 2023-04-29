import CanvasAnimation from "../components/canvasAnimation/CanvasAnimation";
import { Link } from "react-router-dom";
import styles from "./Index.module.css";

export const Index = () => {
    return (
        <>
            <div className={styles.container}>
                <CanvasAnimation />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <h1 className={styles.heading}>
                        <span
                            className={styles.txtGrad}
                            data-text="Course project"
                        >
                            Course project
                        </span>
                    </h1>
                    <h3 className={styles.heading}>
                        <span className={styles.upperCase}>BlackJack Game</span>
                    </h3>
                    <h3 className={styles.heading}>by</h3>
                    <h3 className={styles.heading}>Łukasz Z.</h3>
                    <Link to="./game" className={styles.btn}>
                        Play game
                    </Link>
                </div>
            </div>
        </>
    );
};
