import React from 'react';
import { CoursePart } from '../types'

const Part = ({ part }: { part: CoursePart }) => {
    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold'
    }

    const partContainer = {
        marginBottom: '10px'
    }

    const assertNever = (value: never) : never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    }

    const renderSwitch = (): JSX.Element => {
        switch (part.type) {
            case 'groupProject':
                return (
                    <div style={partContainer}>
                        <div style={titleStyle}>{part.name} {part.exerciseCount}</div>
                        <div>Project exercises {part.groupProjectCount}</div>
                    </div>
                );
            case 'normal':
                return (
                    <div style={partContainer}>
                        <div style={titleStyle}>{part.name} {part.exerciseCount}</div>
                        <div><i>{part.description}</i></div>
                    </div>
                );
            case 'submission':
                return (
                    <div style={partContainer}>
                        <div style={titleStyle}>{part.name} {part.exerciseCount}</div>
                        <div><i>{part.description}</i></div>
                        <div>Submit to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></div>
                    </div>
                );
            case 'special':
                return (
                    <div style={partContainer}>
                        <div style={titleStyle}>{part.name} {part.exerciseCount}</div>
                        <div><i>{part.description}</i></div>
                        <div>Required skills: {part.requirements.join(', ')}</div>
                    </div>
                );
            default:
                return assertNever(part);
        }
    }

    return (
        <>
            { renderSwitch() }
        </>
    )
}

export default Part