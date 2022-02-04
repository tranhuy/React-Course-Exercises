import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'

interface ContentProps {
    parts: Array<CoursePart>;
}

const Content = ({ parts }: ContentProps) => {
    return (
        <>
            {parts.map(part => (
                <Part key={part.name} part={part} />
            ))}
        </>
    );
}

export default Content;