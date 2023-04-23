import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DELAY_TIME } from "./models/consts";
import { dealayOutput } from "./utils/utils";

import { Player } from "./components/player/Player";
import { Dealer } from "./components/dealer/Dealer";
import { Message } from "./components/UI/Message";
import { TokenSelector } from "./components/tokens/TokenSelector";
import { BettingSpot } from "./components/tokens/BettingSpot";
import { BalanceIndicator } from "./components/UI/BalanceTimerIndicator";
import { PlayerActions } from "./components/player/PlayerActions";

import "./App.css";

function App() {
    const [isBusted, setIsBusted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const isBustedHandler = () => {
        setIsBusted(true);
    };

    const {
        isBetFlag,
        playerHand,
        isPlayerBustedFlag,
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isDrawFlag,
        balance,
        currentBet,
        isDealerHandCopmlete,
        betHistory,
    } = useSelector((state: BlackJackState) => state);

    const isGamerOver =
        isPlayerBustedFlag ||
        isDealerBustedFlag ||
        isDealerWinsFlag ||
        isDrawFlag ||
        isPlayerWinsFlag;

    const busted = isPlayerBustedFlag || isDealerBustedFlag;

    useEffect(() => {
        if (playerHand.length === 0) {
            setIsBusted(false);
        } else if (isPlayerBustedFlag) {
            dealayOutput(isBustedHandler, null, 2 * DELAY_TIME);
        }
    }, [playerHand]);

    return (
        <div className="App">
            <Dealer />

            {!isBetFlag && balance > 5 && (
                <Message messageText="Place the bet to start!" />
            )}
            {!isBetFlag && balance < 5 && betHistory.length === 0 && (
                <Message messageText="Please buy tokens to continue!" />
            )}
            {isBusted && <Message messageText="Player busted!" />}
            {isDealerHandCopmlete && isDealerBustedFlag && (
                <Message messageText="Dealer busted!" />
            )}
            {!busted && isDealerHandCopmlete && isDrawFlag && (
                <Message messageText="Draw" />
            )}

            {isDealerHandCopmlete &&
                isDealerWinsFlag &&
                !isPlayerBustedFlag && <Message messageText="Dealer win!" />}
            {isDealerHandCopmlete &&
                isPlayerWinsFlag &&
                !isDealerBustedFlag && <Message messageText="Player win!" />}
            <Player />
            <BettingSpot />

            <div className="actions">
                <TokenSelector />

                <PlayerActions isGameOver={isGamerOver} />
            </div>
            <BalanceIndicator
                currentBalance={balance}
                currentBetValue={currentBet}
            />
        </div>
    );
}

export default App;
