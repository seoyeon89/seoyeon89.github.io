import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";

export const Accordions = ({ children, initOpen = 0, mode = "single" }) => {
    const getInitialState = () => {
        if (mode === "single") {
            return typeof initOpen === "number" ? initOpen : null;
        } else {
            if (Array.isArray(initOpen)) return initOpen;
            if (typeof initOpen === "number") return [initOpen];
            return [];
        }
    };

    const [activeIndex, setActiveIndex] = useState(getInitialState);

    const handleToggle = (index) => {
        if (mode === "single") {
            setActiveIndex((prev) => (prev === index ? null : index));
        } else {
            setActiveIndex((prev) => {
                if (prev.includes(index)) {
                    return prev.filter((i) => i !== index);
                } else {
                    return [...prev, index];
                }
            });
        }
    };

    return (
        <>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    isOpen:
                        mode === "single"
                            ? activeIndex === index
                            : activeIndex.includes(index),
                    onToggle: () => handleToggle(index),
                })
            )}
        </>
    );
};

export const Accordion = ({
    children,
    title,
    isOpen,
    onToggle,
    iconClosed = "chevron-down",
    iconOpen = "chevron-down",
    extraClass = "",
}) => {
    const toggleIcon = isOpen ? iconOpen : iconClosed;

    return (
        <div
            className={`accordion ${extraClass}`}
            data-expended={isOpen ? "true" : "false"}
        >
            <button
                type="button"
                className="accordion__head"
                onClick={onToggle}
            >
                <div className="accordion__title">{title}</div>
                <i>
                    <FeatherIcon icon={toggleIcon} />
                </i>
            </button>
            <div className="accordion__contents">
                <div className="accordion__content">{children}</div>
            </div>
        </div>
    );
};
