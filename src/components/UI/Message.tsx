import styles from "./Message.module.css";

export const Message: React.FC<MessageProps> = ({ messageText, color }) => {
    return (
        <h1 className={styles.heading} style={{ color: color }}>
            {messageText}
        </h1>
    );
};
