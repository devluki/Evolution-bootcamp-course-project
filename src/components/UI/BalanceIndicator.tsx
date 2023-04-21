import styles from "./BalanaceIndicator.module.css";

export const BalanceIndicator: React.FC<BalanceIndicatorProps> = ({
    currentBalance,
    currentBetValue,
}) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.curBalance}>
                    <span>Balance: </span>
                    <span>$</span> {currentBalance}
                </div>
                <div className={styles.curBet}>
                    <span>Bet value: </span>
                    <span>$</span> {currentBetValue}
                </div>
            </div>
        </>
    );
};
