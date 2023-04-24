import styles from "./BalanaceIndicator.module.css";
import { Timer } from "../timer/Timer";
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
                <Timer />
                <div className={styles.curBet}>
                    <span>Bet: </span>
                    <span>$</span> {currentBetValue}
                </div>
            </div>
        </>
    );
};
