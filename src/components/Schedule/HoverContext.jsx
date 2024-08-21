import React, { createContext, useState, useContext, useCallback } from 'react';

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
    const [hoveredTag, setHoveredTag] = useState(null);

    const handleMouseEnter = useCallback((tag) => {
        setHoveredTag(tag);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredTag(null);
    }, []);

    return (
        <HoverContext.Provider value={{ hoveredTag, handleMouseEnter, handleMouseLeave }}>
            {children}
        </HoverContext.Provider>
    );
};

export const useHover = () => useContext(HoverContext);