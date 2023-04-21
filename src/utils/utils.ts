// CARD DECK

enum Suit {
    Spades,
    Clubs,
    Hearts,
    Diamonds,
}

export class Card {
    readonly rank: number;
    readonly suit: Suit;
    private score: number;
    constructor(rank: number, suit: Suit) {
        this.rank = rank;
        this.suit = suit;
        this.score = this.rank < 11 ? this.rank : 10;
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
        return this.score;
    }
    public set setScore(val: number) {
        this.score = val;
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

// Generates shoe from number of decks
export const generateShoe = (noOfDecks: number) => {
    let shoe: Card[] = [];
    for (let i = 0; i < noOfDecks; i++) {
        const newDeck = new DeckOfCards();
        shoe = [...shoe, ...newDeck.cards];
    }

    return shoe;
};

// Shuffle shoe
export const shuffle = (cards: Card[]) => {
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

//

//
export const setHands = (shoe: Card[]) => {
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
    return { dealerHand, playerHand };
};

// Count score of given array of Cards
const count = (hand: Card[]) => {
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        score += hand[i].getScore;
    }
    return score;
};

// Checks if is Ace in hand - returns true/false and Ace index
const isAceInHandCheck = (hand: Card[]) => {
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

// Counts current score of hands Ace could be scored as 1 or 10 depends on total hand score
export const countHandScore = (hand: Card[]) => {
    let score: number = count(hand);
    const { isAceInHand, aceIndexes } = isAceInHandCheck(hand);
    if (isAceInHand && score + 9 < 22) {
        for (let i = 0; i < aceIndexes.length; i++) {
            if (score + 10 < 22) {
                hand[aceIndexes[i]].setScore = 11; // 11
                score = count(hand);
            }
        }
    } else if (isAceInHand && score > 21) {
        for (let i = 0; i < aceIndexes.length; i++) {
            if (score > 21) {
                hand[aceIndexes[i]].setScore = 1;
                score = count(hand);
            }
        }
    }

    return score;
};

// Hit action for player --> draws one card
export const drawCard = (shoe: Card[], hand: Card[]) => {
    const drawnCard = [] as Card[];
    const shoeCopy: Card[] = [];
    shoe.map((card) => shoeCopy.push(new Card(card.rank, card.suit)));
    drawnCard.push(shoeCopy.pop() as Card);
    return { shoeCopy, hand: [...hand, ...drawnCard] as Card[] };
};

// Hit action for dealer ---> when player stays dealer draw cards untill 17 score on hand
export const drawWhileUnder17 = (shoe: Card[], hand: Card[], score: number) => {
    const drawnCard = [] as Card[];
    const shoeCopy: Card[] = [];
    shoe.map((card) => shoeCopy.push(new Card(card.rank, card.suit)));
    let curScore = score;
    while (curScore < 17) {
        drawnCard.push(shoeCopy.pop() as Card);

        curScore = countHandScore([...hand, ...drawnCard]);
        console.log(curScore);
    }

    return { shoeCopy, hand: [...hand, ...drawnCard] as Card[] };
};

// Check if busted

export const isBusted = (score: number) => {
    return score > 21 ? true : false;
};

export const isBlackJack = (hand: Card[]) => {
    if (hand.length > 2) return false;

    const isFirstCardAceOrJack =
        hand[0].getName.toLocaleLowerCase() === "ace" ||
        hand[0].getName.toLocaleLowerCase() === "jack";
    const isSecondCardAceOrJack =
        hand[1].getName.toLocaleLowerCase() === "ace" ||
        hand[1].getName.toLocaleLowerCase() === "jack";

    console.log(
        "BLACKJACK???",
        isFirstCardAceOrJack && isSecondCardAceOrJack,
        hand,
    );
    return isFirstCardAceOrJack && isSecondCardAceOrJack;
};

export const TOKEN_DATA = [
    { value: 5, color: "#317DDD", textColor: "white" }, //"#0c1e33" },
    { value: 10, color: "#DD4631", textColor: "white" }, //"#32110d" },
    { value: 25, color: "#555", textColor: "white" }, //"#32110d" },
    { value: 50, color: "#246824", textColor: "white" }, //"#32110d" },
    { value: 100, color: "#511251", textColor: "white" }, //"#32110d" },
];
