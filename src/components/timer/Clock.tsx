interface ClockProps {
    hours: number;
    minutes: number;
    seconds: number;
}

export const Clock: React.FC<ClockProps> = ({ hours, minutes, seconds }) => {
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayHours = hours < 10 ? `0${hours}` : hours;

    return (
        <>
            <span>{displayHours}:</span>
            <span>{displayMinutes}:</span>
            <span>{displaySeconds}</span>
        </>
    );
};
