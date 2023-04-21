import styles from "./Clock.module.css";

export const Clock: React.FC<ClockProps> = ({ hours, minutes, seconds }) => {
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayHours = hours < 10 ? `0${hours}` : hours;

    return (
        <>
            <span className={styles.txt}>{displayHours}:</span>
            <span className={styles.txt}>{displayMinutes}:</span>
            <span className={styles.txt}>{displaySeconds}</span>
        </>
    );
};
