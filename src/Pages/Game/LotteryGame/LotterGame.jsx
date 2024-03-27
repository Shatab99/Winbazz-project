import  { useState } from 'react';
import './lottery.css';

function LotteryGame() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [message, setMessage] = useState('');

  // Function to generate random winning numbers
  const generateWinningNumbers = () => {
    const numbers = [];
    while (numbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * 10) + 1; // Generating numbers from 1 to 10
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setWinningNumbers(numbers);
  };

  // Function to handle number selection
  const selectNumber = (number) => {
    if (selectedNumbers.length < 3 && !selectedNumbers.includes(number)) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setSelectedNumbers([]);
    setMessage('');
  };

  // Function to check for winning numbers
  const checkWinningNumbers = () => {
    if (selectedNumbers.length === 3) {
      const matchedNumbers = selectedNumbers.filter(number =>
        winningNumbers.includes(number)
      );
      if (matchedNumbers.length === 3) {
        setMessage('Congratulations! You win!');
      } else {
        setMessage('Sorry, you did not win. Try again!');
      }
    }
  };

  // Function to start a new game
  const startNewGame = () => {
    generateWinningNumbers(); // Generate new winning numbers
    resetGame(); // Reset the game state
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold mb-4">Lottery Game</h1>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <h2 className="font-bold mb-2">Select Numbers</h2>
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
              <div
                key={number}
                className={`cursor-pointer  p-4 rounded-full border border-gray-300 ${
                  selectedNumbers.includes(number) ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => selectNumber(number)}
              >
                {number}
              </div>
            ))}
          </div>
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={checkWinningNumbers}
          >
            Check Numbers
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={resetGame}
          >
            Reset
          </button>
          <button
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={startNewGame}
          >
            Start New Game
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-bold mb-2">Winning Numbers</h2>
          <div className="flex space-x-2">
            {winningNumbers.map((number, index) => (
              <div
                key={index}
                className="bg-yellow-400 text-white font-bold p-4 rounded-full"
              >
                {number}
              </div>
            ))}
          </div>
          {message && <p className="mt-4 font-bold text-xl">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default LotteryGame;
