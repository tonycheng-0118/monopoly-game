'use client';

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

interface FloatingTextItem {
    id: number;
    text: string;
    x: number;
    y: number;
    color: string;
}

export interface FloatingTextRef {
    addText: (text: string, x: number, y: number, color?: string) => void;
}

const FloatingTextManager = forwardRef<FloatingTextRef, {}>((props, ref) => {
    const [items, setItems] = useState<FloatingTextItem[]>([]);

    useImperativeHandle(ref, () => ({
        addText: (text, x, y, color = '#2ecc71') => {
            const id = Date.now() + Math.random();
            setItems(prev => [...prev, { id, text, x, y, color }]);

            // Auto remove after animation
            setTimeout(() => {
                setItems(prev => prev.filter(item => item.id !== id));
            }, 1000);
        }
    }));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999
        }}>
            {items.map(item => (
                <div key={item.id} className="floating-text" style={{
                    position: 'absolute',
                    left: item.x,
                    top: item.y,
                    color: item.color,
                }}>
                    {item.text}
                </div>
            ))}
            <style jsx>{`
               .floating-text {
                   font-size: 1.5rem;
                   font-weight: bold;
                   text-shadow: 1px 1px 2px black;
                   animation: floatUp 1s ease-out forwards;
               }
               @keyframes floatUp {
                   0% { transform: translateY(0) scale(1); opacity: 1; }
                   100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
               }
           `}</style>
        </div>
    );
});

export default FloatingTextManager;
