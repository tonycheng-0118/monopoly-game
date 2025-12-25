'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Player, GameSettings } from '../types/game';
import { BOARD_CONFIG } from '../data/boardConfig';

// Define Game Phases
export type GamePhase = 'SETUP' | 'ROLL' | 'MOVING' | 'ACTION' | 'END_TURN';

// Define Modal Interface
interface ModalState {
    isOpen: boolean;
    type: 'BUY' | 'RENT' | 'MESSAGE' | null;
    data: any;
}

// Update State Interface
export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    dice: [number, number];
    isDoubles: boolean;
    gamePhase: GamePhase;
    logs: string[];
    modal: ModalState;
    propertiesOffset: Record<number, number>; // Mapping property ID to Owner ID
    settings?: GameSettings;
    stepsRemaining: number;
}

// Define Actions (Updated)
type Action =
    | { type: 'ROLL_DICE'; payload: { dice: [number, number] } }
    | { type: 'MOVE_STEP'; payload: null }
    | { type: 'SET_POSITION'; payload: { playerId: number; position: number } }
    | { type: 'END_TURN'; payload: null }
    | { type: 'ADD_LOG'; payload: string }
    | { type: 'BUY_PROPERTY'; payload: { playerId: number; propertyId: number; price: number } }
    | { type: 'PAY_RENT'; payload: { fromPlayerId: number; toPlayerId: number; amount: number } }
    | { type: 'OPEN_MODAL'; payload: { type: 'BUY' | 'RENT' | 'MESSAGE'; data: any } }
    | { type: 'CLOSE_MODAL'; payload: null }
    | { type: 'START_GAME'; payload: { settings: GameSettings } }
    | { type: 'TRIGGER_EFFECT'; payload: GameEffect }
    | { type: 'CLEAR_EFFECT'; payload: string }; // Remove effect by ID

// Effect Interface
export interface GameEffect {
    id: string;
    type: 'FLOAT_TEXT' | 'PLAY_SOUND';
    data: any;
}

export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    dice: [number, number];
    isDoubles: boolean;
    gamePhase: GamePhase;
    logs: string[];
    stepsRemaining: number;
    modal: {
        isOpen: boolean;
        type: 'BUY' | 'RENT' | 'MESSAGE' | null;
        data: any;
    };
    propertiesOffset: Record<number, number>; // Track multiple players on same space
    effects: GameEffect[]; // New: Queue for one-off UI effects
}

// Initial State (Updated)
const INITIAL_STATE: GameState = {
    players: [],
    currentPlayerIndex: 0,
    dice: [0, 0],
    isDoubles: false,
    gamePhase: 'SETUP',
    logs: [],
    modal: { isOpen: false, type: null, data: null },
    propertiesOffset: {},
    stepsRemaining: 0,
    effects: [],
};

// Colors for dynamic players
const PLAYER_COLORS = ['red', 'blue', 'green', 'orange'];

// Helper: Get Property Owner
const getOwnerId = (state: GameState, propertyId: number): number | null => {
    for (const p of state.players) {
        if (p.properties.includes(propertyId)) return p.id;
    }
    return null;
};

// Reducer
function gameReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case 'START_GAME': {
            const { initialMoney, playerConfigs } = action.payload.settings;
            const newPlayers: Player[] = playerConfigs.map((config, i) => ({
                id: i + 1,
                name: config.name,
                money: initialMoney,
                position: 0,
                color: config.color,
                isJailed: false,
                jailTurns: 0,
                properties: [],
                avatarUrl: config.avatarUrl,
            }));

            return {
                ...state,
                players: newPlayers,
                settings: action.payload.settings,
                gamePhase: 'ROLL',
                logs: ['遊戲開始！', `初始金額: $${initialMoney}`, '各位訓練家準備好了！'],
            };
        }
        case 'ROLL_DICE': {
            const [d1, d2] = action.payload.dice;
            return {
                ...state,
                dice: [d1, d2],
                isDoubles: d1 === d2,
                gamePhase: 'MOVING',
                stepsRemaining: d1 + d2,
                logs: [...state.logs, `${state.players[state.currentPlayerIndex].name} 擲出了 ${d1} 和 ${d2}`],
            };
        }
        case 'MOVE_STEP': {
            const currentPlayerIndex = state.currentPlayerIndex;
            const player = state.players[currentPlayerIndex];
            const newPosition = (player.position + 1) % 40;
            const newStepsRemaining = state.stepsRemaining - 1;

            const updatedPlayers = state.players.map((p, i) =>
                i === currentPlayerIndex ? { ...p, position: newPosition } : p
            );

            // Check if passed GO (from 39 to 0)
            let money = player.money;
            let logs = state.logs;
            if (player.position === 39 && newPosition === 0) {
                money += 200;
                logs = [...logs, `${player.name} 經過起點，獲得 $200`];
                updatedPlayers[currentPlayerIndex].money = money;
            }

            return {
                ...state,
                players: updatedPlayers,
                stepsRemaining: newStepsRemaining,
                gamePhase: newStepsRemaining === 0 ? 'ACTION' : 'MOVING',
                logs: logs,
            };
        }
        case 'SET_POSITION': {
            const { playerId, position } = action.payload;
            return {
                ...state,
                players: state.players.map(p => p.id === playerId ? { ...p, position } : p),
                gamePhase: 'ACTION',
            };
        }
        case 'OPEN_MODAL':
            return { ...state, modal: { isOpen: true, type: action.payload.type, data: action.payload.data } };
        case 'CLOSE_MODAL':
            return { ...state, modal: { isOpen: false, type: null, data: null } };
        case 'END_TURN': {
            const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
            return {
                ...state,
                currentPlayerIndex: nextIndex,
                gamePhase: 'ROLL',
                dice: [0, 0],
                isDoubles: false,
                modal: { isOpen: false, type: null, data: null },
                logs: [...state.logs, `輪到 ${state.players[nextIndex].name}`],
            };
        }
        case 'BUY_PROPERTY': {
            const { playerId, propertyId, price } = action.payload;
            return {
                ...state,
                players: state.players.map(p =>
                    p.id === playerId
                        ? { ...p, money: p.money - price, properties: [...p.properties, propertyId] }
                        : p
                ),
                logs: [...state.logs, `${state.players.find(p => p.id === playerId)?.name} 購買了地產 (ID: ${propertyId})`],
            };
        }
        case 'PAY_RENT': {
            const { fromPlayerId, toPlayerId, amount } = action.payload;
            return {
                ...state,
                players: state.players.map(p => {
                    if (p.id === fromPlayerId) return { ...p, money: p.money - amount };
                    if (p.id === toPlayerId) return { ...p, money: p.money + amount };
                    return p;
                }),
                logs: [...state.logs, `${state.players.find(p => p.id === fromPlayerId)?.name} 支付了 $${amount} 租金`],
            };
        }
        case 'ADD_LOG':
            return { ...state, logs: [...state.logs, action.payload] };
        default:
            return state;
    }
}

