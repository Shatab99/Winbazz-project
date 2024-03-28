import React, { useState } from 'react';

// Define symbols for the reels
const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '🍓', '🍍', '🥝'];

// Function to generate random symbol for a reel
const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length) + 1];

// SlotMachine component
const SlotMachine = () => {
    const [reel1, setReel1] = useState('');
    const [reel2, setReel2] = useState('');
    const [reel3, setReel3] = useState('');
    const [message, setMessage] = useState('');


    console.log(reel1)
    console.log(reel2)
    console.log(reel3)

    // Function to spin the reels
// Function to spin the reels
const spinReels = () => {
    // Spin reels with a short delay between each reel
    const delay = 200;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            setReel1(getRandomSymbol());
            setReel2(getRandomSymbol());
            setReel3(getRandomSymbol());
        }, i * delay);
    }

    // Determine if the player wins after spinning is complete
    setTimeout(() => {
        if (reel1 === reel2 && reel2 === reel3) {
            setMessage('Congratulations! You win!');
        } else {
            setMessage('Sorry, you did not win. Try again!');
        }
    }, 20 * delay);
};


    return (
        <div className="flex flex-col items-center">
            <div className="flex mb-4">
                <div className="reel text-6xl">{reel1}</div>
                <div className="reel text-6xl">{reel2}</div>
                <div className="reel text-6xl">{reel3}</div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={spinReels}>Spin</button>
            <div className="mt-4 text-xl">{message}</div>
        </div>
    );
};

export default SlotMachine;
