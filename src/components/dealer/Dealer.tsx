import { useSelector } from "react-redux";
import { DealerHand } from "./DealerHand";

interface DealerProps {
    isBet: boolean;
    isStand: boolean;
}

export const Dealer = (props: DealerProps) => {
    const { isBet, isStand } = props;
    const { isStandFlag, dealerScore, dealerHand, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );

    return (
        <>
            <div style={{ color: "white" }}>
                {isBetFlag && (
                    <p>
                        Dealer score:
                        {(!isStandFlag && dealerHand[0]?.getScore) || ""}
                        {isStandFlag && dealerScore}
                    </p>
                )}
                {<DealerHand isStand={isStandFlag} dealerScore={dealerScore} />}
            </div>
        </>
    );
};
