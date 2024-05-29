import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';

export const AccordionItem = ({ children, title, initOpen = true, extraClass }) => {
    const [active, setActive] = useState(initOpen);
    const handleToggle = () => {
        setActive(!active);
        console.log(active);
    };
    return (
        <div className={`accordion-item ${extraClass}`} data-expended={`${active ? 'true' : 'false'}`}>
            <button type="button" className='accordion-title' onClick={handleToggle}>
                <span>{title}</span>
                <i><FeatherIcon icon="chevron-down" /></i>
            </button>
            <div className="accordion-box">
                {children}
            </div>
        </div>
    );
};

