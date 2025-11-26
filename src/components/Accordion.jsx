import React, { useState, useRef, useEffect } from "react";
import FeatherIcon from "feather-icons-react";

const getScrollParent = (el) => {
    if (!el) return window;
    let p = el.parentElement;
    while (p) {
        const s = window.getComputedStyle(p);
        if (s.overflowY === "auto" || s.overflowY === "scroll") return p;
        p = p.parentElement;
    }
    return window;
};

const getPadding = (el) => {
    if (!el) return 0;
    const s = window.getComputedStyle(el);
    const v = parseFloat(s.getPropertyValue("--component-padding"));
    if (!Number.isNaN(v)) return v;
    const p = parseFloat(s.paddingTop);
    return Number.isNaN(p) ? 0 : p;
};

export const Accordions = ({ children, initOpen = 0, mode = "single" }) => {
    const getInitial = () => {
        if (mode === "single") return typeof initOpen === "number" ? initOpen : null;
        if (Array.isArray(initOpen)) return initOpen;
        if (typeof initOpen === "number") return [initOpen];
        return [];
    };

    const [active, setActive] = useState(getInitial);

    const toggle = (i) => {
        if (mode === "single") setActive((p) => (p === i ? null : i));
        else setActive((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
    };

    return (
        <>
            {React.Children.map(children, (child, i) =>
                React.cloneElement(child, {
                    isOpen: mode === "single" ? active === i : active.includes(i),
                    onToggle: () => toggle(i),
                })
            )}
        </>
    );
};

export const Accordion = ({
    scrollOnOpen = true,
    children,
    title,
    isOpen,
    onToggle,
    iconClosed = "chevron-down",
    iconOpen = "chevron-down",
    extraClass = "",
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!scrollOnOpen || !isOpen || !ref.current) return;

        const el = ref.current;
        const parent = getScrollParent(el);
        const body = el.querySelector(".accordion__contents") || el;
        let cancelled = false;

        const scrollNow = () => {
            if (cancelled) return;
            const r = el.getBoundingClientRect();
            const pr = parent === window ? { top: 0 } : parent.getBoundingClientRect();
            const pad = getPadding(parent === window ? document.documentElement : parent);

            const target = parent === window
                ? window.pageYOffset + r.top - pad
                : r.top - pr.top + parent.scrollTop - pad;

            parent === window
                ? window.scrollTo({ top: target, behavior: "smooth" })
                : parent.scrollTo({ top: target, behavior: "smooth" });
        };

        const cs = window.getComputedStyle(body);
        const dur = cs.transitionDuration || cs.webkitTransitionDuration;
        let hasTransition = false;

        if (dur) {
            const arr = dur.split(",").map((d) => (d.includes("ms") ? parseFloat(d) : parseFloat(d) * 1000));
            hasTransition = Math.max(...arr) > 0;
        }

        const waitForStableLayout = () => {
            let pass = 0;
            const rafLoop = () => {
                if (cancelled) return;
                pass++;
                if (pass < 6) requestAnimationFrame(rafLoop);
                else scrollNow();
            };
            requestAnimationFrame(rafLoop);
        };

        if (hasTransition) {
            const endHandler = (e) => {
                if (e.target !== body) return;
                body.removeEventListener("transitionend", endHandler);
                waitForStableLayout();
            };
            body.addEventListener("transitionend", endHandler);
            return () => {
                cancelled = true;
                body.removeEventListener("transitionend", endHandler);
            };
        }

        waitForStableLayout();

        return () => {
            cancelled = true;
        };
    }, [isOpen, scrollOnOpen]);

    const icon = isOpen ? iconOpen : iconClosed;

    return (
        <div ref={ref} className={`accordion ${extraClass}`} data-expended={isOpen ? "true" : "false"}>
            <button type="button" className="accordion__head" onClick={onToggle}>
                <div className="accordion__title">{title}</div>
                <i><FeatherIcon icon={icon} /></i>
            </button>
            <div className="accordion__contents">
                <div className="accordion__content">{children}</div>
            </div>
        </div>
    );
};
