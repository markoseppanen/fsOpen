export const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.reduce((total, cur) => total + cur.exercises, 0)}
  </p>
);
