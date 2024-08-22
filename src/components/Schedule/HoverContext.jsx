import { createContext, useState, useContext, useCallback } from 'react';

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
    const [hoveredTag, setHoveredTag] = useState(null);
    const [clickedTag, setClickedTag] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseEnter = useCallback((tag) => {
        setHoveredTag(tag);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredTag(null);
    }, []);

    const handleClick = useCallback((tag) => {
        setClickedTag(tag);
        setIsClicked(!isClicked);
    }, [isClicked]);

    return (
        <HoverContext.Provider value={{ hoveredTag, clickedTag, isClicked, handleMouseEnter, handleMouseLeave, handleClick}}>
            {children}
        </HoverContext.Provider>
    );
};

export const useHover = () => useContext(HoverContext);