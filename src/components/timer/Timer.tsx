import React from "react";
import { useState, useEffect } from "react";

import { Clock } from "./Clock";

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

        console.log(hours, minutes, seconds);

        return [seconds, minutes, hours];
    };

    const [seconds, minutes, hours] = getValues(counter);

    return (
        <>
            <div className="container">
                <p className="headding">Gameplay duration</p>
                <Clock seconds={seconds} hours={hours} minutes={minutes} />
            </div>
        </>
    );
};
