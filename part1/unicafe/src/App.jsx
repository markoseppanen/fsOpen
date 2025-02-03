import { useState } from "react";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";

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
