interface PlayerActionsProps {
    isBet: boolean;
    isStand: boolean;
    isBusted: boolean;
    isPlayerWins: boolean;
    isDealerWins: boolean;
    isDraw: boolean;
    init: () => void;
    onStandHandler: () => void;
    onHitHandler: (isPlayer: boolean) => void;
    onReset: () => void;
}

export const PlayerActions = (props: PlayerActionsProps) => {
    const isGameOver =
        props.isBusted ||
        (props.isPlayerWins && props.isStand) ||
        (props.isDealerWins && props.isStand);

    console.log("GameOver", isGameOver, props.isBusted, props.isPlayerWins);
    return (
        <>
            <div>
                <p>Player Actions</p>
                {!props.isBet && !isGameOver && (
                    <button onClick={props.init}>Set bet $10</button>
                )}
                {props.isBet && !isGameOver && (
                    <button onClick={props.onStandHandler}>Stand</button>
                )}
                {props.isBet && !isGameOver && (
                    <button onClick={() => props.onHitHandler(true)}>
                        Hit
                    </button>
                )}
                {isGameOver && (
                    <button onClick={props.onReset}>Play again</button>
                )}
            </div>
        </>
    );
};
