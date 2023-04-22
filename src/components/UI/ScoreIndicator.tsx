import styles from "./ScoreIndicator.module.css";

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
    score,
    isPlayer,
    isBetFlag,
}) => {
    const animationOff = isPlayer ? {} : { animation: "none" };

    return (
        <>
            {isBetFlag && (
                <div className={styles.container} style={animationOff}>
                    <p className={styles.txt}>
                        <span>{score}</span>
                    </p>
                </div>
            )}
        </>
    );
};
