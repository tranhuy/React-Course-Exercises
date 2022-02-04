import React from 'react';
import { ChapterDetails } from '../types';

interface TotalProps {
    chapters: Array<ChapterDetails>;
}

const Total = ({ chapters }: TotalProps) => {
     return (
         <div>
             <strong>Number of exercises: </strong>
             {chapters.reduce((counter, chapter) => counter + chapter.exerciseCount, 0)}
         </div>
     )
}

export default Total
