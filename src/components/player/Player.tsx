import { useSelector } from "react-redux";
import { PlayerActions } from "./PlayerActions";
import { PlayerHand } from "./PlayerHand";

export const Player = () => {
    const { playerScore, isBetFlag } = useSelector(
        (state: BlackJackState) => state,
    );
    return (
        <>
            <div style={{ color: "white", marginTop: "10%" }}>
                <PlayerHand />
                {isBetFlag && <p>Your score:{playerScore}</p>}
            </div>
        </>
    );
};
