import React from 'react';
import { ChapterDetails } from '../types';

interface ContentProps {
    chapters: Array<ChapterDetails>;
}

const Content = ({ chapters }: ContentProps) => {
    return (
        <>
            {chapters.map(chapter => (
                <p key={chapter.name}>
                    {chapter.name} {chapter.exerciseCount}
                </p>
            ))}
        </>
    );
}

export default Content;