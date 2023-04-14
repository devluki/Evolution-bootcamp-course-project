import { DealerHand } from "./DealerHand";
import { Card } from "../cardDeck/cardDeck";

interface DealerProps {
    isBet: boolean;
    isStand: boolean;
    dealerScore: number;
    dealerHand: Card[];
}

export const Dealer = (props: DealerProps) => {
    const { isBet, isStand, dealerHand, dealerScore } = props;

    return (
        <>
            <div style={{ color: "white" }}>
                <p>Dealer seat</p>
                <p>
                    Dealer score:
                    {props.isBet && props.isStand && dealerScore}
                    {props.isBet && !props.isStand && dealerHand[0].getScore}
                </p>
                {isBet && (
                    <DealerHand
                        isStand={isStand}
                        hand={dealerHand}
                        dealerScore={dealerScore}
                    />
                )}
            </div>
        </>
    );
};
