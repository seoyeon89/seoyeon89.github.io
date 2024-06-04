

export const CircleProgress = ({title, percent, extraClass = ''}) => {
    const RADIUS = 54;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const progress = percent / 100;
    const dashoffset = CIRCUMFERENCE * (1 - progress);

    return (
        <div className="circle-progress">
            <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--theme-secondary)"/>
                        <stop offset="100%" stopColor="var(--theme-primary)"/>
                    </linearGradient>
                </defs>
                <circle className="circle-progress__frame" cx="60" cy="60" r="54"
                        strokeWidth="12"/>
                <circle className="circle-progress__bar" cx="60" cy="60" r="54"
                        strokeWidth="12"
                        style={{
                            strokeDasharray: CIRCUMFERENCE,
                            strokeDashoffset: dashoffset
                        }}/>
            </svg>
            <div className="circle-progress__value">
                <strong>{title}</strong>
                <span>{percent}%</span>
            </div>
        </div>
    );
};
