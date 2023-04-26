import { useDispatch, useSelector } from "react-redux";
import { Token } from "./Tokes";
import { TOKEN_DATA } from "../../models/consts";
import { BetIndicator } from "../UI/BetIndicator";

import styles from "./BettingSpot.module.css";

export const BettingSpot = () => {
    const dispatch = useDispatch();
    const { betHistory, balance, selectedTokenVal, isBetFlag, currentBet } =
        useSelector((state: BlackJackState) => state);

    const increaseBetHandler = () => {
        if (selectedTokenVal > balance) return;
        if (!selectedTokenVal || isBetFlag) return;
        dispatch({ type: "increaseBet" });
    };

    return (
        <>
            <div
                className={`${styles.container} ${
                    isBetFlag ? styles.mobileDisplay : ""
                }`}
                onClick={increaseBetHandler}
            >
                <div
                    className={`${styles.spot} ${
                        betHistory.length === 0 ? styles.animate : ""
                    }`}
                >
                    {betHistory.map((bet, i) => {
                        const token = TOKEN_DATA.filter(
                            (token) => token.value === bet,
                        );
                        const style = {
                            position: "absolute",
                            left: "50%",
                            top: `${-i * 8}px`,
                            color: `${token[0].color}`,
                            transform:
                                "perspective(3000px) rotateX(55deg) rotateZ(-40deg) translate(-70%, 50%)",
                        };
                        return (
                            <Token
                                key={i}
                                color={token[0].color}
                                value={token[0].value}
                                textColor={token[0].textColor}
                                isStack={true}
                                inlineStyle={style}
                            />
                        );
                    })}
                </div>
                {betHistory.length > 0 && <BetIndicator bet={currentBet} />}
            </div>
        </>
    );
};
