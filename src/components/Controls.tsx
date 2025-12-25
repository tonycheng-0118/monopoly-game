'use client';

import React from 'react';
import { useGame } from '../context/GameContext';

export default function Controls() {
    const { state, dispatch } = useGame();
    const currentPlayer = state.players[state.currentPlayerIndex];

    const [isRolling, setIsRolling] = React.useState(false);
    const [displayDice, setDisplayDice] = React.useState([1, 1]);

    const handleRoll = () => {
        if (isRolling) return;
        setIsRolling(true);

        // Shuffle animation
        let duration = 0;
        const interval = setInterval(() => {
            setDisplayDice([
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1
            ]);
            duration += 100;
            if (duration > 1000) {
                clearInterval(interval);
                const d1 = Math.floor(Math.random() * 6) + 1;
                const d2 = Math.floor(Math.random() * 6) + 1;

                setIsRolling(false);
                dispatch({ type: 'ROLL_DICE', payload: { dice: [d1, d2] } });
            }
        }, 100);
    };

    // Update display dice when actual roll happens (sync)
    React.useEffect(() => {
        if (state.gamePhase === 'MOVING') {
            setDisplayDice(state.dice);
        }
    }, [state.dice, state.gamePhase]);

    const handleEndTurn = () => {
        dispatch({ type: 'END_TURN', payload: null });
    };

    return (
        <div className="controls-container">
            <div className="player-info">
                <h2>當前玩家: <span style={{ color: currentPlayer.color }}>{currentPlayer.name}</span></h2>
                <div className="current-avatar">
                    <img src={currentPlayer.avatarUrl} alt={currentPlayer.name} style={{ width: 50, height: 50 }} />
                </div>
                <p>現金: ${currentPlayer.money}</p>
                <p>位置: {currentPlayer.position}</p>
            </div>

            <div className="dice-display-area">
                <div className={`dice-cube ${isRolling ? 'shaking' : ''}`}>{displayDice[0]}</div>
                <div className={`dice-cube ${isRolling ? 'shaking' : ''}`}>{displayDice[1]}</div>
            </div>

            <div className="actions">
                {state.gamePhase === 'ROLL' && !isRolling && (
                    <button className="btn-primary" onClick={handleRoll}>擲骰子</button>
                )}
                {(state.gamePhase === 'MOVING' || isRolling) && (
                    <p>{isRolling ? '擲骰中...' : `移動中... 剩餘 ${state.stepsRemaining} 步`}</p>
                )}
            </div>

            <div className="logs">
                <h3>遊戲紀錄</h3>
                <ul className="log-list">
                    {state.logs.slice(-5).map((log, i) => (
                        <li key={i}>{log}</li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
        .controls-container {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 300px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          z-index: 100;
        }
        .btn-primary {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1rem;
        }
        .btn-secondary {
          background: #333;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          margin-top: 10px;
          cursor: pointer;
        }
        .log-list {
          list-style: none;
          padding: 0;
          margin-top: 10px;
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
        </div>
    );
}
