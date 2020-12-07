import React from 'react';

interface CourseProps {
    name: string;
    exerciseCount: number;
}

const Total: React.FC<{ courseParts: CourseProps[] }> = ({ courseParts }) => {
    return (
        <div>
            <b>Number of exercises: {" "} {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</b>
        </div>
    );
}

export default Total