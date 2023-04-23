interface BlackJackState {
    isBetFlag: boolean;
    isStandFlag: boolean;
    isDoubleDownFlag: boolean;
    isPlayerBustedFlag: boolean;
    isDealerBustedFlag: boolean;

    isPlayerWinsFlag: boolean;
    isDealerWinsFlag: boolean;
    isDrawFlag: boolean;
    isDealerHandCopmlete: boolean;
    currentBet: number;
    balance: number;
    playerScore: number;
    dealerScore: number;
    selectedTokenVal: number;
    shoe: Card[];
    playerHand: Card[];
    dealerHand: Card[];
    betHistory: number[];
}

type BlackJackAction =
    | { type: "init"; payload: { numberOfDecks: number } }
    | { type: "setBetFlag"; payload: { value: number } }
    | { type: "setStandFlag" }
    | { type: "setDoubleDownFlag" }
    | { type: "hit" }
    | { type: "dealerMustDraw" }
    | { type: "doubleDown" }
    | { type: "doubleBet" }
    | { type: "setCurToken"; payload: { tokenValue: number } }
    | { type: "increaseBet" }
    | { type: "resetBet" }
    | { type: "undoBet" }
    | { type: "resetGame" }
    | { type: "checkForWinners" }
    | { type: "getState" }
    | { type: "setDealerHandCopleteFlag" };

enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

interface BalanceIndicatorProps {
    currentBetValue: number;
    currentBalance: number;
}

interface MessageProps {
    messageText: string;
}

interface ButtonProps {
    onClick: () => void;
    innerText: string;
}

interface ClockProps {
    hours: number;
    minutes: number;
    seconds: number;
}

interface ScoreIndicatorProps {
    score: number;
    isPlayer: boolean;
    isBetFlag: boolean;
}

interface BetIndicatorProps {
    bet: number;
}

type DelayFunction = (
    params: number | boolean | string | Card | Card[] | null = null,
) => void;

type AnimationType = "slide" | "flip" | "rotate90";
