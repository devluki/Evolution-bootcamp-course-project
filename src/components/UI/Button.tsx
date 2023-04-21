import styles from "./Button.module.css";

export const Button: React.FC<ButtonProps> = ({ onClick, innerText }) => {
    return (
        <button className={styles.btn} onClick={onClick}>
            {innerText}
        </button>
    );
};
