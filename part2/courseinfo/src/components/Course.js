const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => (
  <p style={{ fontWeight: "bold" }}>
    Total of exercises {parts.reduce((a, c) => a + c.exercises, 0)}
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id}></Part>
    ))}
  </>
);

export default Course;
