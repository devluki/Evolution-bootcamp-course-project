export enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

export class Card {
    readonly rank: number;
    readonly suit: Suit;
    constructor(rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
    }

    private static rankNames = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
    ];
    public get getName(): string {
        return Card.rankNames[this.rank - 1];
    }

    public get getSuit(): string {
        return Suit[this.suit];
    }
    public get getScore(): number {
        let score: number;

        if (this.rank < 11) {
            score = this.rank;
        } else {
            score = 10;
        }
        return score;
    }
}

export class DeckOfCards {
    readonly cards: Card[];
    constructor() {
        this.cards = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 14; j++) {
                this.cards.push(new Card(j, i));
            }
        }
    }
}
