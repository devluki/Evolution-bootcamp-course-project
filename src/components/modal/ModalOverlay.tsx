import { createPortal } from "react-dom";
import {
    createContext,
    useState,
    ReactNode,
    useContext,
    useEffect,
} from "react";
import { Modal } from "./Modal";
// import styles from "./ModalOverlay.module.css";

type PlayerAction = null | "Hit" | "Double";

interface OverlayCtx {
    playerAction?: PlayerAction;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    setActionType: (action: PlayerAction) => void;
}
type Props = {
    children: ReactNode;
};

let OverlayCtxInitial: OverlayCtx = {
    playerAction: null,
    isVisible: false,
    setIsVisible: () => {
        console.log("");
    },
    setActionType: () => {},
};

export const OverlayCtx = createContext(OverlayCtxInitial);

export const OverlayProvider = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [playerAction, setPlayerAction] = useState<PlayerAction>(null);

    const setIsVisibleHandler = (value: boolean) => {
        setIsVisible(value);
    };

    const playerActionHandler = (actionType: PlayerAction = null) => {
        setPlayerAction(actionType);
    };
    useEffect(() => {
        OverlayCtxInitial.setIsVisible = setIsVisibleHandler;
        OverlayCtxInitial.setActionType = playerActionHandler;
    }, []);

    return (
        <>
            <OverlayCtx.Provider
                value={{
                    isVisible,
                    setIsVisible: setIsVisibleHandler,
                    playerAction,
                    setActionType: playerActionHandler,
                }}
            >
                {props.children}
            </OverlayCtx.Provider>
        </>
    );
};

export const ModalOverlay: React.FC = () => {
    const { isVisible } = useContext(OverlayCtx);

    const overlay = isVisible && <Modal />;
    return createPortal(
        overlay,
        document.getElementById("overlay") as HTMLElement,
    );
};
