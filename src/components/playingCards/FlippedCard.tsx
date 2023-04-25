import styles from "./FlippedCard.module.css";

interface FlippedCardProps {
    isStandFlag: boolean;
}

const FlippedCard: React.FC<FlippedCardProps> = ({ isStandFlag }) => {
    const animation = isStandFlag ? styles.flip : styles.slide;

    return (
        <>
            <div
                className={`${styles.container} ${animation}`}
                style={{ top: "5px", left: "35px" }}
            >
                <div className={styles.reverse}></div>
            </div>
        </>
    );
};

export default FlippedCard;
