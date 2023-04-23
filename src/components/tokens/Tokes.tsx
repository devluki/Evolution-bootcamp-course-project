import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Token.module.css";

interface TokenProps {
    color: string;
    textColor: string;
    value: number;
    isStack?: boolean;
    inlineStyle?: any;
}

export const Token: React.FC<TokenProps> = ({
    color,
    value,
    textColor,
    isStack,
    inlineStyle,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [tokenValue, setTokenValue] = useState("");
    const activeHandler = () => {
        setIsActive((prev) => !prev);
    };
    const dispatch = useDispatch();
    const { selectedTokenVal, balance, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );

    const setTokenValueHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        activeHandler();
        const value = e.currentTarget.innerText; //.textContent as String;
        setTokenValue(value);
        console.log(value);

        dispatch({
            type: "setCurToken",
            payload: { tokenValue: +value },
        });
    };

    useEffect(() => {
        if (isActive === true && tokenValue !== selectedTokenVal.toString()) {
            setIsActive(false);
        }
    }, [isActive, selectedTokenVal, tokenValue]);

    const style = inlineStyle
        ? { ...inlineStyle, background: color, color: textColor }
        : { background: color, color: textColor };

    return (
        <>
            <div
                onClick={setTokenValueHandler}
                className={`${styles.token} ${
                    isActive ? styles.active : null
                }  ${value > balance && !isStack ? styles.inactive : null}`}
                style={style}
            >
                {value}
            </div>
        </>
    );
};
