import CanvasAnimation from "../components/CanvasAnimation";
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
                    <h3 className={styles.heading}>Łukasz Zabiegliński</h3>
                </div>
            </div>
        </>
    );
};
