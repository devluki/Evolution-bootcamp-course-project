import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    OverlayProvider,
    ModalOverlay,
} from "../components/modal/ModalOverlay";

import { Link } from "react-router-dom";

import { Player } from "../components/player/Player";
import { Dealer } from "../components/dealer/Dealer";
import { Message } from "../components/UI/Message";
import { TokenSelector } from "../components/tokens/TokenSelector";
import { BettingSpot } from "../components/tokens/BettingSpot";
import { BalanceIndicator } from "../components/UI/BalanceTimerIndicator";
import { PlayerActions } from "../components/player/PlayerActions";

import "./Game.css";

const Game = () => {
    const dispatch = useDispatch();

    const {
        isBetFlag,

        isPlayerBustedFlag,
        isDealerBustedFlag,
        isDealerWinsFlag,
        isPlayerWinsFlag,
        isDrawFlag,
        balance,
        currentBet,

        betHistory,
        isDealersTurnIsOver,
    } = useSelector((state: BlackJackState) => state);

    const isGamerOver =
        isPlayerBustedFlag ||
        isDealerBustedFlag ||
        isDealerWinsFlag ||
        isDrawFlag ||
        isPlayerWinsFlag;

    const busted = isPlayerBustedFlag || isDealerBustedFlag;

    useEffect(() => {
        if (isDealersTurnIsOver) {
            setTimeout(() => {
                dispatch({ type: "resetGame" });
            }, 2500);
        }
    }, [isDealersTurnIsOver]);

    return (
        <div className="App">
            <Link to="/" className="linkBtn">
                Main
            </Link>
            <OverlayProvider>
                <Dealer />

                {!isBetFlag && balance >= 5 && betHistory.length === 0 && (
                    <Message
                        messageText="Welcome, place your bet!"
                        color="white"
                    />
                )}
                {!isBetFlag && balance >= 5 && betHistory.length !== 0 && (
                    <Message messageText="Press deal to start!" color="white" />
                )}

                {!isBetFlag && balance < 5 && betHistory.length === 0 && (
                    <Message
                        messageText="Please buy tokens to continue!"
                        color="white"
                    />
                )}
                {!busted && isDealersTurnIsOver && isDrawFlag && (
                    <Message messageText="Draw" color="white" />
                )}

                {isDealersTurnIsOver &&
                    isDealerWinsFlag &&
                    !isPlayerBustedFlag && (
                        <Message messageText="Dealer win!" color="white" />
                    )}
                {isDealersTurnIsOver &&
                    isPlayerWinsFlag &&
                    !isDealerBustedFlag && (
                        <Message messageText="Player win!" color="white" />
                    )}
                {/* <CanvasAnimation /> */}
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
                <ModalOverlay />
            </OverlayProvider>
        </div>
    );
};

export default Game;
