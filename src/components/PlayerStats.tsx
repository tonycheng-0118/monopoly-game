'use client';

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BOARD_CONFIG } from '../data/boardConfig';

export default function PlayerStats() {
    const { state } = useGame();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Calculate Total Assets (Money + Property Value)
    const getPlayerAssets = (player: any) => {
        const propertyValue = player.properties.reduce((total: number, spaceId: number) => {
            const space = BOARD_CONFIG.find(s => s.id === spaceId);
            return total + (space?.property?.price || 0);
        }, 0);
        return player.money + propertyValue;
    };

    const sortedPlayers = [...state.players].sort((a, b) => getPlayerAssets(b) - getPlayerAssets(a));

    return (
        <div className={`player-stats-container ${isCollapsed ? 'collapsed' : ''}`}>
            <h3 onClick={() => setIsCollapsed(!isCollapsed)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                總資產排行榜
                <span style={{ fontSize: '0.8em' }}>{isCollapsed ? '▼' : '▲'}</span>
            </h3>
            {!isCollapsed && (
                <div className="stats-list">
                    {sortedPlayers.map((player) => {
                        const isCurrent = player.id === state.players[state.currentPlayerIndex].id;
                        const totalAssets = getPlayerAssets(player);

                        return (
                            <div
                                key={player.id}
                                className={`player-stat-card ${isCurrent ? 'active' : ''}`}
                                style={{ borderLeft: `5px solid ${player.color}` }}
                            >
                                <div className="stat-avatar">
                                    <img src={player.avatarUrl} alt={player.name} />
                                </div>
                                <div className="stat-info">
                                    <div className="stat-name">
                                        {player.name}
                                        {isCurrent && <span className="badge">當前</span>}
                                    </div>
                                    <div className="stat-money">
                                        <span style={{ fontSize: '0.8rem', color: '#777' }}>現金: ${player.money}</span>
                                        <br />
                                        <strong>總資產: ${totalAssets}</strong>
                                    </div>
                                    <div className="stat-props">地產: {player.properties.length}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style jsx>{`
                .player-stats-container {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 250px;
                    background: white;
                    padding: 15px;
                    border-radius: 12px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    z-index: 200;
                    max-height: 90vh;
                    overflow-y: auto;
                    transition: all 0.3s ease;
                }
                .player-stats-container.collapsed {
                    width: auto;
                    padding: 10px 15px;
                    max-height: auto;
                    overflow: hidden;
                }
                h3 {
                    margin: 0;
                    color: #2c3e50;
                    font-size: 1.2rem;
                    padding-bottom: ${isCollapsed ? '0' : '10px'};
                    border-bottom: ${isCollapsed ? 'none' : '2px solid #f0f0f0'};
                    user-select: none;
                }
                 .stats-list {
                    margin-top: 15px;
                }
                .player-stat-card {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .player-stat-card.active {
                    background: #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transform: scale(1.02);
                }
                .stat-avatar img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid #ddd;
                    margin-right: 10px;
                    object-fit: contain;
                }
                .stat-info {
                    flex: 1;
                }
                .stat-name {
                    font-weight: bold;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .stat-money {
                    color: #27ae60;
                    font-weight: bold;
                    font-family: monospace;
                    font-size: 1.1rem;
                }
                .stat-props {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                }
                .badge {
                    background: #e74c3c;
                    color: white;
                    font-size: 0.6rem;
                    padding: 2px 6px;
                    border-radius: 10px;
                }

                @media (max-width: 768px) {
                    .player-stats-container {
                        left: 10px;
                        top: 10px;
                        width: ${isCollapsed ? 'auto' : 'calc(100% - 20px)'};
                        max-width: 350px;
                    }
                }
            `}</style>
        </div>
    );
}
