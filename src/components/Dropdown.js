import React, {useState} from 'react';
import FeatherIcon from 'feather-icons-react';

export const Dropdown = ({children, title, titleIcon, initOpen = false, extraClass = ''}) => {
    const [isActive, setActive] = useState(initOpen);
    const handleToggle = () => {
        setActive(!isActive);
    };
    return (
        <div className={`dropdown ${extraClass}`}
             data-expended={`${isActive ? 'true' : 'false'}`}
             key={title}
        >
            <button type="button"
                    className="dropdown__button"
                    onClick={handleToggle}
            >
                <div className="icons"><i><FeatherIcon icon={titleIcon} size="22"/></i></div>
                <span>Add filter</span>
            </button>

            <div className="dropdown__list">
                {children}
            </div>
        </div>
    );
};

