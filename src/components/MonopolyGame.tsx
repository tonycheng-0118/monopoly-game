'use client';

import React from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import GameBoard from './GameBoard';
import Controls from './Controls';
import GameModal from './GameModal';
import SetupScreen from './SetupScreen';
import TurnOverlay from './TurnOverlay';
import PlayerStats from './PlayerStats';
import GameRules from './GameRules'; // Import GameRules
import FloatingTextManager, { FloatingTextRef } from './FloatingTextManager';
import { useRef, useEffect } from 'react';
import { BOARD_CONFIG } from '../data/boardConfig';

function GameContent() {
    const { state, dispatch } = useGame();
    const floatingTextRef = useRef<FloatingTextRef>(null);
    const actionProcessed = useRef(false);

    // Reset actionProcessed when phase changes to ROLL or SETUP
    useEffect(() => {
        if (state.gamePhase === 'ROLL' || state.gamePhase === 'SETUP') {
            actionProcessed.current = false;
        }
    }, [state.gamePhase]);

    // Handle Turn Logic (Landing on spaces)
    useEffect(() => {
        if (state.gamePhase === 'ACTION') {
            // Prevent duplicate execution/infinite loops
            if (actionProcessed.current) return;
            actionProcessed.current = true;

            const currentPlayer = state.players[state.currentPlayerIndex];
            const space = BOARD_CONFIG.find(s => s.id === currentPlayer.position);

            if (space?.type === 'PROPERTY') {
                // Check Ownership
                const owner = state.players.find(p => p.properties.includes(space.id));

                if (!owner) {
                    // Unowned -> Buy
                    dispatch({
                        type: 'OPEN_MODAL',
                        payload: { type: 'BUY', data: { space, player: currentPlayer } }
                    });
                } else if (owner.id === currentPlayer.id) {
                    // Own Property -> Build House
                    dispatch({
                        type: 'OPEN_MODAL',
                        payload: { type: 'BUILD', data: { space, player: currentPlayer, currentHouses: state.houses?.[space.id] || 0 } }
                    });
                } else {
                    // Enemy Property -> Pay Rent
                    // Calculate Rent
                    const houses = state.houses?.[space.id] || 0;
                    // Rent logic: Use array index if exists, otherwise multiply last value?
                    // User said "Unlimited houses", "Rent increases".
                    // Let's implement a formula: base rent from array (clamped) + extra for unlimited houses.
                    const rentSchedule = space.property?.rent || [];
                    let rentAmount = 0;

                    if (houses < rentSchedule.length) {
                        rentAmount = rentSchedule[houses];
                    } else {
                        // Unlimited formula: Max Rent * (1.5 ^ (houses - max_index))? Or simplistic?
                        // Simple: Max Rent + (Houses - Max Index) * (House Cost)
                        // Let's stick to valid array for now, defaulting to max
                        rentAmount = rentSchedule[rentSchedule.length - 1];
                        // Bonus for extra houses?
                        rentAmount += (houses - (rentSchedule.length - 1)) * (space.property?.houseCost || 50);
                    }

                    // Dispatch Rent Modal
                    dispatch({
                        type: 'OPEN_MODAL',
                        payload: {
                            type: 'RENT',
                            data: {
                                name: space.name,
                                ownerName: owner.name,
                                amount: rentAmount,
                                fromPlayerId: currentPlayer.id,
                                toPlayerId: owner.id
                            }
                        }
                    });
                }
            } else {
                // Non-Property (Tax, Chance, etc) - Just End Turn for now (Placeholder)
                setTimeout(() => {
                    dispatch({ type: 'END_TURN', payload: null });
                }, 1000);
            }
        }
    }, [state.gamePhase, state.players, state.houses, dispatch]); // Dep: gamePhase changes to ACTION triggers this

    // Consume Effects
    useEffect(() => {
        if (state.effects && state.effects.length > 0) {
            state.effects.forEach(effect => {
                if (effect.type === 'FLOAT_TEXT') {
                    const playerElement = document.querySelector(`.player-token-wrapper[title="${state.players.find(p => p.id === effect.data.playerId)?.name}"]`);
                    let x = window.innerWidth / 2;
                    let y = window.innerHeight / 2;

                    if (playerElement) {
                        const rect = playerElement.getBoundingClientRect();
                        x = rect.left + rect.width / 2;
                        y = rect.top;
                    }

                    floatingTextRef.current?.addText(effect.data.text, x, y, effect.data.color);
                }

                setTimeout(() => {
                    dispatch({ type: 'CLEAR_EFFECT', payload: effect.id });
                }, 100);
            });
        }
    }, [state.effects, dispatch, state.players]);

    if (state.gamePhase === 'SETUP') {
        return (
            <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <SetupScreen />
            </main>
        );
    }

    return (
        <main style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex' }}>
            <PlayerStats />
            <GameBoard />
            <Controls />
            <GameModal />
            <TurnOverlay />
            <GameRules />
            <FloatingTextManager ref={floatingTextRef} />
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
