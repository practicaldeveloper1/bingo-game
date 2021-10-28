import React from 'react'
import "./Tile.css"

function Tile({ id, children, onToggle, isSet, isCompleted = false }) {
    const NUMBER_OF_TILES = 25;
    const freeCell = Math.ceil(NUMBER_OF_TILES / 2);
    const isFreeCell = id + 1 === freeCell;
    return (
        <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}  ${isCompleted ? "tile--completed" : ""} ${isFreeCell ? "tile--free" : ""}`}>
            {children}
        </div>
    );
}
export default Tile