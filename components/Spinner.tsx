import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function Spinner({ onCompleted }: { onCompleted: any }) {
    const [isMobile, setIsMobile] = useState(false);

    const renderGameStart = ({ remainingTime = 0 }: { remainingTime: number }) => {
        if (remainingTime === 0) {
            onCompleted();
        }

        return null;
    };

    useEffect(() => {
        const isMobile = () => window.matchMedia && window.matchMedia("(max-width: 480px)").matches;
        setIsMobile(isMobile());
    }, []);

    return (
        <div className="h-full flex items-center justify-center md:right-16 md:top-16">
            <CountdownCircleTimer
                isPlaying
                duration={2}
                colors={[['#16c1ea', 1]]}
                size={isMobile ? 40 : 80}
                strokeWidth={6}
            >
                {renderGameStart}
            </CountdownCircleTimer>
        </div>
    );
}