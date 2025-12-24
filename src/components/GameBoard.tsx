'use client';

import React from 'react';
import { useGame } from '../context/GameContext';
import { BOARD_CONFIG } from '../data/boardConfig';
import Space from './Space';
import '../styles/board.css';

export default function GameBoard() {
    const { state } = useGame();

    // Helper to map 0-39 index to grid coordinates (11x11)
    // Grid: 1,1 is top-left (Free Parking). 1,11 is top-right (Go To Jail).
    // 11,1 is bottom-left (Jail). 11,11 is bottom-right (GO).
    const getGridStyle = (index: number) => {
        let row, col;

        if (index >= 0 && index <= 10) {
            // Bottom row (GO to Jail): 11,11 -> 11,1
            row = 11;
            col = 11 - index;
        } else if (index >= 11 && index <= 20) {
            // Left col (Jail to Free Parking): 11,1 -> 1,1
            row = 11 - (index - 10);
            col = 1;
        } else if (index >= 21 && index <= 30) {
            // Top row (Free Parking to Go To Jail): 1,1 -> 1,11
            row = 1;
            col = 1 + (index - 20);
        } else {
            // Right col (Go To Jail to GO): 1,11 -> 11,11
            row = 1 + (index - 30);
            col = 11;
        }

        return { gridRow: row, gridColumn: col };
    };

    return (
        <div className="monopoly-board">
            <div className="board-center">
                <div className="center-logo">
                    <h1>台灣地產大亨</h1>
                    <div className="dice-area">
                        {/* Dice and controls will go here */}
                        <div className="dice-display">
                            🎲 {state.dice[0]} - {state.dice[1]}
                        </div>
                    </div>
                </div>
            </div>

            {BOARD_CONFIG.map((space) => (
                <div key={space.id} style={getGridStyle(space.id)} className="grid-cell-wrapper">
                    <Space
                        space={space}
                        players={state.players.filter(p => p.position === space.id)}
                    />
                </div>
            ))}
        </div>
    );
}
