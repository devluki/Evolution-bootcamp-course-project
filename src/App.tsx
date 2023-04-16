import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, DeckOfCards } from "./components/cardDeck/cardDeck";

import { Player } from "./components/player/Player";
import { Dealer } from "./components/dealer/Dealer";

import "./App.css";

function App() {
    // 1. Player sets bet -> game begins
    const [isBet, setIsBet] = useState(false); // Initialized with false
    // 2. Player final hand
    const [isStand, setIsStand] = useState(false);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);

    const playerScore = useRef(0);
    const dealerScore = useRef(0);

    const [isPlayerWins, setisPlayerWins] = useState(false);
    const [isDealerWins, setIsDealerWins] = useState(false);
    const [isDraw, setIsDraw] = useState(false);

    const [isPlayerBusted, setIsPlayerBusted] = useState(false);
    const [isDealerBusted, setIsDealerBusted] = useState(false);

    const [balance, setBalance] = useState(100);

    const [shoe, setShoe] = useState<Card[]>([]);

    // Resets game to initial state
    const resetGame = () => {
        setIsBet(false);
        setIsStand(false);
        setPlayerHand([]);
        setDealerHand([]);
        setisPlayerWins(false);
        setIsDealerWins(false);
        setIsDraw(false);
        setIsPlayerBusted(false);
        setIsDealerBusted(false);
    };

    const winnerCheck = () => {
        console.log(
            "dealer:",
            dealerScore.current,
            "player:",
            playerScore.current,
        );
        if (dealerScore.current < playerScore.current) {
            setisPlayerWins(true);
            setIsDealerWins(false);
        } else if (
            dealerScore.current !== 0 &&
            dealerScore.current === playerScore.current
        ) {
            setIsDraw(true);
        } else {
            setisPlayerWins(false);
            setIsDealerWins(true);
        }
    };

    // Generates shoe from number of decks
    const generateShoe = (noOfDecks: number) => {
        let shoe: Card[] = [];
        for (let i = 0; i < noOfDecks; i++) {
            const newDeck = new DeckOfCards();
            shoe = [...shoe, ...newDeck.cards];
        }

        return shoe;
    };
    // Shuffle shoe
    const shuffle = (cards: Card[]) => {
        let curIndex = cards.length;
        let randomIndex: number;
        while (curIndex !== 0) {
            randomIndex = Math.floor(Math.random() * curIndex);
            curIndex--;
            [cards[curIndex], cards[randomIndex]] = [
                cards[randomIndex],
                cards[curIndex],
            ];
        }

        return cards;
    };

    const aceScoreHandler = (hand: Card[]) => {
        let isAceInHand = false;

        const aceIndexes: number[] = [];

        for (let i = 0; i < hand.length; i++) {
            if (hand[i].getName.toLocaleLowerCase() === "ace") {
                isAceInHand = true;

                aceIndexes.push(i);
            }
        }

        return { isAceInHand, aceIndexes };
    };

    const count = (hand: Card[]) => {
        let score = 0;
        for (let i = 0; i < hand.length; i++) {
            score += hand[i].getScore;
        }
        return score;
    };

    const countScore = useCallback((hand: Card[], isPlayer: boolean) => {
        let score: number = count(hand);

        const { isAceInHand, aceIndexes } = aceScoreHandler(hand);

        if (isAceInHand && score + 9 < 22) {
            for (let i = 0; i < aceIndexes.length; i++) {
                if (score + 10 < 22) {
                    hand[aceIndexes[i]].setScore = 10;
                    score = count(hand);
                }
            }
        }

        if (isAceInHand && score > 21) {
            for (let i = 0; i < aceIndexes.length; i++) {
                if (score > 21) {
                    hand[aceIndexes[i]].setScore = 1;
                    score = count(hand);
                }
            }
        }

        if (score > 21 && isPlayer) {
            setIsPlayerBusted(true);
        }
        if (score > 21 && !isPlayer) {
            setIsDealerBusted(true);
            setBalance((prev) => prev + 15 + 10);
        }
        if (isPlayer) {
            playerScore.current = score;
        }
        if (!isPlayer) {
            dealerScore.current = score;
        }

        return score;
    }, []);

    const Initialize = () => {
        const playerHand = [] as Card[];
        const dealerHand = [] as Card[];
        const shoeCopy: Card[] = [];
        shoe.map((card) => shoeCopy.push(new Card(card.rank, card.suit)));

        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) {
                playerHand.push(shoeCopy.pop() as Card);
            } else {
                dealerHand.push(shoeCopy.pop() as Card);
            }
        }

        playerScore.current = countScore(playerHand, true);
        dealerScore.current = countScore(dealerHand, false);

        setBalance((prev) => prev - 10);
        setIsBet((prev) => !prev);
        setShoe(shoeCopy);
        setPlayerHand(playerHand);
        setDealerHand(dealerHand);
    };

    const hitHandler = useCallback(
        (isPlayer: boolean) => {
            const hand = [] as Card[];
            const shoeCopy: Card[] = [];
            shoe.map((card) => shoeCopy.push(new Card(card.rank, card.suit)));
            hand.push(shoeCopy.pop() as Card);

            setShoe(shoeCopy);
            if (isPlayer) {
                setPlayerHand([...playerHand, ...hand]);
                playerScore.current = countScore(
                    [...playerHand, ...hand],
                    true,
                );
            } else {
                setDealerHand([...dealerHand, ...hand]);

                dealerScore.current = countScore(
                    [...dealerHand, ...hand],
                    false,
                );
            }
        },
        [dealerHand, countScore, playerHand, shoe],
    );

    // On first render creates new shoe
    useEffect(() => {
        const newShoe = shuffle(generateShoe(5));
        console.log(newShoe);
        setShoe(newShoe);
    }, []);

    // Reset shoe -> when there are 60 cards left
    useEffect(() => {
        if (shoe.length < 60) {
            const newShoe = shuffle(generateShoe(1));
            setShoe(newShoe);
        }
    }, [shoe.length]);

    const standHandler = () => {
        setIsStand(true);
        // if (
        //     dealerScore.current < 17 &&
        //     dealerScore.current < playerScore.current
        // ) {
        //     hitHandler(false);
        // }
        // console.log(dealerScore, playerScore);
        // winnerCheck();
    };

    useEffect(() => {
        const intervalLoop = setInterval(() => {
            if (
                isStand &&
                dealerScore.current < 17 &&
                dealerScore.current < playerScore.current
            ) {
                console.log("Interval running");
                hitHandler(false);
            } else {
                console.log("Clear interval");
                clearInterval(intervalLoop);
                if (isStand) {
                    winnerCheck();
                }
            }
        }, 700);

        return () => {
            return clearInterval(intervalLoop);
        };
    }, [hitHandler, isStand]);

    return (
        <div className="App">
            <Dealer
                isBet={isBet}
                isStand={isStand}
                dealerHand={dealerHand}
                dealerScore={dealerScore.current}
            />
            {isPlayerBusted && (
                <p
                    style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: 2 + "em",
                    }}
                >
                    PLAYER BUSTED
                </p>
            )}
            {isDealerBusted && (
                <p
                    style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: 2 + "em",
                    }}
                >
                    DEALER BUSTED
                </p>
            )}
            {!isDealerBusted && !isPlayerBusted && isDraw && isStand && (
                <p
                    style={{
                        color: "yellow",
                        fontWeight: "bold",
                        fontSize: 2 + "em",
                    }}
                >
                    Draw
                </p>
            )}
            {isPlayerWins && isStand && !isDraw && (
                <p
                    style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: 2 + "em",
                    }}
                >
                    Player wins
                </p>
            )}
            {!isDealerBusted && isDealerWins && isStand && (
                <p
                    style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: 2 + "em",
                    }}
                >
                    Dealer wins
                </p>
            )}

            <Player
                isBet={isBet}
                isBusted={isPlayerBusted}
                isPlayerWins={isPlayerWins}
                isDealerWins={isDealerWins}
                isStand={isStand}
                isDraw={isDraw}
                playerHand={playerHand}
                init={Initialize}
                onStandHandler={standHandler}
                onHitHandler={hitHandler}
                score={playerScore.current}
                onReset={resetGame}
                balance={balance}
            />
        </div>
    );
}

export default App;
