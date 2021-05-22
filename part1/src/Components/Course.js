import React from 'react'

export const Course = ({course}) => {
    return (
        <>
            <Header title={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total exercises={course.parts.map(p => p.exercises)}></Total>
        </>
    )
 }

 const Header = ({title}) => {
   return (
     <>
       <h1>{title}</h1>
     </>
   )
 }
 
 const Content = ({parts}) => {  
   return (
     <>
       <ul style={{listStyleType:'none', padding:0}}>
           {parts.map(part => 
               <Part key={part.id} part={part}></Part>
           )}
       </ul>
     </>
   )
 }
 
 const Part = ({part}) => {
   return (
       <li style={{marginBottom:'5px'}}>{part.name} {part.exercises}</li>
   )
 }

 const Total = ({exercises}) => {
   const total = exercises.reduce((a, b) => a + b, 0);
 
   return (
     <>
       <p>Total Number of exercises: <span style={{fontWeight: "bold"}}>{total}</span></p>
     </>
   )
 }