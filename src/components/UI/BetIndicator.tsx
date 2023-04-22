import styles from "./Betindicator.module.css";

export const BetIndicator: React.FC<BetIndicatorProps> = ({ bet }) => {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.txt}>
                    <span>$ </span>
                    {bet}
                </p>
            </div>
        </>
    );
};
