'use client';

import React from 'react';
import { useGame } from '../context/GameContext';

export default function GameModal() {
    const { state, dispatch } = useGame();

    if (!state.modal.isOpen) return null;

    const { type, data } = state.modal;

    const handleClose = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: null });
    };

    const handleBuy = () => {
        dispatch({ type: 'BUY_PROPERTY', payload: { playerId: state.players[state.currentPlayerIndex].id, propertyId: data.propertyId, price: data.price } });
        handleClose();
        dispatch({ type: 'END_TURN', payload: null });
    };

    const handlePass = () => {
        handleClose();
        dispatch({ type: 'END_TURN', payload: null });
    };

    const handlePayRent = () => {
        dispatch({ type: 'PAY_RENT', payload: { fromPlayerId: state.players[state.currentPlayerIndex].id, ...data } });
        handleClose();
        dispatch({ type: 'END_TURN', payload: null });
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                minWidth: '320px',
                maxWidth: '90%',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}>
                {type === 'BUY' && (
                    <>
                        <h2 style={{ marginBottom: '15px', color: '#1a202c' }}>購買地產?</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>你想購買 <strong>{data.name}</strong> 嗎?</p>
                        <p style={{ fontSize: '1.25rem', color: '#38a169', fontWeight: 'bold', marginBottom: '20px' }}>價格: ${data.price}</p>
                        <div className="modal-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button className="btn-confirm" onClick={handleBuy}>購買</button>
                            <button className="btn-cancel" onClick={handlePass}>放棄</button>
                        </div>
                    </>
                )}

                {type === 'RENT' && (
                    <>
                        <h2 style={{ marginBottom: '15px', color: '#e53e3e' }}>支付租金</h2>
                        <p style={{ fontSize: '1.1rem' }}>你停留在了 <strong>{data.name}</strong></p>
                        <p style={{ margin: '10px 0' }}>擁有者: {data.ownerName}</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e53e3e', margin: '15px 0' }}>需支付: ${data.amount}</p>
                        <button className="btn-confirm" onClick={handlePayRent} style={{ width: '100%' }}>支付</button>
                    </>
                )}



                {type === 'BUILD' && (
                    <>
                        <h2 style={{ marginBottom: '15px', color: '#e67e22' }}>建設地產</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>你想在 <strong>{data.space.name}</strong> 蓋房子嗎?</p>
                        <p>目前房子數: <strong>{data.currentHouses}</strong></p>
                        <p style={{ fontSize: '1.25rem', color: '#e67e22', fontWeight: 'bold', margin: '20px 0' }}>建設費用: ${data.space.property.houseCost}</p>
                        <div className="modal-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button className="btn-confirm" onClick={() => {
                                // Check money
                                if (state.players[state.currentPlayerIndex].money >= data.space.property.houseCost) {
                                    dispatch({ type: 'BUILD_HOUSE', payload: { playerId: state.players[state.currentPlayerIndex].id, propertyId: data.space.id, cost: data.space.property.houseCost } });
                                    handleClose();
                                    dispatch({ type: 'END_TURN', payload: null });
                                } else {
                                    alert('現金不足！');
                                }
                            }}>蓋房子</button>
                            <button className="btn-cancel" onClick={handlePass}>跳過</button>
                        </div>
                    </>
                )}

                {type === 'MESSAGE' && (
                    <>
                        <h2 style={{ marginBottom: '15px' }}>提示</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{data.message}</p>
                        <button className="btn-confirm" onClick={handleClose} style={{ width: '100%' }}>確定</button>
                    </>
                )}
            </div>

            <style jsx>{`
                .btn-confirm {
                    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.1s;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .btn-confirm:active { transform: scale(0.98); }
                
                .btn-cancel {
                    background: #cbd5e0;
                    color: #4a5568;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-cancel:hover { background: #a0aec0; }
            `}</style>
        </div >
    );
}
