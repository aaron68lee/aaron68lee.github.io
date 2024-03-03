// Semantle.js

import React, { useState } from 'react';

const Semantle = () => {
  const [guess, setGuess] = useState('target');
  const [maxWords, setMaxWords] = useState(10);
  const [maxOutput, setMaxOutput] = useState(10);
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    alert(`Guess: ${guess}, maxWords: ${maxWords}`)
    e.preventDefault();

    // prepare data for post request

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess, max_words: maxWords }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Semantle</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Enter a guess:</label>
        <input
          type="text"
          id="guess"
          name="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <br />
        <label htmlFor="maxWords" value='10'>Max Words:</label>
        <input
          type="number"
          id="maxWords"
          name="maxWords"
          value={maxWords}
          onChange={(e) => setMaxWords(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {output && <p>{output}</p>}
    </div>
  );
};

export default Semantle;
