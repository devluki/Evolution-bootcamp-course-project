import { useRef, useEffect, useCallback, useState } from "react";
import classes from "./CanvasAnimation.module.css";
import img from "../models/logoParticles.json";
import imgMobile from "../models/logoParticlesMobile.json";

class Particle {
    x: number;
    y: number;
    size: number;
    // Velocity
    vx: number;
    vy: number;
    originX: number;
    originY: number;
    color: string;
    ease: number;
    effect: Effect;
    friction: number;
    dx: number;
    dy: number;
    distance: number;
    force: number;
    angle: number;
    // Class needs to be initialized with canvasWidth and canvasHeight
    constructor(
        effect: Effect,
        canvasWidth: number,
        canvasHeight: number,
        x: number,
        y: number,
        color: string,
    ) {
        this.effect = effect;
        this.x = Math.random() * canvasWidth; //x; //Math.random() * canvasWidth; //0;
        this.y = Math.random() * canvasHeight; //y; // Math.random() * canvasHeight; //0;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.color = color;
        this.size = window.innerWidth < 790 ? 1 : 2; //Rectangle size
        this.vx = Math.random() * 2 - 1; //1;
        this.vy = Math.random() * 2 - 1; //1;
        // this.vx = 0;
        // this.vy = 0;
        this.ease = 0.1;
        // Inietial values
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.friction = 0.8;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.dx = this.effect.mouse.x! - this.x;
        this.dy = this.effect.mouse.y! - this.y;

        this.distance = this.dy * this.dy + this.dx * this.dx; //TOO EXPENSIVE with Pythagorean theorem
        // this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance;

        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x +=
            (this.vx *= this.friction) + (this.originX - this.x) * this.ease; //this.vx;
        this.y +=
            (this.vy *= this.friction) + (this.originY - this.y) * this.ease; //this.vy;
    }
}

interface mouseData {
    radius: number;
    x: number | undefined;
    y: number | undefined;
}

class Effect {
    height: number;
    width: number;
    particleArray: Particle[];
    image: HTMLImageElement;
    centerX: number;
    centerY: number;
    x: number;
    y: number;
    gap: number;
    mouse: mouseData;
    constructor(width: number, height: number, image: HTMLImageElement) {
        this.width = width;
        this.height = height;
        this.particleArray = [];
        this.image = image;
        this.centerX = this.width * 0.5; // 50%
        this.centerY = this.height * 0.2; // top: 50%
        this.x = this.centerX - this.image.width * 0.5;
        this.y = this.centerY - this.image.height * 0.5;
        this.gap = window.innerWidth < 790 ? 2 : 4;
        this.mouse = {
            radius: 3000,
            x: undefined,
            y: undefined,
        };
        document.addEventListener("mousemove", (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;

            // console.log(this.mouse.x, this.mouse.y);
        });
    }
    init(ctx: CanvasRenderingContext2D) {
        // console.log(this.image);
        ctx.drawImage(this.image, this.x, this.y);
        const pixels = ctx.getImageData(0, 0, this.width, this.height).data;
        // console.log(pixels);
        for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
                const index = (y * this.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const color = `rgb(${red},${green},${blue})`;
                if (alpha > 0) {
                    this.particleArray.push(
                        new Particle(
                            this,
                            this.width,
                            this.height,
                            x,
                            y,
                            color,
                        ),
                    );
                }
            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.particleArray.forEach((particle) => particle.draw(ctx));
    }
    // Update of all currently drawn particles objects
    update() {
        this.particleArray.forEach((particle) => particle.update());
    }
}

const CanvasAnimation = () => {
    interface RefObject<T> {
        readonly current: T | null;
    }

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

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const ctx = getContext(canvasRef)!;

        const effect = new Effect(canvas.width, canvas.height, image);
        effect.init(ctx);
        // console.log(effect);
        animate(effect, ctx, canvas.width, canvas.height);
    }, [getContext, animate]);

    useEffect(() => {
        handleAnimationLoading();
    }, []);

    //
    const canvasLoad = !isLoaded ? classes.canvas : classes.canvasDisabled;
    const imageEnabled = isLoaded ? classes.imageEnabled : classes.image;
    // const imageEnabled = isLoaded ? classes.imageEnabled : classes.animation;

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
