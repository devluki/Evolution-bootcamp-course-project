import styles from "./FlippedCard.module.css";

const FlippedCard: React.FC = () => {
    return (
        <>
            <div
                className={styles.container}
                style={{ top: "35px", left: "5px" }}
            ></div>
        </>
    );
};

export default FlippedCard;
