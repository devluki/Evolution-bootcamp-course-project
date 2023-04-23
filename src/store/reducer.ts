import {
    generateShoe,
    shuffle,
    setHands,
    countHandScore,
    drawCard,
    drawWhileUnder17,
    isBusted,
    isBlackJack,
} from "../utils/utils";

const initialState: BlackJackState = {
    isBetFlag: false,
    isStandFlag: false,
    isDoubleDownFlag: false,
    isPlayerWinsFlag: false,
    isDealerWinsFlag: false,
    isDealerHandCopmlete: false,
    isDrawFlag: false,
    playerScore: 0,
    dealerScore: 0,
    balance: 100,
    currentBet: 0,
    isPlayerBustedFlag: false,
    isDealerBustedFlag: false,
    selectedTokenVal: 0,
    shoe: [],
    playerHand: [],
    dealerHand: [],
    betHistory: [],
};

// Set current chip add chip to balance remove chip from balance

export function blackJakReducer(
    state = initialState,
    action: BlackJackAction,
): BlackJackState {
    switch (action.type) {
        //Game initialization
        case "init":
            const newShoe = shuffle(generateShoe(action.payload.numberOfDecks));
            const { playerHand, dealerHand } = setHands(newShoe);
            const playerScore = countHandScore(playerHand);
            const dealerScore = countHandScore(dealerHand);
            return {
                ...state,
                shoe: newShoe,
                playerHand,
                dealerHand,
                playerScore,
                dealerScore,
            };

        case "setBetFlag":
            console.log("State Redux", state);
            const isBetFlag = true;

            return { ...state, isBetFlag };
        case "setDoubleDownFlag":
            return { ...state, isDoubleDownFlag: true };

        case "setStandFlag":
            const isStandFlag = true;
            return { ...state, isStandFlag };

        // HIT action

        case "hit":
            const { shoeCopy: updatedShoe, hand } = drawCard(
                state.shoe,
                state.playerHand,
            );
            console.log(hand, state);
            const playerScoreUpdated = countHandScore([...hand]);
            const isPlayerBusted = isBusted(playerScoreUpdated);

            return {
                ...state,
                shoe: updatedShoe,
                playerHand: hand,
                playerScore: playerScoreUpdated,
                isPlayerBustedFlag: isPlayerBusted,
                // isDealerWinsFlag: true,
            };
        case "dealerMustDraw": //Change name
            const { shoeCopy: updatedShoeDealer, hand: updatedDealerHand } =
                drawWhileUnder17(
                    state.shoe,
                    state.dealerHand,
                    state.dealerScore,
                );
            const dealerScoreUpdatedDraw = countHandScore([
                ...updatedDealerHand,
            ]);

            const bustedDraw = isBusted(dealerScoreUpdatedDraw);
            return {
                ...state,
                shoe: updatedShoeDealer,
                dealerHand: updatedDealerHand,
                dealerScore: dealerScoreUpdatedDraw,
                isDealerBustedFlag: bustedDraw,
                isPlayerWinsFlag: bustedDraw,
            };
        case "setCurToken":
            const curToken = action.payload.tokenValue;
            console.log(curToken, "CurBET:", state.currentBet);
            return {
                ...state,
                selectedTokenVal: curToken,
            };
        case "increaseBet":
            let betValue = state.currentBet;
            betValue += state.selectedTokenVal;
            const updatedBalance = state.balance - state.selectedTokenVal;
            return {
                ...state,
                currentBet: betValue,
                betHistory: [...state.betHistory, state.selectedTokenVal],
                balance: updatedBalance,
            };
        case "doubleBet":
            const doubledBet = [...state.betHistory, ...state.betHistory];
            const doubledBetValue = doubledBet.reduce((acc, cur) => acc + cur);
            const balance = state.balance - doubledBetValue / 2;

            return {
                ...state,
                betHistory: doubledBet,
                currentBet: doubledBetValue,
                balance,
            };
        case "undoBet":
            const lastBetValue = state.betHistory.pop() || 0;
            console.log(lastBetValue, state.betHistory);
            const updatedCurBet = state.currentBet - lastBetValue;
            const balanceRestore = state.balance + lastBetValue;

            return {
                ...state,
                currentBet: updatedCurBet,
                balance: balanceRestore,
            };
        case "resetBet":
            const initialBalance =
                state.balance +
                state.betHistory.reduce((acc, cur) => acc + cur);
            return {
                ...state,

                balance: initialBalance,
                currentBet: 0,
                betHistory: [],
            };
        case "checkForWinners":
            //  if (state.isStandFlag) {
            console.log(state.playerScore, state.dealerScore);
            const isPlayerWin =
                (!state.isPlayerBustedFlag &&
                    state.playerScore > state.dealerScore) ||
                state.isDealerBustedFlag;

            const isDealerWin =
                (!state.isDealerBustedFlag &&
                    state.playerScore < state.dealerScore) ||
                state.isPlayerBustedFlag;
            const isDraw =
                state.playerScore === state.dealerScore ? true : false;

            const is21 = isBlackJack(state.playerHand);

            let price: number = 0;
            if (isPlayerWin && is21) {
                price = (state.currentBet * 3) / 2 + state.currentBet;
            }
            if (isPlayerWin && !is21) {
                price = state.currentBet * 2;
            }
            if (isDraw) {
                price = state.currentBet;
            }

            // const price
            return {
                ...state,
                isPlayerWinsFlag: isPlayerWin,
                isDealerWinsFlag: isDealerWin,
                isDrawFlag: isDraw,
                balance: state.balance + price,
            };
        // }
        // return state;
        case "resetGame":
            const newBalance = state.balance;
            return { ...initialState, balance: newBalance };
        case "getState":
            console.log("FINAL STATE:", state);
            return state;
        case "setDealerHandCopleteFlag":
            return { ...state, isDealerHandCopmlete: true };
    }
    return state;
}
