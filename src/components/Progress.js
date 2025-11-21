import React, { useEffect, useState } from "react";

export const Progress = ({
                             type = "circle",
                             title,
                             percent,
                             extraClass = "",
                         }) => {
    switch (type) {
        case "bar":
            return <BarProgress title={title} percent={percent} extraClass={extraClass} />;
        default:
            return <CircleProgress title={title} percent={percent} extraClass={extraClass} />;
    }
};


const CircleProgress = ({ title, percent, extraClass }) => {
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    const [animatedPercent, setAnimatedPercent] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedPercent(percent);
        }, 10);

        return () => clearTimeout(timeout);
    }, [percent]);

    const progress = animatedPercent / 100;
    const dashoffset = CIRCUMFERENCE * (1 - progress);

    return (
        <div className={`sy-progress__circle ${extraClass}`}>
            <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--theme-secondary)" />
                        <stop offset="100%" stopColor="var(--theme-primary)" />
                    </linearGradient>
                </defs>

                <circle
                    className="sy-progress__circle__frame"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="12"
                />

                <circle
                    className="sy-progress__circle__bar"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeWidth="12"
                    style={{
                        strokeDasharray: CIRCUMFERENCE,
                        strokeDashoffset: dashoffset,
                    }}
                />
            </svg>

            <div className="sy-progress__circle__value">
                <strong>{title}</strong>
                <span>{percent}%</span>
            </div>
        </div>
    );
};


const BarProgress = ({ title, percent, extraClass }) => {
    const [animatedPercent, setAnimatedPercent] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedPercent(percent);
        }, 10);
        return () => clearTimeout(timeout);
    }, [percent]);

    return (
        <div className={`sy-progress__bar ${extraClass}`}>
            <div className="sy-progress__bar__info">
                <strong>{title}</strong>
                <span>{percent}%</span>
            </div>

            <div className="sy-progress__bar__track">
                <div
                    className="sy-progress__bar__value"
                    style={{ width: `${animatedPercent}%` }}
                />
            </div>
        </div>
    );
};
