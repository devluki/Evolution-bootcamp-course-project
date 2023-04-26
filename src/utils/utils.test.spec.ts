import { Card } from "../models/cards";
import {
    generateShoe,
    shuffle,
    setHands,
    count,
    isAceInHandCheck,
    countHandScore,
    drawCard,
    isBusted,
} from "./utils";

describe("It should generate given amount of card decks", () => {
    it("should generate array with 52 elements (one deck)", () => {
        const noOfDecks = 1;
        const arr = generateShoe(noOfDecks);
        console.log(arr.length);
        expect(arr).toHaveLength(52);
    });
    it("should generate array with 104 elements (two decks)", () => {
        const noOfDecks = 2;
        const arr = generateShoe(noOfDecks);
        console.log(arr.length);
        expect(arr).toHaveLength(104);
    });
});

describe("It should shuffle given amount of card decks", () => {
    it("should shuffle array in random order)", () => {
        const noOfDecks = 1;
        const arr = shuffle(generateShoe(noOfDecks));

        expect(arr[0]).not.toBe({ rank: 1, score: 1, suit: 0 });
    });
    it("should shuffle array in random order and same lenght)", () => {
        const noOfDecks = 1;
        const arr = shuffle(generateShoe(noOfDecks));

        expect(arr).toHaveLength(52);
    });
});

describe("It should deal initial amount of cards (2 for each player)", () => {
    it("should set initial hands (2 cards each hand))", () => {
        const noOfDecks = 2;
        const arr = generateShoe(noOfDecks);
        const { dealerHand, playerHand } = setHands(arr);
        expect(dealerHand).toHaveLength(2);
        expect(playerHand).toHaveLength(2);
    });
});
describe("It should count initial score", () => {
    it("is should count score of given array of cards", () => {
        const cards: Card[] = [new Card(1, 1), new Card(2, 2), new Card(3, 1)];
        const score = count(cards);
        expect(score).toEqual(6);
    });
});
describe("It should check if ACE card is in array of Cards", () => {
    it("is should return an idexes of ACE cards", () => {
        const aceCard1 = new Card(1, 1);
        const aceCard2 = new Card(1, 2);
        const cards: Card[] = [
            aceCard1,
            new Card(2, 2),
            new Card(3, 1),
            aceCard2,
        ];
        const { isAceInHand, aceIndexes } = isAceInHandCheck(cards);
        expect(aceIndexes).toHaveLength(2);
        expect(aceIndexes[0]).toBe(0);
        expect(aceIndexes[1]).toBe(3);
    });
    it("is should return a false if there are no Ace cards", () => {
        const cards: Card[] = [
            new Card(3, 1),
            new Card(2, 2),
            new Card(3, 1),
            new Card(3, 2),
        ];
        const { isAceInHand, aceIndexes } = isAceInHandCheck(cards);
        expect(isAceInHand).toBe(false);
    });
    it("is should return a true if there is atleast one  Ace card", () => {
        const cards: Card[] = [
            new Card(1, 1), //Ace card
            new Card(2, 2),
            new Card(3, 1),
            new Card(3, 2),
        ];
        const { isAceInHand, aceIndexes } = isAceInHandCheck(cards);
        expect(isAceInHand).toBe(true);
    });
});

describe("It should count Ace score 1 or 11", () => {
    it("is should count Ace score 11 unless initial score is bigger than 21", () => {
        const cards11: Card[] = [new Card(1, 1), new Card(2, 2)];
        const cards1: Card[] = [
            new Card(1, 1),
            new Card(2, 2),
            new Card(10, 2),
        ];
        const scoreAce11 = countHandScore(cards11);
        const scoreAce1 = countHandScore(cards1);
        expect(scoreAce11).toEqual(13);
        expect(scoreAce1).toEqual(13);
        expect(cards11[0].getScore).toBe(11);
        expect(cards1[0].getScore).toEqual(1);
    });
});
describe("It draw a card from a shoe", () => {
    it("is should remove drawn card from shoe", () => {
        const playerHand: Card[] = [new Card(2, 2), new Card(8, 1)];
        const noOfDecks = 1;
        const shoe = generateShoe(noOfDecks);
        const { shoeCopy, hand } = drawCard(shoe, playerHand);

        expect(shoeCopy).toHaveLength(51);
        expect(hand).toHaveLength(3);
    });
});

describe("It should check if player is busted", () => {
    it("is should return true if score is above 21", () => {
        const hand: Card[] = [new Card(10, 2), new Card(8, 1), new Card(10, 1)];
        const score = count(hand);
        const isBustedCheck = isBusted(score);

        expect(isBustedCheck).toBe(true);
    });
    it("is should return false if score is below 21", () => {
        const hand: Card[] = [new Card(2, 2), new Card(8, 1), new Card(10, 1)];
        const score = count(hand);
        const isBustedCheck = isBusted(score);

        expect(isBustedCheck).toBe(false);
    });
});
