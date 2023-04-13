import React, { useState, useEffect, useCallback } from "react";
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

    const [curPlayerScore, setCurPlayerScore] = useState<number>(0);
    const [curDealerScore, setCurDealerScore] = useState<number>(0);

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
        setCurDealerScore(0);
        setCurPlayerScore(0);
        setisPlayerWins(false);
        setIsDealerWins(false);
        setIsDraw(false);
        setIsPlayerBusted(false);
        setIsDealerBusted(false);
    };

    // const winnerCheck = useCallback(() => {
    //     if (curDealerScore < curPlayerScore) {
    //         // console.log("Win check - player");
    //         setisPlayerWins(true);
    //         setIsDealerWins(false);
    //     } else if (curDealerScore > 0 && curDealerScore === curPlayerScore) {
    //         // console.log("Win check - draw");
    //         setIsDraw(true);
    //     } else {
    //         // console.log("Win check - dealer");
    //         setisPlayerWins(false);
    //         setIsDealerWins(true);
    //     }
    // }, [curDealerScore, curPlayerScore]);

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

    const countScore = useCallback((hand: Card[], isPlayer: boolean) => {
        let score: number = 0;

        hand.map((card) => {
            return (score += card.getScore);
        });
        if (score > 21 && isPlayer) {
            setIsPlayerBusted(true);
        }
        if (score > 21 && !isPlayer) {
            setIsDealerBusted(true);
            setBalance((prev) => prev + 15 + 10);
        }
        return score;
    }, []);
    // const countScore = useCallback(
    //     (hand: Card[], isPlayer: boolean) => {
    //         let score: number = 0;
    //         // let isAce = false;
    //         if (isPlayer || (!isPlayer && isStand)) {
    //             hand.map((card) => {
    //                 // console.log(isAce);
    //                 return (score += card.getScore);
    //             });
    //             if (score > 21 && isPlayer) {
    //                 setIsPlayerBusted(true);
    //             } else if (score > 21 && !isPlayer) {
    //                 setIsDealerBusted(true);
    //             }
    //         } else if (!isPlayer && !isStand) {
    //             score += hand[0].getScore;
    //         }

    //         return score;
    //         },
    //     [isStand],
    // );
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

        const curPlayerScore = countScore(playerHand, true);
        // const curPlayerScore = countScore(playerHand, true);
        //const curDealerScore = countScore(dealerHand, false);
        const curDealerScore = dealerHand[0].getScore;
        console.log(curDealerScore);
        setBalance((prev) => prev - 10);
        setIsBet((prev) => !prev);
        setShoe(shoeCopy);
        setPlayerHand(playerHand);
        setCurPlayerScore(curPlayerScore);
        setCurDealerScore(curDealerScore);
        setDealerHand(dealerHand);

        // return { playerHand, dealerHand };
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

                const curPlayerScore = countScore(
                    [...playerHand, ...hand],
                    true,
                );

                // const curPlayerScore = countScore(
                //     [...playerHand, ...hand],
                //     true,
                // );

                setCurPlayerScore(curPlayerScore);
            } else {
                setDealerHand([...dealerHand, ...hand]);
                const curDealerScore = countScore(
                    [...dealerHand, ...hand],
                    false,
                );

                // const curDealerScore = countScore(
                //     [...dealerHand, ...hand],
                //     false,
                // );
                setCurDealerScore(curDealerScore);
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
        let curScore = countScore(dealerHand, false);
        setCurDealerScore(curScore);
        if (curScore < 17) {
            hitHandler(false);
        }

        console.log("Scores", curPlayerScore, curScore, curDealerScore);
        if (curScore > curPlayerScore) {
            setisPlayerWins(false);
            setIsDealerWins(true);
        } else if (curScore < curPlayerScore) {
            setisPlayerWins(true);
            setIsDealerWins(false);
            setBalance((prev) => prev + 15 + 10);
        } else if (curScore === curPlayerScore) {
            setIsDraw(true);
            setBalance((prev) => prev + 10);
        }
    };

    return (
        <div className="App">
            <Dealer
                isBet={isBet}
                isStand={isStand}
                dealerHand={dealerHand}
                dealerScore={curDealerScore}
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
                score={curPlayerScore}
                onReset={resetGame}
                balance={balance}
            />
        </div>
    );
}

export default App;
