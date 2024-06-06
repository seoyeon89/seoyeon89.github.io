import React, {useState} from 'react';
import FeatherIcon from 'feather-icons-react';

export const Accordion = ({children, title, initOpen = false, extraClass = ''}) => {
    const [isActive, setActive] = useState(initOpen);
    const handleToggle = () => {
        setActive(!isActive);
    };
    return (
        <div className={`accordion ${extraClass}`}
             data-expended={`${isActive ? 'true' : 'false'}`}
             key={title}
        >
            <button type="button"
                    className="accordion__title"
                    onClick={handleToggle}
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

