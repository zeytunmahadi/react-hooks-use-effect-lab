import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

   
    const timeoutId = setTimeout(() => {
      setTimeRemaining(10); 
      onAnswered(false);
    }, 10000);

    // Cleanup function to clear interval and timeout
    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
      clearTimeout(timeoutId); // Clear timeout on component unmount
      setTimeRemaining(10); // Reset timeRemaining on component unmount
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    clearInterval(intervalId); // Clear interval on answering (if accessible)
    clearTimeout(timeoutId); // Clear timeout on answering (if accessible)
    setTimeRemaining(10); // Reset timeRemaining on answering
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button key={answer} onClick={() => handleAnswer(index === correctIndex)}>
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
