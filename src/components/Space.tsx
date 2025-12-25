import React from 'react';
import { Space as SpaceType, Player } from '../types/game';
import { useGame } from '../context/GameContext';

interface SpaceProps {
    space: SpaceType;
    players: Player[];
}

const GROUP_COLORS: Record<string, string> = {
    BROWN: '#8B4513',
    LIGHT_BLUE: '#87CEEB',
    PINK: '#FF69B4',
    ORANGE: '#FFA500',
    RED: '#FF0000',
    YELLOW: '#FFD700',
    GREEN: '#008000',
    BLUE: '#0000FF',
    STATION: '#000000',
    UTILITY: '#a3a3a3',
};

export default function Space({ space, players }: SpaceProps) {
    const { state } = useGame();
    const isCorner = space.id % 10 === 0;

    // Style for the color bar
    const colorStyle = space.property?.group ? { backgroundColor: GROUP_COLORS[space.property.group] } : {};

    return (
        <div className={`space space-${space.type.toLowerCase()} ${isCorner ? 'corner' : ''}`} id={`space-${space.id}`}>
            <div className="space-content">
                {space.property && !isCorner && (
                    <div className="color-bar" style={colorStyle}></div>
                )}
                <div className="space-name">{space.name}</div>
                {space.property && (
                    <div className="space-price">${space.property.price}</div>
                )}
                {space.price && (
                    <div className="space-price">Pay ${space.price}</div>
                )}

                {/* Render Players */}
                <div className="players-container">
                    {players.map(player => {
                        // Check if this player is the current player AND moving
                        const isActive = player.id === state.players[state.currentPlayerIndex].id;
                        const isMoving = state.gamePhase === 'MOVING' && isActive;

                        return (
                            <div
                                key={player.id}
                                className={`player-token-wrapper ${isMoving ? 'is-moving' : ''}`}
                                title={player.name}
                            >
                                <img
                                    src={player.avatarUrl}
                                    alt={player.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
