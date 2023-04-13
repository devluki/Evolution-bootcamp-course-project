import { Card } from "../cardDeck/cardDeck";
import { PlayerActions } from "./PlayerActions";
import { PlayerHand } from "./PlayerHand";

interface PlayerProps {
    isBet: boolean;
    isStand: boolean;
    isPlayerWins: boolean;
    isDealerWins: boolean;
    isDraw: boolean;
    playerHand: Card[];
    score: number;
    isBusted: boolean;
    balance: number;
    init: () => void;
    onStandHandler: () => void;
    onHitHandler: (isPlayer: boolean) => void;
    onReset: () => void;
}

export const Player = (props: PlayerProps) => {
    return (
        <>
            <div style={{ color: "white", marginTop: "10%" }}>
                <p>Player component</p>
                <PlayerHand hand={props.playerHand} />
                <p>Your score:{props.isBet && props.score}</p>
                <PlayerActions
                    isBet={props.isBet}
                    isStand={props.isStand}
                    isPlayerWins={props.isPlayerWins}
                    isDealerWins={props.isDealerWins}
                    init={props.init}
                    onStandHandler={props.onStandHandler}
                    onHitHandler={props.onHitHandler}
                    isBusted={props.isBusted}
                    isDraw={props.isDraw}
                    onReset={props.onReset}
                />
                <p
                    style={{
                        color: "green",
                        marginTop: "3%",
                        fontSize: 2 + "em",
                    }}
                >
                    $ {props.balance}
                </p>
            </div>
        </>
    );
};
