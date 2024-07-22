import React, { useRef, useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';

export const Dropdown = ({children, title, titleIcon, label, initOpen = false, extraClass = ''}) => {
    const dropdownRef = useRef(null);
    const [isActive, setActive] = useState(initOpen);
    useEffect(() => {
        function handleClickOutside(e) {
            const isInside = dropdownRef?.current?.contains(e.target);
            if (dropdownRef && !isInside) {
                setActive(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleToggle = () => {
        setActive(!isActive);
    };
    return (
        <div className={`dropdown ${extraClass}`}
             data-expended={`${isActive ? 'true' : 'false'}`}
             key={title}
             ref={dropdownRef}
             label={label}
        >
            <button type="button"
                    className="dropdown__button"
                    onClick={handleToggle}
            >
                <div className="icons"><i><FeatherIcon icon={titleIcon} size="22"/></i></div>
                <span>Add filter</span>
                <em>{label}</em>
            </button>

            <div className="dropdown__list" >
                {children}
            </div>
        </div>
    );
};

