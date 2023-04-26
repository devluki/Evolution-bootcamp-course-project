import { Card, DeckOfCards, Suit } from "./cards";

describe("It should create a card", () => {
    it("should create a card, with given rank and suit", () => {
        const rank = 11;
        const suit = 2;
        const card = new Card(rank, suit);

        expect(card.getSuit).toBe(Suit[suit]);
        expect(card.getSuit).toBe("Hearts");
        expect(card.getScore).toBe(10);
        expect(card.getName).toBe("Jack");
    });
});
describe("It should create a deck of cards", () => {
    it("should create a deck of cards, with 52 elements", () => {
        const deck = new DeckOfCards();
        expect(deck.cards).toHaveLength(52);
    });
});
