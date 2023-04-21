import React from "react";
import { useState, useEffect } from "react";

import { Clock } from "./Clock";

import styles from "./Timer.module.css";

export const Timer = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const countSeconds = setInterval(() => {
            setCounter((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(countSeconds);
    }, [counter]);

    const getValues = (counter: number) => {
        const seconds = Math.floor(counter % 60);
        const minutes: number = Math.floor((counter % 3600) / 60);
        const hours: number = Math.floor(counter / 3600);

        return [seconds, minutes, hours];
    };

    const [seconds, minutes, hours] = getValues(counter);

    return (
        <>
            <div className={styles.container}>
                <p className={styles.heading}>Gameplay duration</p>
                <Clock seconds={seconds} hours={hours} minutes={minutes} />
            </div>
        </>
    );
};
