import React, { useState, useEffect } from 'react';
import './App.css';

const box = 20;
const canvasSize = 400;

function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 9 * box, y: 10 * box }]);
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    });
    const [direction, setDirection] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const onKeyDown = (e) => {
            switch (e.keyCode) {
                case 37:
                    if (direction !== "RIGHT") setDirection("LEFT");
                    break;
                case 38:
                    if (direction !== "DOWN") setDirection("UP");
                    break;
                case 39:
                    if (direction !== "LEFT") setDirection("RIGHT");
                    break;
                case 40:
                    if (direction !== "UP") setDirection("DOWN");
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameOver) return;

            setSnake((prev) => {
                const newHead = { ...prev[0] };

                switch (direction) {
                    case "LEFT":
                        newHead.x -= box;
                        break;
                    case "UP":
                        newHead.y -= box;
                        break;
                    case "RIGHT":
                        newHead.x += box;
                        break;
                    case "DOWN":
                        newHead.y += box;
                        break;
                    default:
                        break;
                }

                if (
                    newHead.x < 0 ||
                    newHead.y < 0 ||
                    newHead.x >= canvasSize ||
                    newHead.y >= canvasSize ||
                    prev.some((part) => part.x === newHead.x && part.y === newHead.y)
                ) {
                    setGameOver(true);
                    clearInterval(interval);
                    return prev;
                }

                const newSnake = [newHead, ...prev];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((prev) => prev + 1);
                    setFood({
                        x: Math.floor(Math.random() * 19 + 1) * box,
                        y: Math.floor(Math.random() * 19 + 1) * box
                    });
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [direction, food, gameOver]);

    return (
        <div className="text-gray-200 text-center">
            <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
            <div>
                <canvas id="gameCanvas" width={canvasSize} height={canvasSize} className="bg-gray-800"></canvas>
            </div>
            <div className="mt-4 text-xl">
                Score: {score}
            </div>
            {gameOver && <div className="mt-4 text-red-500 text-xl">Game Over</div>}
        </div>
    );
}

export default SnakeGame;