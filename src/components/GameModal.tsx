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
        <div className="modal-overlay">
            <div className="modal-content">
                {type === 'BUY' && (
                    <>
                        <h2>購買地產?</h2>
                        <p>你想購買 <strong>{data.name}</strong> 嗎?</p>
                        <p>價格: ${data.price}</p>
                        <div className="modal-actions">
                            <button className="btn-confirm" onClick={handleBuy}>購買</button>
                            <button className="btn-cancel" onClick={handlePass}>放棄</button>
                        </div>
                    </>
                )}

                {type === 'RENT' && (
                    <>
                        <h2>支付租金</h2>
                        <p>你停留在了 <strong>{data.name}</strong></p>
                        <p>擁有者: {data.ownerName}</p>
                        <p>需支付: ${data.amount}</p>
                        <button className="btn-confirm" onClick={handlePayRent}>支付</button>
                    </>
                )}

                {type === 'MESSAGE' && (
                    <>
                        <h2>提示</h2>
                        <p>{data.message}</p>
                        <button className="btn-confirm" onClick={handleClose}>確定</button>
                    </>
                )}
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          min-width: 300px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-actions {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-confirm {
          background: #0070f3;
          color: white;
        }
        .btn-cancel {
          background: #ccc;
        }
      `}</style>
        </div>
    );
}
