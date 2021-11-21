import React, { useState, useEffect, useReducer } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function CircleTimer({ onComplete, time, isPlaying }: { onComplete: any, time: number, isPlaying: boolean }) {
    const [isMobile, setIsMobile] = useState(false);

    function handleClick() {
        onComplete();
    }

    const renderTime = ({ remainingTime = 0 }: { remainingTime: number }) => {
        if (remainingTime === 0) {
            return <div className="timer">Too late...</div>;
        }

        return (
            <div className="flex flex-col items-center justify-center">
                <div className="text-4xl md:text-6xl">{remainingTime}</div>
                <div className="text-sm">seconds</div>
                <div className="text-sm">remaining</div>
            </div>
        );
    };

    useEffect(() => {
        const isMobile = () => window.matchMedia && window.matchMedia("(max-width: 480px)").matches;
        setIsMobile(isMobile());
    }, []);

    return (
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={time}
                colors={[
                    ['#16c1ea', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                size={isMobile ? 130 : 180}
                onComplete={handleClick}
            >
                {renderTime}
            </CountdownCircleTimer>
    );
}