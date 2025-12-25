'use client';

import React, { useState } from 'react';

export default function GameRules() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Help Button */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                }}
                className="help-btn"
                title="遊戲說明"
            >
                ?
            </button>

            <style jsx>{`
                .help-btn:hover {
                    transform: scale(1.1);
                    background-color: #2980b9;
                }
            `}</style>

            {/* Rules Modal */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2001
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '15px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#7f8c8d'
                            }}
                        >
                            ✕
                        </button>

                        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                            🎮 遊戲說明 (How to Play)
                        </h2>

                        <div className="rules-content" style={{ lineHeight: '1.6', color: '#34495e' }}>
                            <h3 style={{ color: '#e67e22' }}>1. 遊戲目標</h3>
                            <p>透過買地、蓋房子收租，讓其他玩家破產，成為最後的<b>台灣地產大亨</b>！🏆</p>

                            <h3 style={{ color: '#2ecc71', marginTop: '15px' }}>2. 基本規則</h3>
                            <ul>
                                <li><b>擲骰子</b>：輪流擲骰子移動棋子。</li>
                                <li><b>購買地產</b>：停留到無人擁有的地產時，可選擇購買。</li>
                                <li><b>支付租金</b>：停留到別人的地產時，必須支付租金 (系統會自動彈出視窗)。💸</li>
                            </ul>

                            <h3 style={{ color: '#9b59b6', marginTop: '15px' }}>3. 蓋房子 (致富秘訣) 🏠</h3>
                            <ul>
                                <li>當你再次停留到<b>自己擁有</b>的地產時，可以選擇<b>蓋房子</b>。</li>
                                <li><b>無限加蓋</b>：房子越多，過路費越貴！沒有上限！📈</li>
                            </ul>

                            <h3 style={{ color: '#e74c3c', marginTop: '15px' }}>4. 特殊地點</h3>
                            <ul>
                                <li><b>起點 (GO)</b>：經過或停留都可領取 $200 獎勵金。</li>
                                <li><b>監獄/入獄</b>：暫停行動 (尚未實裝)。</li>
                                <li><b>機會/命運</b>：隨機事件卡片 (尚未實裝)。</li>
                            </ul>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    padding: '10px 30px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                了解！
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
