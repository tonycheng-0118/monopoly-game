'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { PlayerConfig } from '../types/game';

const PLAYER_COLORS = ['red', 'blue', 'green', 'orange', 'purple'];

export default function SetupScreen() {
  const { dispatch } = useGame();
  const [playerCount, setPlayerCount] = useState(4);
  const [initialMoney, setInitialMoney] = useState(1500);
  const [victoryTarget, setVictoryTarget] = useState(3000);
  const [playerConfigs, setPlayerConfigs] = useState<PlayerConfig[]>([]);

  // Initialize/Update player configs when count changes
  useEffect(() => {
    setPlayerConfigs(prev => {
      const newConfigs: PlayerConfig[] = [];
      for (let i = 0; i < playerCount; i++) {
        // Keep existing config if possible, else generate new
        if (prev[i]) {
          newConfigs.push(prev[i]);
        } else {
          const pokemonId = Math.floor(Math.random() * 151) + 1;
          newConfigs.push({
            name: `玩家 ${i + 1}`,
            color: PLAYER_COLORS[i % PLAYER_COLORS.length],
            avatarUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
          });
        }
      }
      return newConfigs;
    });
  }, [playerCount]);

  const handleRandomizeAvatar = (index: number) => {
    const pokemonId = Math.floor(Math.random() * 151) + 1;
    const newConfigs = [...playerConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      avatarUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    };
    setPlayerConfigs(newConfigs);
  };

  const handleStart = () => {
    dispatch({
      type: 'START_GAME',
      payload: {
        settings: { playerCount, initialMoney, victoryTarget, playerConfigs }
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
          max="5"
          step="1"
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
      </div>

      <div className="players-list">
        {playerConfigs.map((config, i) => (
          <div key={i} className="player-config-item">
            <div className="player-avatar-preview">
              <img src={config.avatarUrl} alt="avatar" />
            </div>
            <div className="player-details">
              <span style={{ color: config.color, fontWeight: 'bold' }}>{config.name}</span>
              <button className="btn-random" onClick={() => handleRandomizeAvatar(i)}>隨機重選</button>
            </div>
          </div>
        ))}
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
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          text-align: center;
          width: 450px;
          max-width: 95%;
          max-height: 90vh;
          overflow-y: auto;
        }
        h1 { margin-bottom: 20px; color: #333; }
        .form-group { margin-bottom: 20px; text-align: left; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
        input { width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd; }
        
        .players-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }
        .player-config-item {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fafafa;
        }
        .player-avatar-preview img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
        .player-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
        }
        .btn-random {
          background: #eee;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .btn-random:hover { background: #ddd; }

        .btn-start {
          background: linear-gradient(135deg, #0070f3, #00a6f3);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
