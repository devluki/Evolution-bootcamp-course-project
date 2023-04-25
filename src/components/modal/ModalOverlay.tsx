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

interface OverlayCtx {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}
type Props = {
    children: ReactNode;
};

let OverlayCtxInitial: OverlayCtx = {
    isVisible: false,
    setIsVisible: () => {
        console.log("initial set is visible");
    },
};

export const OverlayCtx = createContext(OverlayCtxInitial);

export const OverlayProvider = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const setIsVisibleHandler = (value: boolean) => {
        setIsVisible(value);
    };
    useEffect(() => {
        OverlayCtxInitial.setIsVisible = setIsVisibleHandler;
    }, []);

    return (
        <>
            <OverlayCtx.Provider
                value={{ isVisible, setIsVisible: setIsVisibleHandler }}
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
