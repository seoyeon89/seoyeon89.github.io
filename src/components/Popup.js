import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';

export const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    // document.body.style.overflowY = 'scroll';
    return currentScrollY;
};
const allowScroll = (prevScrollY) => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    // document.body.style.overflowY = '';
    window.scrollTo(0, prevScrollY);
};
export const Popup = ({children, title}) => {
    let navigate = useNavigate();
    useEffect(() => {
        const prevScrollY = preventScroll();
        return () => {
            allowScroll(prevScrollY);
        };
    }, []);

    const closePopup = () => {
        navigate(-1);
    };

    return (
        <aside className="popup-warp" key={title}>
            <div className="popup">
                <div className="popup__title">
                    <h1>{title}</h1>
                    <button type="button" className="popup__title__close" onClick={closePopup}>
                        <span hidden>닫기</span>
                    </button>
                </div>
                <div className="popup__container">
                    {children}
                </div>
            </div>
        </aside>
    );
};