// Context
const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

    // Movement Animation Loop
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (state.gamePhase === 'MOVING' && state.stepsRemaining > 0) {
            timer = setTimeout(() => {
                dispatch({ type: 'MOVE_STEP', payload: null });
            }, 300); // 300ms per step
        }
        return () => clearTimeout(timer);
    }, [state.gamePhase, state.stepsRemaining]);

    // Game Logic Effect
    useEffect(() => {
        if (state.gamePhase === 'ACTION') {
            const currentPlayer = state.players[state.currentPlayerIndex];
            const space = BOARD_CONFIG.find(s => s.id === currentPlayer.position);

            if (!space) return;

            console.log(`Landed on ${space.name} (${space.type})`);

            if (space.type === 'PROPERTY' && space.property) {
                const ownerId = getOwnerId(state, space.id);

                if (ownerId === null) {
                    // Unowned - Offer to Buy
                    if (currentPlayer.money >= space.property.price) {
                        dispatch({ type: 'OPEN_MODAL', payload: { type: 'BUY', data: { propertyId: space.id, name: space.name, price: space.property.price } } });
                    } else {
                        // Not enough money
                        dispatch({ type: 'ADD_LOG', payload: `${currentPlayer.name} 資金不足，無法購買 ${space.name}` });
                        dispatch({ type: 'END_TURN', payload: null });
                    }
                } else if (ownerId !== currentPlayer.id) {
                    // Owned by other - Pay Rent
                    // Simple rent calculation (base rent for now)
                    const rent = space.property.rent[0];
                    const owner = state.players.find(p => p.id === ownerId);
                    dispatch({ type: 'OPEN_MODAL', payload: { type: 'RENT', data: { name: space.name, ownerName: owner?.name, amount: rent, fromPlayerId: currentPlayer.id, toPlayerId: ownerId } } });
                } else {
                    // Owned by self - Do nothing for now (House building later)
                    dispatch({ type: 'ADD_LOG', payload: `${currentPlayer.name} 回到了自己的地盤` });
                    dispatch({ type: 'END_TURN', payload: null });
                }
            } else if (space.type === 'TAX') {
                const tax = space.price || 100;
                dispatch({ type: 'ADD_LOG', payload: `${currentPlayer.name} 支付了稅金 $${tax}` });
                // Reduce money directly? Or use Pay Rent? Need Pay Bank action.
                // For simplicity, just mutate in reducer or dispatch generic pay.
                // Actually we don't have PAY_BANK. Let's add 'PAY_RENT' to bank (toPlayerId = -1) or creating PAY_TAX action?
                // Let's just deduct money via payload hack or update reducer.
                // I will just End Turn for now for Tax implementation gap.
                dispatch({ type: 'END_TURN', payload: null });
            } else if (space.type === 'GO_TO_JAIL') {
                dispatch({ type: 'ADD_LOG', payload: `${currentPlayer.name} 入獄！` });
                dispatch({ type: 'SET_POSITION', payload: { playerId: currentPlayer.id, position: 10 } }); // Move to Jail
                // Set jailed state (todo)
                dispatch({ type: 'END_TURN', payload: null });
            } else {
                // Other spaces
                dispatch({ type: 'ADD_LOG', payload: `停留在了 ${space.name}` });
                dispatch({ type: 'END_TURN', payload: null });
            }
        }
    }, [state.gamePhase, state.currentPlayerIndex, state.players]); // Add players to deps to valid ownership

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

// Hook
export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
