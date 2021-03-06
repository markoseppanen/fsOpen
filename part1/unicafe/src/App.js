import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>statistics</h2>
      {good + neutral + bad == 0 ? (
        <p>No Feedback given</p>
      ) : (
        <p>
          Good: {good}
          <br />
          Neutral: {neutral}
          <br />
          Bad: {bad}
          <br />
          Total: {good + neutral + bad}
          <br />
          Average: {(good * 1 + bad * -1) / (good + neutral + bad)}
          <br />
          Positive: {(good / (good + neutral + bad)) * 100}%
        </p>
      )}
    </>
  );
};

export default App;
