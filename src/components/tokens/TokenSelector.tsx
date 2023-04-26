import { useSelector } from "react-redux";

import { Token } from "./Tokes";
import { TOKEN_DATA } from "../../models/consts";

import styles from "./TokenSelector.module.css";

export const TokenSelector = () => {
    const { isBetFlag } = useSelector((state: BlackJackState) => state);

    return (
        <>
            {!isBetFlag && (
                <div className={styles.container}>
                    {TOKEN_DATA.map((token, i) => (
                        <Token
                            key={i + token.color}
                            value={token.value}
                            color={token.color}
                            textColor={token.textColor}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
