import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
              <p>
                {part.name} {part.description} {part.exerciseCount}
              </p>
            );
        case 'Using props to pass data':
            return (
              <p>
                {part.name} {part.groupProjectCount} {part.exerciseCount}
              </p>
            );
        case 'Deeper type usage':
            return (
              <p>
                {part.name} {part.description} {part.exerciseCount} {' '}
                {part.exerciseSubmissionLink}
              </p>
            );
        case 'Test':
            return (
                <p>
                {part.name} {part.description} {part.exerciseCount} {' '}
                Funny: {part.funny}
                </p>
            );
        default:
            return assertNever(part);
    }
}

export default Part;