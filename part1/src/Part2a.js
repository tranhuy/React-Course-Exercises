import React from 'react'
import {Course} from './Components/Course'

const Part2a = () => {
    const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 2,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
            name: 'Huy\'s Part',
            exercises: 9,
            id: 4
        }
      ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
        <>
            {courses.map(course => 
                <Course key={course.id} course={course} />
            )}            
        </>
    )
  }

  export default Part2a;