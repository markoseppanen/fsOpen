import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => (
  <>
    <h2>statistics</h2>
    {good + neutral + bad === 0 ? (
      <p>No Feedback given</p>
    ) : (
      <p>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={good + neutral + bad} />
        <StatisticLine text="Average" value={((good * 1 + bad * -1) / (good + neutral + bad)).toFixed(2)}/>
        <StatisticLine text="Positive" value={`${((good / (good + neutral + bad)) * 100).toFixed(2)}%`}/>
      </p>
    )}
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
);

export default App;
