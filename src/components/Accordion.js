import React, {useState} from 'react';
import FeatherIcon from 'feather-icons-react';

export const Accordions = ({children, initOpen = 0}) => {
    const [activeIndex, setActiveIndex] = useState(initOpen);

    const handleToggle = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    isOpen: activeIndex === index,
                    onToggle: () => handleToggle(index)
                })
            )}
        </>
    );
};
export const Accordion = ({children, title, isOpen, onToggle, extraClass = ''}) => {
    return (
        <div className={`accordion ${extraClass}`}
             data-expended={`${isOpen ? 'true' : 'false'}`}
        >
            <button type="button"
                    className="accordion__title"
                    onClick={onToggle}
            >
                <span>{title}</span>
                <i><FeatherIcon icon="chevron-down"/></i>
            </button>
            <div className="accordion__content">
                {children}
            </div>
        </div>
    );
};

