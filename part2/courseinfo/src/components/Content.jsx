import { Part } from "./Part";

export const Content = ({ parts }) => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)



// (
//   <>
//     <Part name={parts[0].name} exercises={parts[0].exercises} />
//     <Part name={parts[1].name} exercises={parts[1].exercises} />
//     <Part name={parts[2].name} exercises={parts[2].exercises} />
//   </>
// );
