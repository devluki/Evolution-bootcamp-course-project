import React from "react";
import { useSelector } from "react-redux";

import { Player } from "./components/player/Player";
import { Dealer } from "./components/dealer/Dealer";
import { Message } from "./components/UI/Message";
import { TokenSelector } from "./components/tokens/TokenSelector";
import { BettingSpot } from "./components/tokens/BettingSpot";
import { BalanceIndicator } from "./components/UI/BalanceTimerIndicator";
import { PlayerActions } from "./components/player/PlayerActions";

import "./App.css";

function App() {
    const {
        isBetFlag,
        isStandFlag,
        isPlayerBustedFlag,
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isDrawFlag,
        balance,
        currentBet,
    } = useSelector((state: BlackJackState) => state);

    // Render current communicate ?? TimeOutFn??

    const isGamerOver =
        isPlayerBustedFlag ||
        isDealerBustedFlag ||
        isDealerWinsFlag ||
        isDrawFlag ||
        isPlayerWinsFlag;

    return (
        <div className="App">
            <Dealer isBet={isBetFlag} isStand={isStandFlag} />

            {!isBetFlag && <Message messageText="Please, place your bet!" />}
            {isPlayerBustedFlag && <Message messageText="Player busted!" />}
            {isDealerBustedFlag && <Message messageText="Dealer busted!" />}
            {isDrawFlag && <Message messageText="Draw" />}

            {/* {isGamerOver && <Message messageText="Game over" />} */}
            {isDealerWinsFlag && <Message messageText="Dealer win!" />}
            {isPlayerWinsFlag && <Message messageText="Player win!" />}
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
