import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts;

  return (
    <>
      <Part part={part1.name} exercises={part1.exercises}></Part>
      <Part part={part2.name} exercises={part2.exercises}></Part>
      <Part part={part3.name} exercises={part3.exercises}></Part>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  const [part1, part2, part3] = props.parts;

  return (
    <>
      <p>Number of exercises: <span style={{fontWeight: "bold"}}>{part1.exercises + part2.exercises + part3.exercises}</span></p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>      
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App