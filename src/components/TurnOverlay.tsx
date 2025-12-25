'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';

export default function TurnOverlay() {
    const { state } = useGame();
    const [show, setShow] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(state.players[0]);

    useEffect(() => {
        // Show overlay whenever currentPlayerIndex changes (Turn Start)
        // But only if we are in ROLL phase (start of turn)
        // And ensure we are not in setup
        if (state.gamePhase === 'ROLL' && state.players.length > 0) {
            setCurrentPlayer(state.players[state.currentPlayerIndex]);
            setShow(true);
            const timer = setTimeout(() => setShow(false), 2000); // Hide after 2s
            return () => clearTimeout(timer);
        }
    }, [state.currentPlayerIndex, state.gamePhase, state.players]);

    if (!show || !currentPlayer) return null;

    return (
        <div className="turn-overlay">
            <div className="turn-banner">
                <img src={currentPlayer.avatarUrl} alt={currentPlayer.name} />
                <h1>輪到 {currentPlayer.name} 了!</h1>
            </div>
        </div>
    );
}
