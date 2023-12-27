import React, {useState} from 'react';
import Game from './Game';

export default function App() {
  const [gameId, setGameId] = useState(0);

  const resetGame = () => {
    setGameId(prevId => {
      return prevId + 1;
    });
  };
  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={6}
      initSecounds={10}
    />
  );
}
