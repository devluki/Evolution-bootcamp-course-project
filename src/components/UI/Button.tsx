import styles from "./Button.module.css";

export const Button: React.FC<ButtonProps> = ({
    onClick,
    innerText,
    disabled,
    color,
}) => {
    return (
        <button
            className={`${styles.btn} ${styles[color]} ${
                disabled ? styles.disabled : ""
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {innerText}
        </button>
    );
};
