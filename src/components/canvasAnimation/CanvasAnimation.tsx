import { useRef, useEffect, useCallback, useState } from "react";
import classes from "./CanvasAnimation.module.css";
import img from "../../models/logoParticles.json";
import imgMobile from "../../models/logoParticlesMobile.json";
import { Effect } from "../../models/canvas";

const CanvasAnimation = () => {
    interface RefObject<T> {
        readonly current: T | null;
    }

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        // console.log(window.innerWidth, window.innerHeight);
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    const [isLoaded, setIsLoaded] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleAnimationLoading = () => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    };

    const mouseOverHandler = (isOver: boolean) => {
        setIsMouseOver(isOver);
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const getContext = useCallback(
        (canvasRef: RefObject<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext("2d");
                return context;
            }
            return undefined;
        },
        [],
    );
    const animate = useCallback(
        (
            effect: Effect,
            ctx: CanvasRenderingContext2D,
            canvasWidth: number,
            canvasHeight: number,
        ) => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            effect.draw(ctx);
            effect.update();

            requestAnimationFrame(() =>
                animate(effect, ctx, canvasWidth, canvasHeight),
            );
        },
        [],
    );

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const image = imgRef.current as HTMLImageElement;

        canvas.height = dimensions.height;
        canvas.width = dimensions.width;

        const ctx = getContext(canvasRef)!;

        const effect = new Effect(canvas.width, canvas.height, image);
        effect.init(ctx);
        // console.log(effect);
        animate(effect, ctx, canvas.width, canvas.height);
    }, [getContext, animate, dimensions]);

    useEffect(() => {
        handleAnimationLoading();
    }, []);

    //
    const canvasLoad = !isLoaded ? classes.canvas : classes.canvasDisabled;
    const imageEnabled = isLoaded ? classes.imageEnabled : classes.image;
    // const imageEnabled = isLoaded ? classes.imageEnabled : classes.animation;

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [animate]);

    return (
        <>
            <canvas
                id={isMouseOver ? classes.canvas : canvasLoad}
                ref={canvasRef}
            ></canvas>

            <img
                src={`${
                    window.innerWidth > 790 ? img.img : imgMobile.imgMobile
                }`}
                alt=""
                id={isMouseOver ? classes.image : `${imageEnabled}`}
                ref={imgRef}
                onMouseOver={() => mouseOverHandler(true)}
                onMouseOut={() => mouseOverHandler(false)}
            />
        </>
    );
};

export default CanvasAnimation;
