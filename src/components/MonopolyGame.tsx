'use client';

import React from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import GameBoard from './GameBoard';
import Controls from './Controls';
import GameModal from './GameModal';
import SetupScreen from './SetupScreen';

function GameContent() {
    const { state } = useGame();

    if (state.gamePhase === 'SETUP') {
        return (
            <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <SetupScreen />
            </main>
        );
    }

    return (
        <main style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex' }}>
            <GameBoard />
            <Controls />
            <GameModal />
        </main>
    );
}

export default function MonopolyGame() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}
