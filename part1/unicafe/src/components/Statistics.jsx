import { StatisticLine } from "./StatisticLine";

export const Statistics = ({ good, neutral, bad }) => {
    if (good + bad + neutral === 0) {
      return <p>No feedback given</p>;
    }
  
    return (
      <table>
        <tbody>
            <StatisticLine text={"good"} value={good}/>
            <StatisticLine text={"neutral"} value={neutral}/>
            <StatisticLine text={"bad"} value={bad}/>
            <StatisticLine text={"all"} value={good + neutral + bad}/>
            <StatisticLine text={"average"} value={((good + bad * -1) / (good + neutral + bad)).toFixed(2)}/>
            <StatisticLine text={"positive"} value={((good / (good + neutral + bad)) * 100).toFixed(2) + "%"}/>
        </tbody>
      </table>
    );
  };