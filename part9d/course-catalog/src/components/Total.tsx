import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
    parts: Array<CoursePart>;
}

const Total = ({ parts }: TotalProps) => {
     return (
         <h2>
             Number of exercises: {parts.reduce((counter, part) => counter + part.exerciseCount, 0)}
         </h2>
     )
}

export default Total
