import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  if (good + bad + neutral === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <section>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good + bad * -1) / (good + neutral + bad)}</p>
      <p>positive {(good / (good + neutral + bad)) * 100}%</p>
    </section>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title={"give feedback"} />
      <Button text={"good"} onClick={handleGoodClick} />
      <Button text={"neutral"} onClick={handleNeutralClick} />
      <Button text={"bad"} onClick={handleBadClick} />
      <Header title={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
