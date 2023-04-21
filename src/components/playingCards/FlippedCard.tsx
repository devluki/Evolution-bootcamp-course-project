import styles from "./FlippedCard.module.css";

const FlippedCard: React.FC = () => {
    return (
        <>
            <div
                className={styles.container}
                style={{ top: "5px", left: "35px" }}
            ></div>
        </>
    );
};

export default FlippedCard;
