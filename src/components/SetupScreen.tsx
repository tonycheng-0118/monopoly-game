'use client';

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function SetupScreen() {
    const { dispatch } = useGame();
    const [playerCount, setPlayerCount] = useState(4);
    const [initialMoney, setInitialMoney] = useState(1500);
    const [victoryTarget, setVictoryTarget] = useState(3000);

    const handleStart = () => {
        dispatch({
            type: 'START_GAME',
            payload: {
                settings: { playerCount, initialMoney, victoryTarget }
            }
        });
    };

    return (
        <div className="setup-container">
            <h1>遊戲設定</h1>

            <div className="form-group">
                <label>玩家人數: {playerCount}人</label>
                <input
                    type="range"
                    min="2"
                    max="4"
                    step="1"
                    value={playerCount}
                    onChange={(e) => setPlayerCount(Number(e.target.value))}
                />
                <div className="preview-players">
                    {Array.from({ length: playerCount }).map((_, i) => (
                        <span key={i} className={`player-icon player-${i}`}>♟</span>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>初始金額: ${initialMoney}</label>
                <input
                    type="number"
                    min="500"
                    max="5000"
                    step="100"
                    value={initialMoney}
                    onChange={(e) => setInitialMoney(Number(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label>勝利資產目標: ${victoryTarget}</label>
                <input
                    type="number"
                    min="2000"
                    max="10000"
                    step="500"
                    value={victoryTarget}
                    onChange={(e) => setVictoryTarget(Number(e.target.value))}
                />
            </div>

            <button className="btn-start" onClick={handleStart}>開始遊戲</button>

            <style jsx>{`
        .setup-container {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          text-align: center;
          width: 400px;
          max-width: 90%;
        }
        h1 {
          margin-bottom: 30px;
          color: #333;
        }
        .form-group {
          margin-bottom: 25px;
          text-align: left;
        }
        label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
          color: #555;
        }
        input[type="range"] {
          width: 100%;
        }
        input[type="number"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .preview-players {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 10px;
          font-size: 1.5rem;
        }
        .player-0 { color: red; }
        .player-1 { color: blue; }
        .player-2 { color: green; }
        .player-3 { color: orange; }

        .btn-start {
          background: linear-gradient(135deg, #0070f3, #00a6f3);
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 30px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-start:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,112,243,0.4);
        }
      `}</style>
        </div>
    );
}
